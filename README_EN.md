# containers

## Overview
`containers` is a FastAPI-based service for container packing workflows with DM codes.
Frontend is static HTML/CSS/JS and is usually served by IIS.
Backend API runs on port `5003`.

## Current Release
- Version: `v1.1.0`
- Main branch: `main`
- Tags: `v1.0.0`, `v1.0.1`, `v1.1.0`

## Test Credentials
- Login: `test`
- Password: `123456`

## Stack
- Backend: FastAPI, Uvicorn, aiomysql
- Auth: JWT (access/refresh)
- Excel export: openpyxl
- Packaging: PyInstaller

## Project Structure
- `main.py` - entry point
- `app.py` - app factory, DI, DB lifecycle
- `routes/` - API routes
- `executors/` - business logic
- `processors/` - helpers and Excel generation
- `dependencies/` - access checks
- `static/` - frontend assets

## API
Auth:
- `POST /api/auth/register`
- `POST /api/auth/token`
- `POST /api/auth/refresh`

Containers:
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

User:
- `GET /api/user/protected`

## What Was Added in v1.1.0
- Bulk Excel export endpoint: `POST /api/containers/download_bulk`
- Bulk filters:
  - `container_ids`
  - `container_id_from` / `container_id_to`
  - `packed_date_from` / `packed_date_to`
- Single-sheet bulk Excel output with sorting options
- Updated download UI (single/multi, select-all, packed_date filter)
- Unified frontend API base config: `static/scripts/config.js`
- Message filename rename: `engish_message.py` -> `english_message.py`

## Git Workflow (Simple)
- Keep only `main` as a long-lived branch
- Use short-lived branches:
  - `feat/<name>`, `fix/<name>`, `chore/<name>`
- Mark releases with tags:
  - `v1.1.0`, `v1.1.1`, `v1.2.0`

## Local Run
1. Create and activate venv:
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```
2. Install dependencies:
```powershell
pip install -r requirements.txt
```
3. Configure `.env`.
4. Start backend:
```powershell
python main.py
```

## Build EXE
```powershell
.\.venv\Scripts\python.exe -m PyInstaller --clean --noconfirm main.spec
```
Result:
- `dist/main.exe`

## IIS Deployment for 192.168.2.100
### 1) Configure `.env`
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
### 2) Start backend
Python:
```powershell
python main.py
```
EXE:
```powershell
.\dist\main.exe
```
### 3) Open firewall port
```powershell
netsh advfirewall firewall add rule name="containers_api_5003" dir=in action=allow protocol=TCP localport=5003
```
### 4) Publish static files in IIS
Copy `static/*` to:
- `C:\inetpub\wwwroot\containers\`

In IIS Manager:
- ensure `Default Web Site` is running
- create/check alias `containers` -> `C:\inetpub\wwwroot\containers`
- ensure `index.html` is in Default Document

### 5) Verify URLs
Frontend:
- `http://192.168.2.100/containers/`
- `http://192.168.2.100/containers/index.html`

API:
- `http://192.168.2.100:5003/docs`

## Known Technical Debt
- JWT secret is hardcoded in `routes/auth.py` (move to `.env`)
- Legacy modules exist in `processors/` alongside active executors
- `kit.js` references `closeButton` without declaration
- `edit.js` appears legacy and needs review
