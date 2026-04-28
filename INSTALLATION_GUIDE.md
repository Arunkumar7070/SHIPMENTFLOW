# 🚀 CourierTrack - Complete Installation Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start (Easiest Method)](#quick-start)
3. [Manual Installation](#manual-installation)
4. [First Time Setup](#first-time-setup)
5. [Login Credentials](#login-credentials)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before starting, you need to install these programs on your computer:

### 1. Python (for Backend)
- **Download**: https://www.python.org/downloads/
- **Version Required**: Python 3.10 or higher
- **Installation Tips**:
  - ✅ On Windows: Check "Add Python to PATH" during installation
  - ✅ Verify: Open Command Prompt/Terminal and type: `python --version`

### 2. Node.js (for Frontend)
- **Download**: https://nodejs.org/
- **Version Required**: Node.js 18 or higher
- **Installation Tips**:
  - ✅ Download the "LTS" (Long Term Support) version
  - ✅ Verify: Open Command Prompt/Terminal and type: `node --version`

### 3. PostgreSQL (Database)
- **Download**: https://www.postgresql.org/download/
- **Version Required**: PostgreSQL 14 or higher
- **Installation Tips**:
  - ✅ Remember the password you set during installation
  - ✅ Default port is 5432 (don't change it)

---

## 🎯 Quick Start (Easiest Method)

### For Windows Users:

1. **Extract the ZIP file** to a folder (e.g., `C:\CourierTrack`)

2. **Open Command Prompt** in the extracted folder
   - Right-click in the folder → "Open in Terminal" or "Open Command Prompt here"

3. **Start Backend Server** (Run this first!)
   ```cmd
   start-backend.bat
   ```
   - Wait until you see: "Application startup complete"
   - Keep this window open!

4. **Start Frontend Server** (In a NEW Command Prompt window)
   ```cmd
   start-frontend.bat
   ```
   - Wait until you see: "Local: http://localhost:5173"
   - Keep this window open!

5. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```

### For Mac/Linux Users:

1. **Extract the ZIP file** to a folder (e.g., `~/CourierTrack`)

2. **Open Terminal** in the extracted folder

3. **Start Backend Server** (Run this first!)
   ```bash
   ./start-backend.sh
   ```
   - Wait until you see: "Application startup complete"
   - Keep this terminal open!

4. **Start Frontend Server** (In a NEW terminal window)
   ```bash
   ./start-frontend.sh
   ```
   - Wait until you see: "Local: http://localhost:5173"
   - Keep this terminal open!

5. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```

---

## 🔧 Manual Installation

If the automated scripts don't work, follow these manual steps:

### Step 1: Setup Database

1. Open **pgAdmin** (PostgreSQL's admin tool)

2. Create a new database:
   - Right-click "Databases" → "Create" → "Database"
   - Name: `courier_db`
   - Click "Save"

3. Create a user:
   - Right-click "Login/Group Roles" → "Create" → "Login/Group Role"
   - Name: `courier_user`
   - Go to "Definition" tab → Password: `courier_pass`
   - Go to "Privileges" tab → Enable "Can login?"
   - Click "Save"

4. Grant permissions:
   - Right-click `courier_db` → "Properties"
   - Go to "Security" tab
   - Add `courier_user` with all privileges

### Step 2: Setup Backend

1. **Open Command Prompt/Terminal** in the `backend` folder

2. **Create virtual environment**:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Verify it's running**:
   - Open browser: http://localhost:8000/docs
   - You should see the API documentation (Swagger UI)

### Step 3: Setup Frontend

1. **Open NEW Command Prompt/Terminal** in the `frontend` folder

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *(This may take 2-5 minutes on first run)*

3. **Start the frontend server**:
   ```bash
   npm run dev
   ```

4. **Verify it's running**:
   - Open browser: http://localhost:5173
   - You should see the login page

---

## 🎬 First Time Setup

### 1. Create Your First Admin Account

When you first open the app at http://localhost:5173:

1. Click **"Register"** (top right)
2. Fill in the form:
   - **Name**: Your name
   - **Email**: your@email.com
   - **Phone**: Your phone number
   - **Password**: Choose a strong password
   - **Role**: Select "Admin"
3. Click **"Register"**
4. You'll be redirected to the login page

### 2. Login

1. Enter your email and password
2. Click **"Login"**
3. You'll see the dashboard!

---

## 🔑 Login Credentials

### Pre-configured Test Accounts

If you want to test different roles, you can create these accounts:

**Admin Account:**
- Email: `admin@courier.local`
- Password: `admin123`
- Access: Full system control

**Dispatcher Account:**
- Email: `dispatcher@courier.local`
- Password: `dispatcher123`
- Access: Manage shipments and assign drivers

**Driver Account:**
- Email: `driver@courier.local`
- Password: `driver123`
- Access: View assigned shipments, update delivery status

**Customer Account:**
- Email: `customer@courier.local`
- Password: `customer123`
- Access: Create and track own shipments

---

## 🎯 How to Use the System

### For Admins/Dispatchers:

1. **Dashboard**: Overview of all shipments and statistics
2. **Shipments**: View and manage all deliveries
3. **Create Shipment**: Add new delivery orders
4. **Drivers**: Manage driver profiles and availability
5. **Assign Drivers**: Assign shipments to available drivers

### For Drivers:

1. **My Deliveries**: See all assigned shipments
2. **Update Status**: Mark shipments as picked up, in transit, delivered
3. **Location**: Update your current location (for tracking)
4. **Toggle Availability**: Mark yourself as available/unavailable

### For Customers:

1. **Create Shipment**: Book a new delivery
2. **My Shipments**: View all your shipments
3. **Track**: Enter tracking number to see delivery status

---

## 🛠️ Troubleshooting

### Problem: "Python is not recognized"
**Solution**: 
- Reinstall Python from python.org
- ✅ Check "Add Python to PATH" during installation
- Restart Command Prompt

### Problem: "Node is not recognized"
**Solution**:
- Reinstall Node.js from nodejs.org
- Restart Command Prompt

### Problem: Backend won't start - Database error
**Solution**:
1. Make sure PostgreSQL is running
2. Check the database name and credentials in `backend/.env`
3. Default settings:
   ```
   DATABASE_URL=postgresql://courier_user:courier_pass@localhost:5432/courier_db
   ```

### Problem: Frontend won't start - Port 5173 in use
**Solution**:
- Close other applications using port 5173
- Or edit `frontend/vite.config.ts` to use a different port

### Problem: "Module not found" errors
**Solution**:

Backend:
```bash
cd backend
pip install -r requirements.txt
```

Frontend:
```bash
cd frontend
npm install
```

### Problem: Can't connect to backend
**Solution**:
1. Make sure backend is running (should see it in terminal)
2. Check http://localhost:8000/docs - if this works, backend is fine
3. Make sure frontend is proxying correctly (check `vite.config.ts`)

### Problem: Login doesn't work
**Solution**:
1. Make sure you registered first
2. Check the email and password are correct
3. Check browser console for errors (Press F12)
4. Make sure backend is running

---

## 📱 Accessing the Application

### URLs:
- **Frontend (Web App)**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

### Ports Used:
- Backend: 8000
- Frontend: 5173
- Database: 5432 (PostgreSQL)

---

## 🎨 Features Overview

✅ User authentication and authorization
✅ Role-based access control (Admin, Dispatcher, Driver, Customer)
✅ Create and manage shipments
✅ Real-time tracking with tracking numbers
✅ Driver assignment and management
✅ Location tracking for drivers
✅ Status updates throughout delivery lifecycle
✅ Dashboard with statistics
✅ Responsive design (works on mobile)
✅ RESTful API with documentation

---

## 📞 Support

If you encounter any issues:

1. Check the Troubleshooting section above
2. Look at the terminal/command prompt for error messages
3. Check browser console (Press F12) for frontend errors
4. Verify all prerequisites are installed correctly

---

## 🎉 You're All Set!

You should now have CourierTrack running on your computer. Enjoy! 🚚📦
