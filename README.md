# Enterprise CRM

## Stack
- Frontend: React + Vite + Tailwind
- Backend: Node.js + Express + MongoDB
- Auth: JWT
- Upload: Multer
- Realtime notifications: Socket.IO

## Installation

### 1. Clone / create folders
Create 2 folders:
- `server`
- `client`

### 2. Backend
```bash
cd server
npm install
cp .env.example .env
npm run seed:admin
npm run dev