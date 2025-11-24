# Port80 Serverless Migration Guide

## 🎯 Overview

This project has been successfully migrated from a traditional Express.js backend to a serverless architecture using **Vercel Serverless Functions**.

## 📁 Project Structure

```
port80/
├── api/                          # Serverless functions
│   ├── _lib/                     # Shared utilities
│   │   ├── db.js                 # MongoDB connection with caching
│   │   ├── auth.js               # Authentication utilities
│   │   └── models/               # Mongoose models
│   │       ├── studentModel.js
│   │       └── adminModel.js
│   ├── students/                 # Student endpoints
│   │   ├── register.js           # POST /api/students/register
│   │   ├── login.js              # POST /api/students/login
│   │   ├── profile.js            # GET /api/students/profile
│   │   └── progress.js           # PUT /api/students/progress
│   └── admin/                    # Admin endpoints
│       ├── register.js           # POST /api/admin/register
│       ├── login.js              # POST /api/admin/login
│       ├── dashboard.js          # GET /api/admin/dashboard
│       ├── students.js           # GET /api/admin/students
│       ├── report.js             # POST /api/admin/report
│       └── student/
│           └── [id].js           # GET/PUT/DELETE /api/admin/student/:id
├── frontend-new/                 # React frontend
│   └── src/
│       └── config/
│           └── api.js            # API configuration
├── backend/                      # Legacy Express backend (keep for reference)
├── vercel.json                   # Vercel configuration
├── package.json                  # Root dependencies
└── .env.example                  # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or MongoDB instance)
- Vercel account (for deployment)

### 1. Install Dependencies

```bash
cd /home/zyx/Downloads/port80

# Install root dependencies (for serverless functions)
npm install

# Install frontend dependencies
cd frontend-new
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your values:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/port80
JWT_SECRET=your-super-secret-jwt-key-here
```

Create a `.env` file in `frontend-new/`:

```bash
cd frontend-new
cp .env.example .env
```

Edit `frontend-new/.env`:

```env
# For local development
VITE_API_URL=http://localhost:3000/api

# For production (update after deployment)
# VITE_API_URL=https://your-app.vercel.app/api
```

### 3. Local Development

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run serverless functions locally
cd /home/zyx/Downloads/port80
vercel dev
```

This will start the serverless functions at `http://localhost:3000`

#### Option B: Using the Legacy Express Server

```bash
cd backend
npm install
npm run dev
```

This runs the old Express server at `http://localhost:5000`

### 4. Run Frontend

In a separate terminal:

```bash
cd frontend-new
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Student Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/students/register` | Register new student | No |
| POST | `/api/students/login` | Student login | No |
| GET | `/api/students/profile` | Get student profile | Yes (Student) |
| PUT | `/api/students/progress` | Update progress | Yes (Student) |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/register` | Register new admin | No |
| POST | `/api/admin/login` | Admin login | No |
| GET | `/api/admin/dashboard` | Get dashboard stats | Yes (Admin) |
| GET | `/api/admin/students` | Get all students | Yes (Admin) |
| GET | `/api/admin/student/:id` | Get single student | Yes (Admin) |
| PUT | `/api/admin/student/:id` | Update student | Yes (Admin) |
| DELETE | `/api/admin/student/:id` | Delete student | Yes (Admin) |
| POST | `/api/admin/report` | Generate report | Yes (Admin) |

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd /home/zyx/Downloads/port80
   vercel --prod
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key

5. **Update Frontend Environment Variable**:
   - After deployment, update `frontend-new/.env`:
   ```env
   VITE_API_URL=https://your-app.vercel.app/api
   ```

6. **Deploy Frontend** (if separate):
   ```bash
   cd frontend-new
   vercel --prod
   ```

## 🔧 Key Changes from Express to Serverless

### 1. **Database Connection**
- **Before**: Single persistent connection
- **After**: Connection caching to handle serverless cold starts

### 2. **Middleware**
- **Before**: Express middleware chain
- **After**: Utility functions called within each serverless function

### 3. **Routing**
- **Before**: Express Router with centralized routes
- **After**: File-based routing (each file is an endpoint)

### 4. **CORS**
- **Before**: `cors()` middleware
- **After**: Manual CORS headers in each function

### 5. **Request/Response**
- **Before**: Express `req` and `res` objects
- **After**: Vercel's serverless `req` and `res` objects (similar API)

## 🧪 Testing

### Test Student Registration

```bash
curl -X POST http://localhost:3000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "branch": "CSE",
    "year": "2"
  }'
```

### Test Student Login

```bash
curl -X POST http://localhost:3000/api/students/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Protected Route

```bash
# Replace YOUR_TOKEN with the token from login response
curl -X GET http://localhost:3000/api/students/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📝 Notes

- The original `backend/` directory is kept for reference but is no longer used
- All frontend API calls now use the `getApiUrl()` helper from `config/api.js`
- MongoDB connection is automatically cached to improve cold start performance
- Each serverless function handles its own CORS headers

## 🐛 Troubleshooting

### Cold Start Issues
- First request may be slow (~2-3 seconds) due to cold start
- Subsequent requests will be faster due to connection caching

### CORS Errors
- Ensure CORS headers are set in each serverless function
- Check that `Access-Control-Allow-Origin` is set correctly

### MongoDB Connection Errors
- Verify `MONGO_URI` is correct in environment variables
- Ensure MongoDB Atlas allows connections from Vercel IPs (0.0.0.0/0)

### Authentication Errors
- Check that JWT_SECRET is the same across all environments
- Verify token is being sent in `Authorization: Bearer <token>` format

## 📚 Additional Resources

- [Vercel Serverless Functions Documentation](https://vercel.com/docs/functions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## ✅ Migration Checklist

- [x] Created serverless function structure
- [x] Migrated all API endpoints
- [x] Set up MongoDB connection caching
- [x] Created authentication utilities
- [x] Updated frontend API configuration
- [x] Created Vercel configuration
- [ ] Test all endpoints locally
- [ ] Deploy to Vercel
- [ ] Update production environment variables
- [ ] Test production deployment
