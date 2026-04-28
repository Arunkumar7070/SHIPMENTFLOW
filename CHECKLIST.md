# ✅ First-Time Setup Checklist

Use this checklist to ensure everything is set up correctly.

---

## 📋 Before You Start

### Prerequisites Check

- [ ] **Python 3.10+** installed
  - Test: Open Command Prompt/Terminal, type `python --version`
  - Should show: Python 3.10.x or higher
  - Download: https://python.org/downloads

- [ ] **Node.js 18+** installed
  - Test: Type `node --version`
  - Should show: v18.x.x or higher
  - Download: https://nodejs.org

- [ ] **PostgreSQL 14+** installed and running
  - Test: Type `psql --version`
  - Should show: psql (PostgreSQL) 14.x or higher
  - Download: https://postgresql.org/download

---

## 🗄️ Database Setup

### Step 1: Open PostgreSQL

- [ ] Open **pgAdmin** (PostgreSQL admin tool)
- [ ] or open **psql** command line

### Step 2: Create Database

- [ ] Create database named: **courier_db**
  ```sql
  CREATE DATABASE courier_db;
  ```

### Step 3: Create User

- [ ] Create user named: **courier_user**
- [ ] With password: **courier_pass**
  ```sql
  CREATE USER courier_user WITH PASSWORD 'courier_pass';
  ```

### Step 4: Grant Permissions

- [ ] Grant all privileges to courier_user
  ```sql
  GRANT ALL PRIVILEGES ON DATABASE courier_db TO courier_user;
  ```

### ✅ Database Check
- [ ] Database **courier_db** exists
- [ ] User **courier_user** can connect
- [ ] PostgreSQL service is running

---

## 🚀 Application Setup

### Step 1: Extract Project

- [ ] Extract couriertrack.zip to a folder
- [ ] Navigate to the **project** folder
- [ ] You can see: backend/, frontend/, *.bat, *.sh files

### Step 2: Backend Setup

#### Windows:
- [ ] Double-click **start-backend.bat**
- [ ] Wait for: "Application startup complete"
- [ ] Keep the window open

#### Mac/Linux:
- [ ] Run: `./start-backend.sh`
- [ ] Wait for: "Application startup complete"
- [ ] Keep terminal open

#### ✅ Backend Check:
- [ ] No error messages in the terminal
- [ ] Can open: http://localhost:8000
- [ ] Can open: http://localhost:8000/docs (Swagger UI)
- [ ] See message: "CourierTrack API v1.0"

### Step 3: Frontend Setup

#### Windows:
- [ ] Open NEW Command Prompt
- [ ] Double-click **start-frontend.bat**
- [ ] Wait for: "Local: http://localhost:5173"
- [ ] Keep the window open

#### Mac/Linux:
- [ ] Open NEW Terminal
- [ ] Run: `./start-frontend.sh`
- [ ] Wait for: "Local: http://localhost:5173"
- [ ] Keep terminal open

#### ✅ Frontend Check:
- [ ] No error messages in terminal
- [ ] Can open: http://localhost:5173
- [ ] See CourierTrack login page
- [ ] Page loads without errors

---

## 👤 First Account Setup

### Step 1: Register

- [ ] Open: http://localhost:5173
- [ ] Click: **"Register"** link
- [ ] Fill in the registration form:
  - [ ] Name (your name)
  - [ ] Email (valid email)
  - [ ] Phone (your phone)
  - [ ] Password (min 8 characters)
  - [ ] Role: Choose **"Admin"** for full access
- [ ] Click: **"Register"** button

#### ✅ Registration Check:
- [ ] No error messages
- [ ] Redirected to login page
- [ ] See success notification

### Step 2: Login

- [ ] Enter your email
- [ ] Enter your password
- [ ] Click: **"Login"** button

#### ✅ Login Check:
- [ ] No error messages
- [ ] Redirected to dashboard
- [ ] See your name in top-right corner
- [ ] Can see navigation menu

---

## 🎯 First Actions

### Test Basic Features

- [ ] **View Dashboard**
  - [ ] Can see statistics (even if all zeros)
  - [ ] No error messages

