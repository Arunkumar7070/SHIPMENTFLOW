# ⚡ CourierTrack - Quick Start Reference

## 🎯 Start in 3 Steps

### Windows:
1. Double-click `start-backend.bat` → Wait for "startup complete"
2. Double-click `start-frontend.bat` → Wait for "Local: http://localhost:5173"
3. Open browser → http://localhost:5173

### Mac/Linux:
1. Run `./start-backend.sh` → Wait for "startup complete"
2. Run `./start-frontend.sh` → Wait for "Local: http://localhost:5173"
3. Open browser → http://localhost:5173

---

## 🔗 Important URLs

| What | URL |
|------|-----|
| 🌐 **Web App** | http://localhost:5173 |
| 🔌 **API** | http://localhost:8000 |
| 📖 **API Docs** | http://localhost:8000/docs |

---

## 🔑 Default Accounts

### Create Your Own (Recommended)
1. Click "Register"
2. Fill form and select role
3. Click "Register"
4. Login with your credentials

### Test Accounts
| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | admin@courier.local | admin123 |
| 📋 Dispatcher | dispatcher@courier.local | dispatcher123 |
| 🚚 Driver | driver@courier.local | driver123 |
| 📦 Customer | customer@courier.local | customer123 |

---

## 🛑 Stop the Servers

**Windows**: Press `Ctrl + C` in both Command Prompt windows
**Mac/Linux**: Press `Ctrl + C` in both Terminal windows

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| Backend won't start | 1. Install Python 3.10+ <br> 2. Make sure PostgreSQL is running |
| Frontend won't start | 1. Install Node.js 18+ <br> 2. Run `npm install` in frontend folder |
| Can't login | Make sure you registered first! |
| Database error | Check PostgreSQL is running on port 5432 |

---

## 📁 Project Structure

```
couriertrack-fixed/
├── project/
│   ├── backend/           ← Python/FastAPI backend
│   ├── frontend/          ← React/TypeScript frontend
│   ├── start-backend.bat  ← Windows backend launcher
│   ├── start-backend.sh   ← Mac/Linux backend launcher
│   ├── start-frontend.bat ← Windows frontend launcher
│   └── start-frontend.sh  ← Mac/Linux frontend launcher
```

---

## 🔄 Restart After Computer Reboot

1. Start backend first (wait for startup complete)
2. Start frontend second
3. Open browser to http://localhost:5173

**That's it! You're ready to go! 🚀**
