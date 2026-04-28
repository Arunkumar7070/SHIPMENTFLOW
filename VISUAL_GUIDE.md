# 📸 Visual Step-by-Step Guide

## 🎯 How to Start CourierTrack

### Step 1: Extract the ZIP File

```
Right-click the couriertrack.zip → Extract All
```

You should now have a folder called `couriertrack-fixed` with a `project` folder inside.

---

### Step 2: Open the Project Folder

Navigate to:
```
couriertrack-fixed/project/
```

You should see these files:
- ✅ start-backend.bat (Windows) or start-backend.sh (Mac/Linux)
- ✅ start-frontend.bat (Windows) or start-frontend.sh (Mac/Linux)  
- ✅ backend/ folder
- ✅ frontend/ folder
- ✅ README.md and other documentation files

---

### Step 3: Start the Backend Server

#### **Windows:**
1. Double-click `start-backend.bat`
2. A black Command Prompt window will open
3. Wait for this message:
   ```
   ====================================
      Starting Backend Server
   ====================================
   
   INFO:     Application startup complete.
   INFO:     Uvicorn running on http://0.0.0.0:8000
   ```
4. ✅ **KEEP THIS WINDOW OPEN!**

#### **Mac/Linux:**
1. Open Terminal
2. Navigate to the project folder
3. Run: `./start-backend.sh`
4. Wait for: "Application startup complete"
5. ✅ **KEEP THIS TERMINAL OPEN!**

---

### Step 4: Start the Frontend Server

#### **Windows:**
1. Double-click `start-frontend.bat` (in a NEW window)
2. Wait for:
   ```
   ====================================
      Starting Frontend Server
   ====================================
   
   VITE ready in 500ms
   ➜  Local:   http://localhost:5173/
   ```
3. ✅ **KEEP THIS WINDOW OPEN TOO!**

#### **Mac/Linux:**
1. Open a NEW Terminal window
2. Navigate to the project folder
3. Run: `./start-frontend.sh`
4. Wait for: "Local: http://localhost:5173/"
5. ✅ **KEEP THIS TERMINAL OPEN TOO!**

---

### Step 5: Open the Application

1. Open your web browser (Chrome, Firefox, Edge, Safari)
2. Type in the address bar:
   ```
   http://localhost:5173
   ```
3. Press Enter

You should see the **CourierTrack Login Page**!

---

## 🎨 What You'll See

### Login Page (First Screen)

```
┌────────────────────────────────────┐
│                                    │
│      🚚 CourierTrack               │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  Email                       │ │
│  │  [________________]          │ │
│  │                              │ │
│  │  Password                    │ │
│  │  [________________]          │ │
│  │                              │ │
│  │  [ Login ]                   │ │
│  │                              │ │
│  │  Don't have account?         │ │
│  │  Register →                  │ │
│  └──────────────────────────────┘ │
│                                    │
└────────────────────────────────────┘
```

---

## 📝 How to Create Your First Account

### Step 1: Click "Register"

On the login page, click the **"Register"** link.

### Step 2: Fill the Registration Form

```
┌────────────────────────────────────┐
│      Create Account                │
│                                    │
│  Name:        [John Doe______]    │
│  Email:       [john@example.com_] │
│  Phone:       [+1234567890_____]  │
│  Password:    [************]      │
│  Role:        [Customer ▼]        │
│                                    │
│  Role Options:                     │
│  • Admin     - Full system access  │
│  • Dispatcher - Manage shipments   │
│  • Driver    - Deliver packages    │
│  • Customer  - Send packages       │
│                                    │
│  [ Register ]                      │
│                                    │
│  Already have account? Login →     │
└────────────────────────────────────┘
```

### Step 3: Click "Register"

You'll be automatically redirected to the login page.

### Step 4: Login

Enter your email and password, then click **"Login"**.

---

## 🏠 Dashboard Overview

After logging in, you'll see different dashboards based on your role:

### Admin/Dispatcher Dashboard

```
┌────────────────────────────────────────────────────────┐
│  🚚 CourierTrack        Dashboard  Shipments  Drivers  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  📊 Dashboard Statistics                               │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Total    │  │ Pending  │  │ Transit  │           │
│  │ 125      │  │ 23       │  │ 45       │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Delivered │  │ Failed   │  │ Drivers  │           │
│  │ 52       │  │ 5        │  │ 12       │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                        │
│  📦 Recent Shipments                                  │
│  ┌────────────────────────────────────────────┐      │
│  │ TRK001  Pending     Mumbai → Delhi          │      │
│  │ TRK002  In Transit  Bangalore → Chennai     │      │
│  │ TRK003  Delivered   Pune → Hyderabad        │      │
│  └────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────┘
```

### Driver Dashboard

```
┌────────────────────────────────────────────────────────┐
│  🚚 CourierTrack        My Deliveries                  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🚗 Driver Status                                      │
│  Name: John Driver                                     │
│  Vehicle: Van - ABC123                                 │
│  Status: [✅ Available]  [Toggle]                     │
│                                                        │
│  📦 Assigned Deliveries (3)                           │
│  ┌────────────────────────────────────────────┐      │
│  │ TRK001  [Pick Up]                           │      │
│  │ Mumbai Central → Delhi NCR                  │      │
│  │ [Update Status ▼]                           │      │
│  ├────────────────────────────────────────────┤      │
│  │ TRK002  [In Transit]                        │      │
│  │ Bangalore → Chennai                         │      │
│  │ [Update Location] [Update Status]           │      │
│  └────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────┘
```

### Customer Dashboard