- [ ] **Create a Test Shipment** (if Customer/Admin)
  - [ ] Click "Shipments" → "New Shipment"
  - [ ] Fill in the form
  - [ ] Submit successfully
  - [ ] Receive tracking number

- [ ] **Track a Shipment**
  - [ ] Go to "Track" page
  - [ ] Enter tracking number
  - [ ] See shipment details

- [ ] **Check API Documentation**
  - [ ] Open: http://localhost:8000/docs
  - [ ] See list of API endpoints
  - [ ] Can expand and test endpoints

---

## 🔧 Troubleshooting Checks

### If Backend Won't Start:

- [ ] Check Python version: `python --version`
- [ ] Check PostgreSQL is running
- [ ] Check port 8000 is free
- [ ] Read error message in terminal
- [ ] Check backend/.env file exists
- [ ] Verify DATABASE_URL in .env

### If Frontend Won't Start:

- [ ] Check Node.js version: `node --version`
- [ ] Check port 5173 is free
- [ ] Run `npm install` in frontend folder
- [ ] Read error message in terminal
- [ ] Clear npm cache: `npm cache clean --force`

### If Can't Login:

- [ ] Did you register first?
- [ ] Is email correct?
- [ ] Is password correct?
- [ ] Check backend is running (http://localhost:8000)
- [ ] Check browser console (F12) for errors

### If Database Errors:

- [ ] PostgreSQL service is running
- [ ] Database **courier_db** exists
- [ ] User **courier_user** exists
- [ ] Password is **courier_pass**
- [ ] User has permissions on database

---

## 📊 Success Indicators

When everything is working correctly:

### Backend Terminal Shows:
```
✅ Database tables created/verified
INFO: Application startup complete
INFO: Uvicorn running on http://0.0.0.0:8000
```

### Frontend Terminal Shows:
```
VITE ready in XXXms
➜ Local:   http://localhost:5173/
➜ Network: http://192.168.x.x:5173/
```

### Browser Shows:
- ✅ Login page loads without errors
- ✅ Can register new account
- ✅ Can login successfully
- ✅ Dashboard displays correctly
- ✅ No console errors (F12)

---

## 🎉 Final Verification

Everything is working if you can:

- [ ] ✅ Start both backend and frontend without errors
- [ ] ✅ Open http://localhost:5173 and see login page
- [ ] ✅ Register a new account
- [ ] ✅ Login successfully
- [ ] ✅ See the dashboard
- [ ] ✅ Navigate between pages (Dashboard, Shipments, Track)
- [ ] ✅ Create a test shipment
- [ ] ✅ View API docs at http://localhost:8000/docs
- [ ] ✅ No error messages in browser console
- [ ] ✅ No error messages in terminals

---

## 📚 What to Do Next

Once everything is checked:

1. **Read the Guides**
   - [ ] [README.md](README.md) - Overview
   - [ ] [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - Visual walkthrough
   - [ ] [ARCHITECTURE.md](ARCHITECTURE.md) - How it works

2. **Explore Features**
   - [ ] Create different user roles
   - [ ] Test shipment workflow
   - [ ] Try tracking system
   - [ ] Check API endpoints

3. **Customize**
   - [ ] Change database credentials in .env
   - [ ] Update SECRET_KEY in .env
   - [ ] Modify frontend styles (optional)

---

## 🆘 Getting Help

If something doesn't work:

1. **Check This Checklist** - Did you complete all steps?
2. **Read Error Messages** - They usually tell you what's wrong
3. **Check Documentation** - [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
4. **Browser Console** - Press F12, check Console tab
5. **Terminal Output** - Look for error messages

---

## 🎯 Quick Reference

**Start Application:**
```bash
# Windows
start-backend.bat
start-frontend.bat

# Mac/Linux
./start-backend.sh
./start-frontend.sh
```

**Stop Application:**
- Press Ctrl + C in both terminals/windows

**Important URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

**Default Database:**
- Name: courier_db
- User: courier_user
- Password: courier_pass
- Port: 5432

---

**✅ Checklist Complete!**

If all items are checked, you're ready to use CourierTrack! 🎉

If you're stuck, see [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for detailed help.
