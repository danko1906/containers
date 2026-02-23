const BASE_URL = window.APP_CONFIG?.BASE_URL || "http://127.0.0.1:5001";

const TRANSLATIONS = {
    en: {
        pageTitle: "Container Management",
        containerNamePlaceholder: "Enter container name",
        createContainerButton: "Create Container",
        optionsLabel: "Options:",
        showPackedCheckboxLabel: "Show packed",
        selectContainerOption: "-- Select a Container --",
        goToShipmentButton: "Go to Shipment",
        deleteContainerButton: "Delete Container",
        editButton: "Edit",
        downloadButton: "Download",
        editContainerNameTitle: "Edit Container Name",
        newContainerNamePlaceholder: "Enter new container name",
        saveChangesButton: "Save Changes",
        dmInfoTitle: "DM Information",
        dmInputPlaceholder: "Enter DM code",
        dmArticleLabel: "Article:",
        dmInvoiceIdLabel: "Invoice ID:",
        dmNumberLabel: "Number:",
        dmStatusLabel: "Status:",
        dmContainerNameLabel: "Container Name:",
        dmContainerStatusLabel: "Container Status:",
        dmPackedDateLabel: "Packed Date:",
        languageLabel: "Language",
        logoutTooltip: "Logout",
        switchLanguageTooltip: "Switch language",
        na: "N/A",
        notPackedYet: "Not packed yet",
        containerWord: "Container",
        metaContainerId: "container_id",
        metaPackedDate: "packed_date",
        metaCreatedById: "created_by_id",
        noAccessToken: "No access token available",
        errorLoadingContainers: "Error loading containers",
        errorFetchingContainers: "Error fetching containers",
        noRefreshToken: "No refresh token available",
        failedRefreshToken: "Failed to refresh the access token",
        errorRefreshingToken: "Error refreshing access token",
        invalidDmFormat: "The string must be 85 characters long and start with '0104'.",
        failedRetrieveDmInfo: "Failed to retrieve DM info.",
        errorFetchDmInfo: "Error fetching DM info.",
        containerNotFound: "Container not found",
        selectContainerForShipment: "Please select a container to proceed to shipments",
        selectContainerToEdit: "Please select a container to edit",
        confirmDeleteContainer: "Are you sure you want to delete this container?",
        containerDeleted: "Container deleted successfully",
        errorPrefix: "Error",
        enterContainerName: "Please enter a container name",
        failedCreateContainer: "Failed to create container",
        failedDownloadContainer: "Failed to download container: {message}",
        failedDownloadContainers: "Failed to download containers list: {message}",
        noPackedContainersBulk: "No packed containers available for bulk download",
        selectContainerForDownload: "Please select a packed container to download",
        statusPacked: "Packed",
        statusNonPacked: "Not packed",
        statusNew: "New",
        statusPacking: "Packing",
        unknownError: "Unknown error"
    },
    ru: {
        pageTitle: "Управление контейнерами",
        containerNamePlaceholder: "Введите название контейнера",
        createContainerButton: "Создать контейнер",
        optionsLabel: "Параметры:",
        showPackedCheckboxLabel: "Показать упакованные",
        selectContainerOption: "-- Выберите контейнер --",
        goToShipmentButton: "К отгрузке",
        deleteContainerButton: "Удалить контейнер",
        editButton: "Редактировать",
        downloadButton: "Скачать",
        editContainerNameTitle: "Изменить название контейнера",
        newContainerNamePlaceholder: "Введите новое название контейнера",
        saveChangesButton: "Сохранить",
        dmInfoTitle: "Информация о DM",
        dmInputPlaceholder: "Введите DM-код",
        dmArticleLabel: "Артикул:",
        dmInvoiceIdLabel: "ID накладной:",
        dmNumberLabel: "Номер:",
        dmStatusLabel: "Статус:",
        dmContainerNameLabel: "Название контейнера:",
        dmContainerStatusLabel: "Статус контейнера:",
        dmPackedDateLabel: "Дата упаковки:",
        languageLabel: "Язык",
        logoutTooltip: "Выйти",
        switchLanguageTooltip: "Сменить язык",
        na: "Н/Д",
        notPackedYet: "Еще не упакован",
        containerWord: "Контейнер",
        metaContainerId: "container_id",
        metaPackedDate: "packed_date",
        metaCreatedById: "created_by_id",
        noAccessToken: "Отсутствует access token",
        errorLoadingContainers: "Ошибка загрузки контейнеров",
        errorFetchingContainers: "Ошибка запроса контейнеров",
        noRefreshToken: "Отсутствует refresh token",
        failedRefreshToken: "Не удалось обновить access token",
        errorRefreshingToken: "Ошибка обновления access token",
        invalidDmFormat: "Строка должна содержать 85 символов и начинаться с '0104'.",
        failedRetrieveDmInfo: "Не удалось получить информацию о DM.",
        errorFetchDmInfo: "Ошибка получения информации о DM.",
        containerNotFound: "Контейнер не найден",
        selectContainerForShipment: "Сначала выберите контейнер для перехода к отгрузке",
        selectContainerToEdit: "Сначала выберите контейнер для редактирования",
        confirmDeleteContainer: "Вы уверены, что хотите удалить этот контейнер?",
        containerDeleted: "Контейнер успешно удален",
        errorPrefix: "Ошибка",
        enterContainerName: "Введите название контейнера",
        failedCreateContainer: "Не удалось создать контейнер",
        failedDownloadContainer: "Не удалось скачать контейнер: {message}",
        failedDownloadContainers: "Не удалось скачать список контейнеров: {message}",
        noPackedContainersBulk: "Нет упакованных контейнеров для выгрузки",
        selectContainerForDownload: "Выберите упакованный контейнер для скачивания",
        statusPacked: "Упакован",
        statusNonPacked: "Не упакован",
        statusNew: "Новый",
        statusPacking: "В упаковке",
        unknownError: "Неизвестная ошибка"
    }
};