```
┌────────────────────────────────────────────────────────┐
│  🚚 CourierTrack        My Shipments                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [+ Create New Shipment]                              │
│                                                        │
│  📦 My Shipments (5)                                  │
│  ┌────────────────────────────────────────────┐      │
│  │ TRK001  Delivered  ✅                       │      │
│  │ Sent: 2024-01-15                            │      │
│  │ Delivered: 2024-01-18                       │      │
│  │ [View Details]                              │      │
│  ├────────────────────────────────────────────┤      │
│  │ TRK002  In Transit  🚚                      │      │
│  │ Sent: 2024-01-20                            │      │
│  │ Expected: 2024-01-23                        │      │
│  │ [Track] [View Details]                      │      │
│  └────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────┘
```

---

## 🔍 How to Track a Package

### Method 1: Public Tracking (No Login Required)

1. Go to http://localhost:5173/track
2. Enter tracking number (e.g., TRK001)
3. Click "Track"

### Method 2: From Dashboard (Logged In)

1. Click on a shipment
2. View detailed tracking timeline

### Tracking Page Shows:

```
┌────────────────────────────────────────────────────────┐
│  📦 Tracking: TRK001                                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Status: In Transit 🚚                                │
│  From: Mumbai → To: Delhi                             │
│  Expected: Jan 25, 2024                               │
│                                                        │
│  📍 Tracking Timeline                                  │
│  ┌────────────────────────────────────────────┐      │
│  │ ✅ Delivered                                │      │
│  │    Jan 22, 3:45 PM - Delhi NCR              │      │
│  │                                              │      │
│  │ 📦 Out for Delivery                         │      │
│  │    Jan 22, 9:00 AM - Delhi Hub              │      │
│  │                                              │      │
│  │ 🏢 At Hub                                   │      │
│  │    Jan 21, 6:30 PM - Delhi Hub              │      │
│  │                                              │      │
│  │ 🚚 In Transit                               │      │
│  │    Jan 20, 2:00 PM - On Highway             │      │
│  │                                              │      │
│  │ 📤 Picked Up                                │      │
│  │    Jan 20, 10:00 AM - Mumbai Central        │      │
│  │                                              │      │
│  │ ✨ Created                                  │      │
│  │    Jan 19, 4:30 PM                          │      │
│  └────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────┘
```

---

## 📦 How to Create a Shipment (Customer)

1. Click **"Create New Shipment"** or **"Shipments" → "New"**
2. Fill in the form:

```
┌────────────────────────────────────────────────────────┐
│  Create New Shipment                                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  📍 Origin Address                                     │
│  Street:      [123 Main St____________]               │
│  City:        [Mumbai_________________]               │
│  State:       [Maharashtra____________]               │
│  Postal Code: [400001_________________]               │
│                                                        │
│  📍 Destination Address                                │
│  Street:      [456 Park Ave___________]               │
│  City:        [Delhi__________________]               │
│  State:       [Delhi__________________]               │
│  Postal Code: [110001_________________]               │
│                                                        │
│  👤 Recipient Details                                  │
│  Name:        [Jane Smith_____________]               │
│  Phone:       [+9876543210____________]               │
│  Email:       [jane@example.com_______]               │
│                                                        │
│  📦 Package Details                                    │
│  Weight (kg): [2.5____________________]               │
│  Value (₹):   [5000___________________]               │
│  Description: [Electronics____________]               │
│  Special Ins: [Handle with care_______]               │
│                                                        │
│  [ Create Shipment ]                                  │
└────────────────────────────────────────────────────────┘
```

3. Click **"Create Shipment"**
4. You'll get a **tracking number** (e.g., TRK001)
5. Share this number with your recipient!

---

## 🚚 How to Use as a Driver

### 1. View Your Assigned Deliveries

```
My Deliveries → Shows all packages assigned to you
```

### 2. Update Shipment Status

```
Click on a shipment → Update Status dropdown
Options:
- Picked Up
- In Transit
- At Hub
- Out for Delivery
- Delivered
- Failed
```

### 3. Update Your Location

```
Click "Update Location" → Browser will ask for location permission
→ Your current GPS coordinates are saved
```

### 4. Toggle Availability

```
Available: You can receive new shipments
Unavailable: You won't get new assignments
```

---

## 🛑 How to Stop the Application

### Windows:
1. Click on the Command Prompt windows
2. Press **Ctrl + C**
3. Type **Y** and press Enter
4. Close both windows

### Mac/Linux:
1. Click on the Terminal windows
2. Press **Ctrl + C**
3. Close both terminals

---

## 🔄 How to Restart

Just run the startup scripts again:
- `start-backend.bat` / `start-backend.sh`
- `start-frontend.bat` / `start-frontend.sh`

Your data is saved in the PostgreSQL database, so everything will be there!

---

## ✅ Success Checklist

After setup, you should be able to:

- ✅ Open http://localhost:5173 and see the login page
- ✅ Register a new account
- ✅ Login successfully
- ✅ See the dashboard
- ✅ Create a new shipment (as Customer)
- ✅ Track a shipment using tracking number
- ✅ View API docs at http://localhost:8000/docs

If all checks pass, you're good to go! 🎉

---

## 🎯 Next Steps

1. **Explore the Dashboard** - See real-time statistics
2. **Create Test Shipments** - Try the full workflow
3. **Register Different Roles** - See what each role can do
4. **Check API Documentation** - http://localhost:8000/docs
5. **Read Architecture Guide** - Understand how it works

---

**Need Help?** Check [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for detailed troubleshooting!
