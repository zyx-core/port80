# MongoDB Atlas IP Whitelist Setup

## ⚠️ Issue Detected

Your MongoDB Atlas cluster is blocking connections because your current IP address is not whitelisted.

## 🔧 Quick Fix

### Option 1: Allow All IPs (Easiest for Development)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster (Cluster0)
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"**
5. Click **"Allow Access from Anywhere"**
6. Click **"Confirm"**

This will add `0.0.0.0/0` to the whitelist, allowing connections from any IP.

> **Note:** This is fine for development. For production, you should whitelist specific IPs.

### Option 2: Whitelist Your Current IP (More Secure)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster (Cluster0)
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"**
5. Click **"Add Current IP Address"**
6. Click **"Confirm"**

### Option 3: Whitelist Vercel IPs (For Production)

When deploying to Vercel, you need to allow all IPs since Vercel uses dynamic IPs:

1. Follow **Option 1** above (Allow Access from Anywhere)

## ✅ After Whitelisting

Run the test again:

```bash
cd /home/zyx/Downloads/port80
node test-db-connection.js
```

You should see:
```
✅ MongoDB connection successful!
```

## 🚀 Then Start Development

Once the connection test passes, you can start the development servers:

**Terminal 1 - Backend:**
```bash
cd /home/zyx/Downloads/port80
vercel dev
```

**Terminal 2 - Frontend:**
```bash
cd /home/zyx/Downloads/port80/frontend-new
npm run dev
```

## 📝 Current Configuration

Your `.env` file is already set up with:
- ✅ MongoDB URI
- ✅ JWT Secret
- ✅ Port (5000)

Frontend `.env` is configured for local development:
- ✅ API URL: `http://localhost:3000/api`

---

**Need help?** Check the [MongoDB Atlas IP Whitelist Documentation](https://www.mongodb.com/docs/atlas/security/ip-access-list/)
