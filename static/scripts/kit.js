const BASE_URL = window.APP_CONFIG?.BASE_URL || "http://127.0.0.1:5001";
const containerId = new URLSearchParams(window.location.search).get('container_id');
const appContainer = document.getElementById('app');
const dmInput = document.getElementById('dmInput');
const clearButton = document.getElementById('clearButton');
const backToContainersButton = document.getElementById('backToContainersButton');
const errorMessage = document.getElementById('error-message');
const errorSound = document.getElementById('error-sound');
const successSound = document.getElementById('success-sound');
const modeSwitch = document.getElementById('modeSwitch');
const modeText = document.getElementById('modeText');
const modalText = document.getElementById('modalText');
const confirmationModal = document.getElementById('confirmationModal');
const confirmButton = document.getElementById('confirmButton'); // Было confirmSwitchButton
const cancelButton = document.getElementById('cancelButton');  

const LANG = (localStorage.getItem('lang') || 'en').toLowerCase() === 'ru' ? 'ru' : 'en';

const I18N = {
	en: {
		pageTitle: 'Container Kit',
		backToContainersButton: 'Back to Containers',
		modeAdd: 'ADD Mode',
		modeDelete: 'DELETE Mode',
		modeAddName: 'ADD',
		modeDeleteName: 'DELETE',
		dmInputPlaceholder: 'Enter DM code (85 characters)',
		clearButton: 'Clear',
		modalDefaultText: 'Are you sure?',
		confirmButton: 'Yes',
		cancelButton: 'Cancel',
		confirmSwitchMode: 'Are you sure you want to switch to {mode} mode?',
		confirmMarkPacked: 'Are you sure you want to mark this container as "Packed"?',
		errorContainerIdMissing: 'Error: container_id not specified in URL.',
		loading: 'Loading...',
		errorFetchingData: 'Error fetching data',
		unableFetchContainerKit: 'Unable to fetch container kit',
		errorPrefix: 'Error: {message}',
		failedMarkPacked: 'Failed to mark container as packed',
		containerMarkedPacked: 'Container successfully marked as "Packed".',
		containerIsPacked: 'Container is packed!',
		errorChangingStatus: 'Error changing container status',
		packedButton: 'Packed',
		tableArticle: 'Article',
		tableTotal: 'Total',
		justStartScan: 'Just start scan',
		invalidDmFormat: "The string must be 85 characters long and start with '0104'.",
		errorProcessingDmCode: 'Error processing DM code',
		failedProcessDmCode: 'Failed to process DM code',
		noRefreshToken: 'No refresh token available',
		failedRefreshToken: 'Failed to refresh the access token',
		errorRefreshToken: 'Error refreshing access token'
	},
	ru: {
		pageTitle: 'Комплектация контейнера',
		backToContainersButton: 'Назад к контейнерам',
		modeAdd: 'Режим ДОБАВЛЕНИЯ',
		modeDelete: 'Режим УДАЛЕНИЯ',
		modeAddName: 'ДОБАВЛЕНИЕ',
		modeDeleteName: 'УДАЛЕНИЕ',
		dmInputPlaceholder: 'Введите DM-код (85 символов)',
		clearButton: 'Очистить',
		modalDefaultText: 'Вы уверены?',
		confirmButton: 'Да',
		cancelButton: 'Отмена',
		confirmSwitchMode: 'Вы уверены, что хотите переключиться в режим {mode}?',
		confirmMarkPacked: 'Вы уверены, что хотите отметить контейнер как "Упакован"?',
		errorContainerIdMissing: 'Ошибка: container_id не указан в URL.',
		loading: 'Загрузка...',
		errorFetchingData: 'Ошибка получения данных',
		unableFetchContainerKit: 'Не удалось получить комплект контейнера',
		errorPrefix: 'Ошибка: {message}',
		failedMarkPacked: 'Не удалось пометить контейнер как упакованный',
		containerMarkedPacked: 'Контейнер успешно отмечен как "Упакован".',
		containerIsPacked: 'Контейнер упакован!',
		errorChangingStatus: 'Ошибка изменения статуса контейнера',
		packedButton: 'Упакован',
		tableArticle: 'Артикул',
		tableTotal: 'Количество',
		justStartScan: 'Просто начните сканирование',
		invalidDmFormat: "Строка должна содержать 85 символов и начинаться с '0104'.",
		errorProcessingDmCode: 'Ошибка обработки DM-кода',
		failedProcessDmCode: 'Не удалось обработать DM-код',
		noRefreshToken: 'Токен обновления отсутствует',
		failedRefreshToken: 'Не удалось обновить access token',
		errorRefreshToken: 'Ошибка обновления access token'
	}
};

function t(key, vars = {}) {
	const template = I18N[LANG]?.[key] || I18N.en[key] || key;
	return template.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ''));
}

