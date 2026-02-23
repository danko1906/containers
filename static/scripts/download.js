const container_statuses = ["packed"];
const BASE_URL = window.APP_CONFIG?.BASE_URL || "http://127.0.0.1:5001";
const LANG = (localStorage.getItem("lang") || "en").toLowerCase() === "ru" ? "ru" : "en";

const I18N = {
    en: {
        pageTitle: "Container Selection",
        backToContainersButton: "Back to Containers",
        multiModeLabel: "Select multiple containers",
        selectContainerOption: "Select a container",
        tableArticle: "Article",
        tableTotal: "Total",
        packedDateFromLabel: "Packed date from",
        packedDateToLabel: "to",
        applyFilterButton: "Apply filter",
        resetButton: "Reset",
        selectAllLabel: "Select all",
        selectedCountLabel: "Selected: {count}",
        downloadButtonSingle: "Download Selected Container",
        downloadButtonMulti: "Download Selected Containers",
        containerWord: "Container",
        metaContainerId: "container_id",
        metaPackedDate: "packed_date",
        metaCreatedById: "created_by_id",
        na: "N/A",
        packedDateInvalid: "Packed date 'from' cannot be later than packed date 'to'.",
        noPackedContainersFound: "No packed containers found.",
        failedDownloadContainer: "Failed to download container: {message}",
        failedDownloadContainers: "Failed to download containers list: {message}",
        selectAtLeastOneContainer: "Select at least one container for bulk download.",
        selectContainerFirst: "Select a container first.",
        noRefreshToken: "No refresh token available",
        failedRefreshToken: "Failed to refresh the access token",
        errorRefreshToken: "Error refreshing access token"
    },
    ru: {
        pageTitle: "Выбор контейнера",
        backToContainersButton: "Назад к контейнерам",
        multiModeLabel: "Выбрать несколько контейнеров",
        selectContainerOption: "Выберите контейнер",
        tableArticle: "Артикул",
        tableTotal: "Количество",
        packedDateFromLabel: "Дата упаковки от",
        packedDateToLabel: "до",
        applyFilterButton: "Применить фильтр",
        resetButton: "Сбросить",
        selectAllLabel: "Выбрать все",
        selectedCountLabel: "Выбрано: {count}",
        downloadButtonSingle: "Скачать выбранный контейнер",
        downloadButtonMulti: "Скачать выбранные контейнеры",
        containerWord: "Контейнер",
        metaContainerId: "container_id",
        metaPackedDate: "packed_date",
        metaCreatedById: "created_by_id",
        na: "Н/Д",
        packedDateInvalid: "Дата «от» не может быть позже даты «до».",
        noPackedContainersFound: "Упакованные контейнеры не найдены.",
        failedDownloadContainer: "Не удалось скачать контейнер: {message}",
        failedDownloadContainers: "Не удалось скачать список контейнеров: {message}",
        selectAtLeastOneContainer: "Выберите хотя бы один контейнер для массовой выгрузки.",
        selectContainerFirst: "Сначала выберите контейнер.",
        noRefreshToken: "Токен обновления отсутствует",
        failedRefreshToken: "Не удалось обновить access token",
        errorRefreshToken: "Ошибка обновления access token"
    }
};

function t(key, vars = {}) {
    const template = I18N[LANG]?.[key] || I18N.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ""));
}

function formatPackedDate(packedDate) {
    return packedDate || t("na");
}

function buildContainerMeta(container) {
    return `${t("metaContainerId")}: ${container.container_id ?? t("na")} | ${t("metaPackedDate")}: ${formatPackedDate(container.packed_date)} | ${t("metaCreatedById")}: ${container.created_by_id ?? t("na")}`;
}

function createContainerOption(container) {
    const option = document.createElement("option");
    option.value = String(container.container_id);
    const containerName = container.container_name || `${t("containerWord")} ${container.container_id}`;
    const containerMeta = buildContainerMeta(container);
    option.textContent = `${containerName} \u2003\u2003 | ${containerMeta}`;
    option.dataset.containerName = containerName;
    option.dataset.containerMeta = containerMeta;
    option.dataset.containerId = container.container_id ?? "";
    option.dataset.packedDate = container.packed_date ?? "";
    option.dataset.createdById = container.created_by_id ?? "";
    return option;
}

function getContainerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("container_id");
}

document.addEventListener("DOMContentLoaded", function () {
    const backToContainersButton = document.getElementById("backToContainersButton");
    const multiModeCheckbox = document.getElementById("multiModeCheckbox");
    const singleModeSection = document.getElementById("singleModeSection");
    const multiModeSection = document.getElementById("multiModeSection");
    const containerSelect = document.getElementById("containerSelect");
    const table = document.getElementById("containerTable");
    const tableBody = document.getElementById("tableBody");
    const packedDateFromInput = document.getElementById("packedDateFrom");
    const packedDateToInput = document.getElementById("packedDateTo");
    const applyDateFilterButton = document.getElementById("applyDateFilterButton");
    const resetDateFilterButton = document.getElementById("resetDateFilterButton");
    const selectAllContainers = document.getElementById("selectAllContainers");
    const selectedCount = document.getElementById("selectedCount");
    const multiContainerList = document.getElementById("multiContainerList");
    const downloadButton = document.getElementById("downloadButton");

    let allContainers = [];
    let filteredContainers = [];
    let selectedContainerId = getContainerIdFromURL();
    let isMultiMode = false;
    const selectedContainerIds = new Set();

    function applyStaticTranslations() {
        document.documentElement.lang = LANG;
        document.title = t("pageTitle");

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            if (key) {
                if (key === "selectedCountLabel") {
                    element.textContent = t(key, { count: selectedContainerIds.size });
                } else {
                    element.textContent = t(key);
                }
            }
        });

        // Fallbacks for older cached markup without data-i18n attributes.
        const heading = document.querySelector("h1");
        if (heading) {
            heading.textContent = t("pageTitle");
        }

        if (backToContainersButton) {
            backToContainersButton.textContent = t("backToContainersButton");
        }

        const multiModeLabel = document.getElementById("multiModeLabel");
        if (multiModeLabel) {
            multiModeLabel.textContent = t("multiModeLabel");
        }

        const tableHeaders = document.querySelectorAll("#containerTable thead th");
        if (tableHeaders.length >= 2) {
            tableHeaders[0].textContent = t("tableArticle");
            tableHeaders[1].textContent = t("tableTotal");
        }

        const packedDateFromLabel = document.querySelector('label[for="packedDateFrom"]');
        if (packedDateFromLabel) {
            packedDateFromLabel.textContent = t("packedDateFromLabel");
        }

        const packedDateToLabel = document.querySelector('label[for="packedDateTo"]');
        if (packedDateToLabel) {
            packedDateToLabel.textContent = t("packedDateToLabel");
        }

        if (applyDateFilterButton) {
            applyDateFilterButton.textContent = t("applyFilterButton");
        }

        if (resetDateFilterButton) {
            resetDateFilterButton.textContent = t("resetButton");
        }

        const selectAllLabel = document.getElementById("selectAllLabel");
        if (selectAllLabel) {
            selectAllLabel.textContent = t("selectAllLabel");
        }

        if (selectedCount) {
            selectedCount.textContent = t("selectedCountLabel", { count: selectedContainerIds.size });
        }

        const defaultOption = containerSelect?.querySelector('option[value="default"], option[value=""]');
        if (defaultOption) {
            defaultOption.textContent = t("selectContainerOption");
        }
    }

    if (backToContainersButton) {
        backToContainersButton.addEventListener("click", () => {
            window.location.href = "/containers/container.html";
        });
    }

    applyStaticTranslations();

    function updateDownloadButtonState() {
        if (isMultiMode) {
            downloadButton.textContent = t("downloadButtonMulti");
            downloadButton.disabled = selectedContainerIds.size === 0;
            return;
        }

        downloadButton.textContent = t("downloadButtonSingle");
        downloadButton.disabled = !selectedContainerId;
    }

    function updateSelectAllState() {
        const total = filteredContainers.length;
        const selected = selectedContainerIds.size;

        if (total === 0) {
            selectAllContainers.checked = false;
            selectAllContainers.indeterminate = false;
            selectAllContainers.disabled = true;
            return;
        }

        selectAllContainers.disabled = false;
        selectAllContainers.checked = selected > 0 && selected === total;
        selectAllContainers.indeterminate = selected > 0 && selected < total;
    }

    function updateSelectedCount() {
        selectedCount.textContent = t("selectedCountLabel", { count: selectedContainerIds.size });
    }

    function parsePackedDate(value) {
        if (!value) {
            return null;
        }
        const normalized = String(value).trim().replace(" ", "T");
        const parsed = new Date(normalized);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    function applyPackedDateFilter(showValidationError = true) {
        let fromDate = null;
        let toDate = null;

        if (packedDateFromInput.value) {
            fromDate = new Date(`${packedDateFromInput.value}T00:00:00`);
        }

        if (packedDateToInput.value) {
            toDate = new Date(`${packedDateToInput.value}T23:59:59`);
        }

        if (fromDate && toDate && fromDate > toDate) {
            if (showValidationError) {
                alert(t("packedDateInvalid"));
            }
            return false;
        }

        filteredContainers = allContainers
            .filter((container) => {
                const packedDate = parsePackedDate(container.packed_date);
                if (!packedDate) {
                    return false;
                }
                if (fromDate && packedDate < fromDate) {
                    return false;
                }
                if (toDate && packedDate > toDate) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                const aDate = parsePackedDate(a.packed_date);
                const bDate = parsePackedDate(b.packed_date);
                if (!aDate && !bDate) {
                    return 0;
                }
                if (!aDate) {
                    return 1;
                }
                if (!bDate) {
                    return -1;
                }
                return aDate.getTime() - bDate.getTime();
            });

        const validIds = new Set(filteredContainers.map((container) => Number(container.container_id)));
        [...selectedContainerIds].forEach((id) => {
            if (!validIds.has(id)) {
                selectedContainerIds.delete(id);
            }
        });

        renderMultiContainerList();
        return true;
    }

    function renderMultiContainerList() {
        multiContainerList.innerHTML = "";

        if (!filteredContainers.length) {
            const empty = document.createElement("div");
            empty.className = "multi-empty";
            empty.textContent = t("noPackedContainersFound");
            multiContainerList.appendChild(empty);
            updateSelectedCount();
            updateSelectAllState();
            updateDownloadButtonState();
            return;
        }

        filteredContainers.forEach((container) => {
            const containerId = Number(container.container_id);

            const item = document.createElement("label");
            item.className = "multi-item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = String(containerId);
            checkbox.checked = selectedContainerIds.has(containerId);

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    selectedContainerIds.add(containerId);
                } else {
                    selectedContainerIds.delete(containerId);
                }
                updateSelectedCount();
                updateSelectAllState();
                updateDownloadButtonState();
            });

            const text = document.createElement("span");
            const containerName = container.container_name || `${t("containerWord")} ${container.container_id}`;
            text.textContent = `${containerName} | ${buildContainerMeta(container)}`;

            item.appendChild(checkbox);
            item.appendChild(text);
            multiContainerList.appendChild(item);
        });

        updateSelectedCount();
        updateSelectAllState();
        updateDownloadButtonState();
    }

    function setMode(multiEnabled) {
        isMultiMode = multiEnabled;
        singleModeSection.style.display = isMultiMode ? "none" : "block";
        multiModeSection.style.display = isMultiMode ? "block" : "none";
        if (isMultiMode) {
            applyPackedDateFilter(false);
        }
        updateDownloadButtonState();
    }

    async function fetchContainers() {
        const accessToken = localStorage.getItem("access_token");
        try {
            const response = await fetch(`${BASE_URL}/api/containers/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_statuses })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                return fetchContainers();
            }

            const data = await response.json();
            if (!(data.success && data.containers.success)) {
                return;
            }

            allContainers = data.containers.containers || [];

            containerSelect.innerHTML = `<option value="" disabled selected>${t("selectContainerOption")}</option>`;
            allContainers.forEach((container) => {
                containerSelect.appendChild(createContainerOption(container));
            });

            applyPackedDateFilter(false);

            if (selectedContainerId) {
                const selectedOption = containerSelect.querySelector(`option[value="${selectedContainerId}"]`);
                if (selectedOption) {
                    containerSelect.value = String(selectedContainerId);
                    await fetchContainerKit(String(selectedContainerId));
                } else {
                    selectedContainerId = null;
                }
            }

            updateDownloadButtonState();
        } catch (error) {
            console.error("Error fetching containers:", error);
        }
    }

    async function fetchContainerKit(containerId) {
        const accessToken = localStorage.getItem("access_token");
        try {
            const response = await fetch(`${BASE_URL}/api/containers/kit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_id: containerId })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                return fetchContainerKit(containerId);
            }

            const data = await response.json();
            if (!(data.success && data.container_kit.success)) {
                return;
            }

            tableBody.innerHTML = "";
            data.container_kit.scanned.forEach((item) => {
                const row = document.createElement("tr");
                const articleCell = document.createElement("td");
                const totalCell = document.createElement("td");

                articleCell.textContent = item.article;
                totalCell.textContent = item.total;

                row.appendChild(articleCell);
                row.appendChild(totalCell);
                tableBody.appendChild(row);
            });
            table.style.display = "table";
        } catch (error) {
            console.error("Error fetching container kit:", error);
        }
    }

    async function downloadContainerKit(containerId, containerName) {
        const accessToken = localStorage.getItem("access_token");
        try {
            const response = await fetch(`${BASE_URL}/api/containers/download`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_id: containerId })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                return downloadContainerKit(containerId, containerName);
            }

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `${containerName}_kit.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading container kit:", error);
            alert(t("failedDownloadContainer", { message: error.message }));
        }
    }

    async function downloadContainersBulk(containerIds) {
        const accessToken = localStorage.getItem("access_token");
        const requestBody = {
            container_ids: containerIds,
            order_by: "packed_date",
            order_dir: "asc"
        };

        try {
            const response = await fetch(`${BASE_URL}/api/containers/download_bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                credentials: "include",
                body: JSON.stringify(requestBody)
            });

            if (response.status === 401) {
                await refreshAccessToken();
                return downloadContainersBulk(containerIds);
            }

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "containers_bulk.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading bulk container list:", error);
            alert(t("failedDownloadContainers", { message: error.message }));
        }
    }

    containerSelect.addEventListener("change", async function () {
        selectedContainerId = containerSelect.value || null;
        if (!selectedContainerId) {
            table.style.display = "none";
            tableBody.innerHTML = "";
            updateDownloadButtonState();
            return;
        }

        await fetchContainerKit(selectedContainerId);
        updateDownloadButtonState();
    });

    multiModeCheckbox.addEventListener("change", function () {
        setMode(multiModeCheckbox.checked);
    });

    selectAllContainers.addEventListener("change", function () {
        if (selectAllContainers.checked) {
            filteredContainers.forEach((container) => selectedContainerIds.add(Number(container.container_id)));
        } else {
            selectedContainerIds.clear();
        }

        renderMultiContainerList();
    });

    applyDateFilterButton.addEventListener("click", async function () {
        if (!applyPackedDateFilter(true)) {
            return;
        }
        await fetchContainers();
    });

    resetDateFilterButton.addEventListener("click", async function () {
        packedDateFromInput.value = "";
        packedDateToInput.value = "";
        await fetchContainers();
    });

    downloadButton.addEventListener("click", async function () {
        if (isMultiMode) {
            if (!selectedContainerIds.size) {
                alert(t("selectAtLeastOneContainer"));
                return;
            }
            await downloadContainersBulk([...selectedContainerIds]);
            return;
        }

        if (!selectedContainerId) {
            alert(t("selectContainerFirst"));
            return;
        }

        const selectedOption = containerSelect.options[containerSelect.selectedIndex];
        const containerName = selectedOption?.dataset.containerName || selectedOption?.textContent || "container";
        await downloadContainerKit(selectedContainerId, containerName);
    });

    setMode(false);
    fetchContainers();
});

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        alert(t("noRefreshToken"));
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refresh_token: refreshToken })
        });

        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
        } else {
            alert(t("failedRefreshToken"));
        }
    } catch (error) {
        console.error("Error refreshing access token:", error);
        alert(t("errorRefreshToken"));
    }
}
