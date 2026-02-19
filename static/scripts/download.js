const container_statuses = ["packed"];
const BASE_URL = 'http://192.168.2.101:5001';

document.addEventListener("DOMContentLoaded", function () {
    const containerSelect = document.getElementById("containerSelect");
    const table = document.getElementById("containerTable");
    const tableBody = document.getElementById("tableBody");
    const downloadButton = document.getElementById("downloadButton");

    let selectedContainerId = getContainerIdFromURL();

    async function fetchContainers() {
        const accessToken = localStorage.getItem('access_token');  
        try {
            const response = await fetch(`${BASE_URL}/api/containers/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_statuses })
            });

            if (response.status === 401) {
                await refreshAccessToken();
                return fetchContainers();  // Retry the request
            }

            const data = await response.json();
            if (data.success && data.containers.success) {
                data.containers.containers.forEach(container => {
                    const option = document.createElement("option");
                    option.value = container.container_id;
                    option.textContent = container.container_name;
                    containerSelect.appendChild(option);
                });
                
                if (selectedContainerId) {
                    containerSelect.value = selectedContainerId;
                    fetchContainerKit(selectedContainerId);
                }
            }
        } catch (error) {
            console.error("Error fetching containers:", error);
        }
    }

    async function fetchContainerKit(containerId) {
        const accessToken = localStorage.getItem('access_token');  
        try {
            const response = await fetch(`${BASE_URL}/api/containers/kit`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_id: containerId }),
            });

            if (response.status === 401) {
                await refreshAccessToken();
                return fetchContainerKit(containerId);  // Retry the request
            }

            const data = await response.json();
            if (data.success && data.container_kit.success) {
                tableBody.innerHTML = ""; // Clear existing rows
                data.container_kit.scanned.forEach(item => {
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
                downloadButton.style.display = "block";
            }
        } catch (error) {
            console.error("Error fetching container kit:", error);
        }
    }

    async function downloadContainerKit(containerId, containerName) {
        const accessToken = localStorage.getItem('access_token');  
        try {
            const response = await fetch(`${BASE_URL}/api/containers/download`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ container_id: containerId }),
            });

            if (response.status === 401) {
                await refreshAccessToken();
                return downloadContainerKit(containerId, containerName);  // Retry the request
            }

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = `${containerName}_kit.xlsx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Error downloading container kit:", error);
        }
    }

    function getContainerIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("container_id");
    }

    containerSelect.addEventListener("change", function () {
        selectedContainerId = containerSelect.value;
        if (selectedContainerId !== "default") {
            fetchContainerKit(selectedContainerId);
        }
    });

    downloadButton.addEventListener("click", function () {
        if (selectedContainerId) {
            const selectedOption = containerSelect.options[containerSelect.selectedIndex];
            const containerName = selectedOption.textContent;
            downloadContainerKit(selectedContainerId, containerName);
        }
    });

    fetchContainers();
});

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        alert('No refresh token available');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken })
        });

        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        } else {
            alert('Failed to refresh the access token');
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        alert('Error refreshing access token');
    }
}