function applyStaticTranslations() {
	document.documentElement.lang = LANG;
	document.title = t('pageTitle');

	const i18nNodes = document.querySelectorAll('[data-i18n]');
	i18nNodes.forEach((node) => {
		const key = node.getAttribute('data-i18n');
		if (key) {
			node.textContent = t(key);
		}
	});

	const placeholderNodes = document.querySelectorAll('[data-i18n-placeholder]');
	placeholderNodes.forEach((node) => {
		const key = node.getAttribute('data-i18n-placeholder');
		if (key) {
			node.placeholder = t(key);
		}
	});
}

function modeLabel(modeValue) {
	return modeValue === 'ADD' ? t('modeAddName') : t('modeDeleteName');
}

function updateModeText(modeValue) {
	modeText.textContent = modeValue === 'ADD' ? t('modeAdd') : t('modeDelete');
}

applyStaticTranslations();
updateModeText('ADD');

if (backToContainersButton) {
	backToContainersButton.addEventListener('click', () => {
		window.location.href = '/containers/container.html';
	});
}

modeSwitch.addEventListener('change', () => {
    showConfirmationModal(
        t('confirmSwitchMode', { mode: modeLabel(containerApp.currentMode === 'ADD' ? 'DELETE' : 'ADD') }),
        'switchMode'
    );
});

// Обработчик подтверждения смены режима


class ContainerApp {
  constructor(containerId) {
    this.containerId = containerId;
    this.currentMode = 'ADD';
  }

  init() {
    if (!this.containerId) {
      appContainer.innerHTML = `<div class="error">${t('errorContainerIdMissing')}</div>`;
      return;
    }

    document.addEventListener('DOMContentLoaded', () => {
      this.fetchContainerKit();
      this.setupEventListeners();
    });
  }

  setupEventListeners() {
    dmInput.addEventListener('input', this.handleDmInput.bind(this));
    clearButton.addEventListener('click', this.clearInput.bind(this));
	document.addEventListener('click', (event) => {
    const ignoredElements = ['BUTTON', 'INPUT', 'LABEL']; // Исключаем кнопки, поля ввода и метки
    if (!ignoredElements.includes(event.target.tagName) && event.target !== modeSwitch) {
        dmInput.focus();
    }
});

  }

	

  async fetchContainerKit() {
	  appContainer.innerHTML = `<div class="loading">${t('loading')}</div>`;
	  const accessToken = localStorage.getItem('access_token');

	  try {
		const response = await fetch(`${BASE_URL}/api/containers/kit`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		  },
		  body: JSON.stringify({ container_id: parseInt(this.containerId) }),
		});

		if (response.status === 401) {
		  await this.refreshAccessToken();
		  return this.fetchContainerKit();
		}
	
		if (!response.ok) throw new Error(t('errorFetchingData'));

