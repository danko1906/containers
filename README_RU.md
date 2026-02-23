# containers

## Обзор
`containers` это сервис на FastAPI для упаковки контейнеров и работы с DM-кодами.
Фронтенд ? статика HTML/CSS/JS, обычно раздаётся через IIS.
Backend API работает на порту `5003`.

## Текущий Релиз
- Версия: `v1.1.0`
- Основная ветка: `main`
- Теги: `v1.0.0`, `v1.0.1`, `v1.1.0`

## Тестовые Данные Для Входа
- Логин: `test`
- Пароль: `123456`

## Стек
- Backend: FastAPI, Uvicorn, aiomysql
- Авторизация: JWT (access/refresh)
- Экспорт Excel: openpyxl
- Сборка бинарника: PyInstaller

## Структура Проекта
- `main.py` - точка входа
- `app.py` - создание app, DI, lifecycle БД
- `routes/` - API-маршруты
- `executors/` - бизнес-логика
- `processors/` - вспомогательные модули и Excel
- `dependencies/` - проверки доступа
- `static/` - фронтенд

## API
Авторизация:
- `POST /api/auth/register`
- `POST /api/auth/token`
- `POST /api/auth/refresh`

Контейнеры:
- `POST /api/containers/create`
- `POST /api/containers/get`
- `POST /api/containers/delete`
- `POST /api/containers/packed`
- `PUT /api/containers/rename`
- `POST /api/containers/kit`
- `POST /api/containers/download`
- `POST /api/containers/download_bulk`

DM:
- `POST /api/dm/add`
- `POST /api/dm/info`
- `POST /api/dm/delete`

Пользователь:
- `GET /api/user/protected`

## Что Было Добавлено в v1.1.0
- Bulk-выгрузка Excel: `POST /api/containers/download_bulk`
- Фильтры bulk:
  - `container_ids`
  - `container_id_from` / `container_id_to`
  - `packed_date_from` / `packed_date_to`
- Excel-формат «один файл / один лист» с сортировками
- Обновлён UI выгрузки (single/multi, select-all, фильтр packed_date)
- Единая конфигурация API на фронте: `static/scripts/config.js`
- Переименование файла: `engish_message.py` -> `english_message.py`

## Git Workflow (Simple)
- Оставляйте как long-lived только `main`
- Используйте короткие ветки:
  - `feat/<name>`, `fix/<name>`, `chore/<name>`
- Релизы отмечайте тегами:
  - `v1.1.0`, `v1.1.1`, `v1.2.0`

## Локальный Запуск
1. Создайте и активируйте venv:
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```
2. Установите зависимости:
```powershell
pip install -r requirements.txt
```
3. Настройте `.env`.
4. Запустите backend:
```powershell
python main.py
```

## Build EXE
```powershell
.\.venv\Scripts\python.exe -m PyInstaller --clean --noconfirm main.spec
```
Результат:
- `dist/main.exe`

## IIS Deployment for 192.168.2.100
### 1) Настройте `.env`
```env
DB_HOST=localhost

USER_DB_USER=user_manager
USER_DB_PASSWORD=user_manager
USER_DB_NAME=user_data

CNT_DB_USER=container_manager
CNT_DB_PASSWORD=container_manager
CNT_DB_NAME=container_info

DM_DB_USER=dm_manager
DM_DB_PASSWORD=dm_manager11
DM_DB_NAME=article_info

host="192.168.2.100"
port=5003
```
### 2) Запустите backend
Python:
```powershell
python main.py
```
EXE:
```powershell
.\dist\main.exe
```
### 3) Откройте порт в firewall
```powershell
netsh advfirewall firewall add rule name="containers_api_5003" dir=in action=allow protocol=TCP localport=5003
```
### 4) Опубликуйте статику в IIS
Скопируйте `static/*` в:
- `C:\inetpub\wwwroot\containers\`

В IIS Manager:
- убедитесь, что `Default Web Site` запущен
- создайте/проверьте alias `containers` -> `C:\inetpub\wwwroot\containers`
- убедитесь, что `index.html` есть в Default Document

### 5) Проверка URL
Фронтенд:
- `http://192.168.2.100/containers/`
- `http://192.168.2.100/containers/index.html`

API:
- `http://192.168.2.100:5003/docs`

## Известный Техдолг
- JWT secret захардкожен в `routes/auth.py` (вынести в `.env`)
- В `processors/` есть legacy-модули рядом с актуальными executors
- В `kit.js` используется `closeButton` без объявления
- `edit.js` выглядит как legacy-сценарий и нуждается в ревизии