const BACKEND_MESSAGE_TRANSLATIONS = {
    ru: {
        "Error fetching DM code information.": "Ошибка получения информации о DM-коде.",
        "Error creating user.": "Ошибка создания пользователя.",
        "Error verifying password.": "Ошибка проверки пароля.",
        "An error occurred while creating the container.": "Ошибка создания контейнера.",
        "Error fetching the list of containers.": "Ошибка получения списка контейнеров.",
        "Error renaming container.": "Ошибка переименования контейнера.",
        "DM code not found in the dm_info table.": "DM-код не найден в таблице dm_info.",
        "User not found.": "Пользователь не найден.",
        "A user with this login already exists.": "Пользователь с таким логином уже существует.",
        "Incorrect password.": "Неверный пароль.",
        "A container with this name already exists.": "Контейнер с таким именем уже существует.",
        "Error adding DM code.": "Ошибка добавления DM-кода.",
        "Error fetching container name.": "Ошибка получения названия контейнера.",
        "This code was not found.": "Код не найден.",
        "Code successfully added to the container and container status updated.": "Код успешно добавлен в контейнер и статус контейнера обновлен.",
        "Error fetching DM codes.": "Ошибка получения DM-кодов.",
        "Error updating container status.": "Ошибка обновления статуса контейнера.",
        "Error generating container kit.": "Ошибка формирования комплектации контейнера.",
        "Error removing DM code from the container.": "Ошибка удаления DM-кода из контейнера.",
        "Error deleting container.": "Ошибка удаления контейнера.",
        "DM code not found in the container.": "DM-код не найден в контейнере.",
        "Invalid login or password": "Неверный логин или пароль",
        "Invalid token": "Неверный токен",
        "Authorization token missing": "Отсутствует токен авторизации",
        "Could not validate credentials": "Не удалось проверить учетные данные"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("createButton");
    const containerNameInput = document.getElementById("containerName");
    const containersDropdown = document.getElementById("containersDropdown");
    const goToShipmentButton = document.getElementById("goToShipmentButton");
    const editButton = document.getElementById("editButton");
    const deleteButton = document.getElementById("deleteButton");
    const downloadButton = document.getElementById("downloadButton");
    const showPackedCheckbox = document.getElementById("showPackedCheckbox");
    const dmInput = document.getElementById("dmInput");
    const messageBox = document.getElementById("messageBox");
    const errorSound = document.getElementById("error-sound");
    const successSound = document.getElementById("success-sound");
    const logoutButton = document.getElementById("logoutButton");
    const langLabel = document.getElementById("langLabel");
    const langEnButton = document.getElementById("langEnButton");
    const langRuButton = document.getElementById("langRuButton");
    const langControl = document.querySelector(".top-control-lang");

    let selectedContainerId = null;
    let selectedContainerStatus = null;
    let cachedContainers = [];

    const storedLanguage = (localStorage.getItem("lang") || "en").toLowerCase();
    let currentLanguage = storedLanguage === "ru" ? "ru" : "en";

    function t(key, vars = {}) {
        const template = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
        return template.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ""));
    }

    function applyTranslations() {
        document.documentElement.lang = currentLanguage;
        document.title = t("pageTitle");

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            if (key) {
                element.textContent = t(key);
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
            const key = element.getAttribute("data-i18n-placeholder");
            if (key) {
                element.placeholder = t(key);
            }
        });

        if (langLabel) {
            langLabel.textContent = t("languageLabel");
        }
        if (logoutButton) {
            logoutButton.title = t("logoutTooltip");
        }
        if (langEnButton) {
            const isEn = currentLanguage === "en";
            langEnButton.classList.toggle("active", isEn);
            langEnButton.setAttribute("aria-pressed", String(isEn));
        }
        if (langRuButton) {
            const isRu = currentLanguage === "ru";
            langRuButton.classList.toggle("active", isRu);
            langRuButton.setAttribute("aria-pressed", String(isRu));
        }
        if (langControl) {
            langControl.title = t("switchLanguageTooltip");
        }
    }

    function setLanguage(language) {
        currentLanguage = language === "ru" ? "ru" : "en";
        localStorage.setItem("lang", currentLanguage);
        applyTranslations();

        if (cachedContainers.length) {
            updateContainersDropdown(cachedContainers);
            updateButtons(false);
        }
    }

    function translateBackendMessage(message) {
        if (!message || typeof message !== "string") {
            return message;
        }

        if (currentLanguage === "en") {
            return message;
        }

        const directMessage = BACKEND_MESSAGE_TRANSLATIONS.ru[message];
        if (directMessage) {
            return directMessage;
        }

        let match = message.match(/^Container with ID (\d+) not found\.$/);
        if (match) {
            return `Контейнер с ID ${match[1]} не найден.`;
        }

        match = message.match(/^Container with ID (\d+) cannot be deleted because its status is not 'new'\.$/);
        if (match) {
            return `Контейнер с ID ${match[1]} нельзя удалить, потому что его статус не 'new'.`;
        }

        match = message.match(/^Container with ID (\d+) cannot be deleted because it contains DM codes\.$/);
        if (match) {
            return `Контейнер с ID ${match[1]} нельзя удалить, потому что в нем есть DM-коды.`;
        }

        match = message.match(/^Code already added to container (.+)\.$/);
        if (match) {
            return `Код уже добавлен в контейнер ${match[1]}.`;
        }

        match = message.match(/^Container '(.+)' \(ID (\d+)\) successfully deleted\.$/);
        if (match) {
            return `Контейнер '${match[1]}' (ID ${match[2]}) успешно удален.`;
        }

        match = message.match(/^An error occurred: (.+)$/);
        if (match) {
            return `Произошла ошибка: ${match[1]}`;
        }

        return message;
    }

    function normalizeApiMessage(payload) {
        if (!payload) {
            return "";
        }

        if (typeof payload === "string") {
            const trimmed = payload.trim();
            if (!trimmed) {
                return "";
            }

            try {
                const parsed = JSON.parse(trimmed);
                return normalizeApiMessage(parsed);
            } catch {
                return trimmed;
            }
        }

        if (typeof payload.message === "string") {
            return payload.message;
        }

        if (payload.detail) {
            if (typeof payload.detail === "string") {
                return payload.detail;
            }
            if (typeof payload.detail.message === "string") {
                return payload.detail.message;
            }
            try {
                return JSON.stringify(payload.detail);
            } catch {
                return String(payload.detail);
            }
        }

        return "";
    }

    function formatError(message) {
        const safeMessage = translateBackendMessage(message || t("unknownError"));
        return `${t("errorPrefix")}: ${safeMessage}`;
    }

    async function parseErrorResponse(response) {
        const contentType = response.headers.get("Content-Type") || "";

        if (contentType.includes("application/json")) {
            const payload = await response.json();
            return normalizeApiMessage(payload);
        }

        const payload = await response.text();
        return normalizeApiMessage(payload);
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
        option.textContent = container.container_name || `${t("containerWord")} ${container.container_id}`;
        option.dataset.containerName = container.container_name || `${t("containerWord")} ${container.container_id}`;
        option.dataset.containerMeta = buildContainerMeta(container);
        option.dataset.containerId = container.container_id ?? "";
        option.dataset.packedDate = container.packed_date ?? "";
        option.dataset.createdById = container.created_by_id ?? "";
        return option;
    }

    function updateContainersDropdown(containers) {
        const prevSelected = selectedContainerId ? String(selectedContainerId) : "";
        containersDropdown.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = t("selectContainerOption");
        containersDropdown.appendChild(defaultOption);

        containers.forEach((container) => {
            const option = createContainerOption(container);
            containersDropdown.appendChild(option);
        });

        if (prevSelected && containersDropdown.querySelector(`option[value="${prevSelected}"]`)) {
            containersDropdown.value = prevSelected;
            selectedContainerId = prevSelected;
        } else {
            containersDropdown.value = "";
            selectedContainerId = null;
        }
    }

    function playErrorSound() {
        errorSound.play();
    }

    function playSuccessSound() {
        successSound.play();
    }

    function showSuccessMessage(message) {
        messageBox.style.color = "green";
        messageBox.textContent = message;
    }

    function showErrorMessage(message) {
        messageBox.style.color = "red";
        messageBox.textContent = message;
    }

    function showWarning(message) {
        messageBox.style.color = "#b26a00";
        messageBox.textContent = message;
    }

    function clearSessionAndGoToLogin() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "index.html";
    }

    function getContainerStatuses() {
        if (showPackedCheckbox && !showPackedCheckbox.checked) {
            return ["new", "packing"];
        }

        return ["packed"];
    }

    function translateStatus(status) {
        if (!status) {
            return t("na");
        }

        if (status === "packed") {
            return t("statusPacked");
        }
        if (status === "non_packed") {
            return t("statusNonPacked");
        }
        if (status === "new") {
            return t("statusNew");
        }
        if (status === "packing") {
            return t("statusPacking");
        }

        return status;
    }

    async function refreshAccessToken() {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            alert(t("noRefreshToken"));
            clearSessionAndGoToLogin();
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

            if (!response.ok) {
                const errorMessage = await parseErrorResponse(response);
                alert(formatError(errorMessage || t("failedRefreshToken")));
                clearSessionAndGoToLogin();
                return;
            }

            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
            } else {
                alert(t("failedRefreshToken"));
                clearSessionAndGoToLogin();
            }
        } catch (error) {
            console.error("Error refreshing access token:", error);
            alert(t("errorRefreshingToken"));
            clearSessionAndGoToLogin();
        }
    }

    async function loadContainers() {
        const containerStatuses = getContainerStatuses();
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            clearSessionAndGoToLogin();
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/containers/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_statuses: containerStatuses })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                await loadContainers();
                return;
            }

            if (!response.ok) {
                const errorMessage = await parseErrorResponse(response);
                alert(formatError(errorMessage || t("errorLoadingContainers")));
                return;
            }

            const data = await response.json();

            if (data.success && data.containers.success) {
                cachedContainers = data.containers.containers || [];
                updateContainersDropdown(cachedContainers);
                updateButtons(false);
            } else {
                const errorMessage = normalizeApiMessage(data) || t("errorLoadingContainers");
                alert(formatError(errorMessage));
            }
        } catch (error) {
            console.error("Error:", error);
            alert(t("errorFetchingContainers"));
        }
    }

    function updateDmInfoPanel(dmInfo) {
        document.getElementById("dmArticle").textContent = dmInfo.article || t("na");
        document.getElementById("dmInvoiceDate").textContent = dmInfo.invoice_date || t("na");
        document.getElementById("dmCurrentPageNum").textContent = dmInfo.current_page_num || t("na");
        document.getElementById("dmStatus").textContent = translateStatus(dmInfo.status);

        if (dmInfo.status === "packed" && dmInfo.container_info) {
            document.getElementById("dmContainerName").textContent = dmInfo.container_info.container_name || t("na");
            document.getElementById("dmContainerStatus").textContent = translateStatus(dmInfo.container_info.container_status);
            document.getElementById("dmPackedDate").textContent = dmInfo.container_info.packed_date || t("notPackedYet");
        } else {
            document.getElementById("dmContainerName").textContent = "-";
            document.getElementById("dmContainerStatus").textContent = "-";
            document.getElementById("dmPackedDate").textContent = "-";
        }

        document.getElementById("dmInfoPanel").style.display = "block";
    }

    async function handleDmInfoInput() {
        const accessToken = localStorage.getItem("access_token");
        const input = dmInput.value.trim();

        if (input.length !== 85 || !input.startsWith("0104")) {
            showWarning(t("invalidDmFormat"));
            return;
        }

        const dmWithoutTail = input.slice(0, 31);

        try {
            const response = await fetch(`${BASE_URL}/api/dm/info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ dm_without_tail: dmWithoutTail })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                await handleDmInfoInput();
                return;
            }

            const data = await response.json();
            if (data.success && data.data) {
                updateDmInfoPanel(data.data);
                playSuccessSound();
                dmInput.value = "";
                showSuccessMessage("");
            } else {
                const errorMessage = normalizeApiMessage(data) || t("failedRetrieveDmInfo");
                showErrorMessage(translateBackendMessage(errorMessage));
            }
        } catch (error) {
            console.error("Error fetching DM info:", error);
            playErrorSound();
            showErrorMessage(t("errorFetchDmInfo"));
        }
    }

    function updateButtons(showNotFoundAlert = true) {
        selectedContainerId = containersDropdown.value;
        const isSelected = Boolean(selectedContainerId);
        goToShipmentButton.disabled = !isSelected;

        if (!selectedContainerId) {
            editButton.style.display = "none";
            editButton.disabled = true;
            deleteButton.style.display = "none";
            downloadButton.style.display = "none";
            downloadButton.disabled = true;
            return;
        }

        const selectedContainer = cachedContainers.find((container) => String(container.container_id) === String(selectedContainerId));

        if (!selectedContainer) {
            if (showNotFoundAlert) {
                alert(t("containerNotFound"));
            }
            editButton.style.display = "none";
            editButton.disabled = true;
            deleteButton.style.display = "none";
            downloadButton.style.display = "none";
            downloadButton.disabled = true;
            return;
        }

        selectedContainerStatus = selectedContainer.container_status;

        if (selectedContainerStatus === "new") {
            editButton.style.display = "none";
            editButton.disabled = true;
            goToShipmentButton.style.display = "inline-block";
            goToShipmentButton.disabled = false;
            downloadButton.style.display = "none";
            downloadButton.disabled = true;
            deleteButton.style.display = "inline-block";
        } else if (selectedContainerStatus === "packing") {
            goToShipmentButton.style.display = "inline-block";
            goToShipmentButton.disabled = false;
            editButton.style.display = "inline-block";
            editButton.disabled = false;
            downloadButton.style.display = "none";
            downloadButton.disabled = true;
            deleteButton.style.display = "none";
        } else if (selectedContainerStatus === "packed") {
            editButton.style.display = "none";
            editButton.disabled = true;
            goToShipmentButton.style.display = "none";
            goToShipmentButton.disabled = true;
            deleteButton.style.display = "none";
            downloadButton.style.display = "inline-block";
            downloadButton.disabled = false;
        } else {
            editButton.style.display = "none";
            editButton.disabled = true;
            deleteButton.style.display = "none";
            downloadButton.style.display = "none";
            downloadButton.disabled = true;
        }
    }

    async function deleteContainer() {
        if (!selectedContainerId) {
            return;
        }

        const accessToken = localStorage.getItem("access_token");

        try {
            const response = await fetch(`${BASE_URL}/api/containers/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_id: selectedContainerId })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                await deleteContainer();
                return;
            }

            const result = await response.json();
            if (response.ok && result.success) {
                alert(t("containerDeleted"));
                await loadContainers();
            } else {
                const errorMessage = normalizeApiMessage(result) || t("unknownError");
                alert(formatError(errorMessage));
            }
        } catch (error) {
            console.error("Error:", error);
            alert(formatError(t("unknownError")));
        }
    }

    async function createContainer() {
        const containerName = containerNameInput.value.trim();
        const accessToken = localStorage.getItem("access_token");

        if (!containerName) {
            alert(t("enterContainerName"));
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/containers/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_name: containerName })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                await createContainer();
                return;
            }

            const result = await response.json();

            if (response.ok && result.success && result.container_id) {
                window.location.href = `/containers/kit.html?container_id=${result.container_id}`;
            } else {
                const errorMessage = normalizeApiMessage(result) || t("failedCreateContainer");
                alert(formatError(errorMessage));
            }
        } catch (error) {
            console.error("Error:", error);
            alert(t("failedCreateContainer"));
        }
    }

    async function downloadContainersBulk(containerIds) {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            alert(t("noAccessToken"));
            return;
        }

        const body = {
            container_ids: containerIds,
            order_by: "container_id",
            order_dir: "desc"
        };

        try {
            const response = await fetch(`${BASE_URL}/api/containers/download_bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                credentials: "include",
                body: JSON.stringify(body)
            });

            if (response.status === 401) {
                await refreshAccessToken();
                await downloadContainersBulk(containerIds);
                return;
            }

            if (!response.ok) {
                const errorMessage = await parseErrorResponse(response);
                throw new Error(translateBackendMessage(errorMessage || t("unknownError")));
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "containers_bulk.xlsx";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Bulk download error:", error);
            alert(t("failedDownloadContainers", { message: error.message }));
        }
    }

    async function downloadContainer(containerId) {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            alert(t("noAccessToken"));
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/containers/download`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_id: Number(containerId) })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                await downloadContainer(containerId);
                return;
            }

            if (!response.ok) {
                const errorMessage = await parseErrorResponse(response);
                throw new Error(translateBackendMessage(errorMessage || t("unknownError")));
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `container_${containerId}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Container download error:", error);
            alert(t("failedDownloadContainer", { message: error.message }));
        }
    }

    dmInput.addEventListener("input", (event) => {
        if (event.target.value.length === 85) {
            handleDmInfoInput();
        }
    });

    goToShipmentButton.addEventListener("click", () => {
        if (selectedContainerId) {
            window.location.href = `kit.html?container_id=${selectedContainerId}`;
        } else {
            alert(t("selectContainerForShipment"));
        }
    });

    editButton.addEventListener("click", () => {
        if (selectedContainerId) {
            window.location.href = `edit.html?container_id=${selectedContainerId}`;
        } else {
            alert(t("selectContainerToEdit"));
        }
    });

    deleteButton.addEventListener("click", () => {
        const confirmDelete = confirm(t("confirmDeleteContainer"));
        if (confirmDelete) {
            deleteContainer();
        }
    });

    createButton.addEventListener("click", createContainer);

    showPackedCheckbox.addEventListener("change", () => {
        loadContainers();
    });

    containersDropdown.addEventListener("change", () => {
        updateButtons(true);
    });

    downloadButton.addEventListener("click", () => {
        const query = selectedContainerId
            ? `?container_id=${encodeURIComponent(String(selectedContainerId))}`
            : "";
        window.location.href = `download.html${query}`;
    });

    logoutButton.addEventListener("click", clearSessionAndGoToLogin);

    if (langEnButton) {
        langEnButton.addEventListener("click", () => {
            setLanguage("en");
        });
    }

    if (langRuButton) {
        langRuButton.addEventListener("click", () => {
            setLanguage("ru");
        });
    }

    setLanguage(currentLanguage);
    loadContainers();
});