		const data = await response.json();
		if (data.success) {
		  this.displayContainerKit(data.container_kit);
		  dmInput.value = '';
		  dmInput.focus();
		} else {
		  throw new Error(data.message || t('unableFetchContainerKit'));
		}
	  } catch (err) {
		// Показываем окно ошибки с сообщением
		showErrorPopup(t('errorPrefix', { message: err.message }));
	  }
	}

	async markAsPacked() {
		showConfirmationModal(
			t('confirmMarkPacked'),
			'markPacked',
			async () => {
				const accessToken = localStorage.getItem('access_token');
				try {
					const response = await fetch(`${BASE_URL}/api/containers/packed`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${accessToken}`,
						},
						body: JSON.stringify({ container_id: parseInt(this.containerId) }),
					});

					if (response.status === 401) {
						await this.refreshAccessToken();
						return this.markAsPacked();
					}

					if (!response.ok) throw new Error(t('failedMarkPacked'));

					const data = await response.json();
					if (data.success) {
						alert(t('containerMarkedPacked'));
						appContainer.innerHTML = `<p>${t('containerIsPacked')}</p>`;
						window.location.href = `/containers/download.html?container_id=${containerId}`;
					} else {
						throw new Error(data.message || t('errorChangingStatus'));
					}
				} catch (err) {
					showErrorPopup(t('errorPrefix', { message: err.message }));
				}
			}
		);
	}


	  switchMode() {
		this.currentMode = this.currentMode === 'ADD' ? 'DELETE' : 'ADD';
		updateModeText(this.currentMode);

		if (this.currentMode === 'ADD') {
		  document.body.style.backgroundColor = '#BBDEFB';
		  document.querySelectorAll('button').forEach(btn => btn.style.backgroundColor = '#2196F3');
		} else {
		  document.body.style.backgroundColor = '#FFCDD2';
		  document.querySelectorAll('button').forEach(btn => btn.style.backgroundColor = '#F44336');
		}
		
		// Очищаем поле ввода и устанавливаем фокус
		dmInput.value = '';
		dmInput.focus();
	  }

	


	displayContainerKit(containerKit) {
		const containerStatus = containerKit.container_status;

		// Убираем "Loading..." при загрузке данных
		const loadingElement = document.querySelector('.loading');
		if (loadingElement) {
			loadingElement.remove();
		}

		// Создаем контейнер для динамического контента, если он отсутствует
		let containerContent = document.getElementById('containerContent');
		if (!containerContent) {
			containerContent = document.createElement('div');
			containerContent.id = 'containerContent';
			appContainer.appendChild(containerContent);
		}

		// Если кнопки еще нет, создаем её один раз
		let packedButton = document.getElementById('packedButton');
		if (!packedButton) {
			packedButton = document.createElement('button');
			packedButton.id = 'packedButton';
			packedButton.textContent = t('packedButton');
			packedButton.addEventListener('click', this.markAsPacked.bind(this));
			appContainer.appendChild(packedButton);
		}

		// Обновляем только контейнер с контентом, не затрагивая кнопку
		let html = `<h1>${containerKit.container_name}</h1>`;

		if (containerStatus === "packing") {
			html += `
				<table>
					<thead>
						<tr><th>${t('tableArticle')}</th><th>${t('tableTotal')}</th></tr>
					</thead>
					<tbody>
						${containerKit.scanned.map(item => `
							<tr><td>${item.article}</td><td>${item.total}</td></tr>
						`).join('')}
					</tbody>
				</table>
			`;
		} else if (containerStatus === "new") {
			html += `<p>${t('justStartScan')}</p>`;
		}

		// Вставляем обновленный контент в контейнер, не трогая кнопку
		containerContent.innerHTML = html;
	}



  async handleDmInput() {
	  const input = dmInput.value.trim();
	  if (input.length !== 85 || !input.startsWith("0104")) {
		showWarning(t('invalidDmFormat'));
		dmInput.value = '';
        dmInput.focus();
		return;
	  }


    errorMessage.textContent = '';
    const dm_without_tail = input.slice(0, 31);
    const accessToken = localStorage.getItem('access_token');
    let endpoint = this.currentMode === 'ADD' ? `${BASE_URL}/api/dm/add` : `${BASE_URL}/api/dm/delete`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ dm_without_tail: dm_without_tail, container_id: parseInt(this.containerId) }),
      });

      if (response.status === 401) {
        await this.refreshAccessToken();
        return this.handleDmInput();
      }

      if (!response.ok && response.status!=400) throw new Error(t('errorProcessingDmCode'));

      const data = await response.json();
      if (data.success) {
        this.displayContainerKit(data.container_kit);
        this.playSuccessSound();
        dmInput.value = '';
        dmInput.focus();
      } else {
        throw new Error(data.message || t('failedProcessDmCode'));
      }
    } catch (err) {
	  this.playErrorSound();
	  dmInput.value = '';
      dmInput.focus();
      showErrorPopup(t('errorPrefix', { message: err.message }));

    } finally {
      dmInput.focus();
    }
  }



  clearInput() {
    dmInput.value = '';
    dmInput.focus();
  }

  playErrorSound() {
   errorSound.play();
  }
  playSuccessSound() {
    successSound.play();
  }

  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      alert(t('noRefreshToken'));
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
      } else {
        alert(t('failedRefreshToken'));
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      alert(t('errorRefreshToken'));
    }
  }




}

const containerApp = new ContainerApp(containerId);
containerApp.init();

	function showConfirmationModal(text, actionType, onConfirm, onCancel) {
		modalText.textContent = text;
		confirmationModal.style.display = 'block';

		confirmButton.onclick = () => {
			confirmationModal.style.display = 'none';
			if (actionType === 'switchMode') {
				containerApp.switchMode();
			} else if (actionType === 'markPacked') {
				onConfirm();
			}
		};

		cancelButton.onclick = () => {
			confirmationModal.style.display = 'none';
			if (actionType === 'switchMode') {
				modeSwitch.checked = containerApp.currentMode === 'DELETE'; // Откат переключателя
			}
			if (onCancel) onCancel();
				dmInput.focus();
		};
	}

	function showWarning(message) {
	  const warningMessage = document.getElementById('warning-message');
	  warningMessage.textContent = message;
	  warningMessage.style.display = 'block';
	  setTimeout(() => warningMessage.style.display = 'none', 5000); // Скрыть через 5 секунд
	}

	// Показывает окно с ошибкой
	function showErrorPopup(message) {
		const errorPopup = document.getElementById('error-popup');
		const errorText = document.getElementById('error-text');

		errorText.textContent = message;
		errorPopup.style.display = 'block';

		// Automatically close the popup after 10 seconds
		setTimeout(() => {
			errorPopup.style.display = 'none';
		}, 5000);

		closeButton.addEventListener('click', () => {
			errorPopup.style.display = 'none';
		});
	}
