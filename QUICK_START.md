# 🚀 Port80 Serverless - Quick Start

## 📦 Project Structure
This project is configured as a Vercel Monorepo (Frontend + Backend in root).

- **Frontend:** React + Vite (in root)
- **Backend:** Serverless Functions (in `api/`)

## 🛠️ Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   - Copy `.env.example` to `.env` (if not already done)
   - Ensure `MONGO_URI` and `JWT_SECRET` are set.
   - `VITE_API_URL` should be set to `/api` for unified deployment.

## 🏃 Run Locally

```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Proxy: http://localhost:5173/api -> http://localhost:5000/api

## ☁️ Deploy to Vercel

1. **Login**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```
   - Follow the prompts.
   - **Root Directory:** `./` (default)
   - **Framework Preset:** Vite (should be auto-detected)
   - **Build Command:** `vite build` (default)
   - **Output Directory:** `dist` (default)

3. **Environment Variables (Vercel Dashboard)**
   - Add `MONGO_URI`
   - Add `JWT_SECRET`
   - (`VITE_API_URL` is optional if you hardcode it or use relative paths, but `/api` is recommended)

---
**That's it! Your full-stack app is ready.**
