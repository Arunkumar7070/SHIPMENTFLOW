# 🚚 CourierTrack - Complete Courier Management System

A full-stack web application for managing courier and delivery operations with real-time tracking, driver management, and role-based access control.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.10+-blue)
![Node](https://img.shields.io/badge/node-18+-green)

---

## 🚀 Getting Started in 60 Seconds

```bash
# 1. Extract the ZIP file
# 2. Open terminal in the project folder

# Windows:
start-backend.bat    # Window 1
start-frontend.bat   # Window 2

# Mac/Linux:
./start-backend.sh   # Terminal 1
./start-frontend.sh  # Terminal 2

# 3. Open browser: http://localhost:5173
# 4. Register and start using!
```

---

## 📖 Complete Documentation

- **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** - ⭐ **START HERE** - Detailed setup instructions
- **[QUICK_START.md](QUICK_START.md)** - Quick reference card
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and diagrams

---

## ✨ Features

✅ Secure JWT authentication with role-based access
✅ Real-time shipment tracking with tracking numbers  
✅ Driver location and availability management
✅ Automated tracking event logging
✅ Dashboard with live statistics
✅ Mobile-responsive design
✅ Complete REST API with documentation

---

## 🛠️ Technology Stack

**Frontend:** React 18 • TypeScript • TailwindCSS • Vite
**Backend:** FastAPI • Python 3.10+ • PostgreSQL • SQLAlchemy
**Auth:** JWT • Bcrypt

---

## 🌐 Important URLs

| Service | URL |
|---------|-----|
| 🌐 Web Application | http://localhost:5173 |
| 🔌 Backend API | http://localhost:8000 |
| 📖 API Documentation | http://localhost:8000/docs |

---

## 🔑 User Roles

| Role | Access |
|------|--------|
| **Admin** | Full system access and user management |
| **Dispatcher** | Create shipments, assign drivers |
| **Driver** | View assigned deliveries, update status |
| **Customer** | Create and track own shipments |

---

## 📦 What's Included

```
project/
├── backend/           Python FastAPI backend with PostgreSQL
├── frontend/          React TypeScript frontend with Vite
├── *.bat             Windows startup scripts
├── *.sh              Mac/Linux startup scripts
└── *.md              Documentation files
```

---

## 🎯 Key Features

### 🔐 **Authentication & Security**
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Secure API endpoints

### 📦 **Shipment Management**
- Create and track shipments
- Automatic tracking number generation
- Real-time status updates
- Detailed shipment information

### 🚚 **Driver Operations**
- Driver profile management
- Location tracking
- Availability status
- Assigned deliveries view

### 📍 **Tracking System**
- Public tracking via tracking number
- Detailed event history
- Location-based updates
- Timestamp logging

### 📊 **Dashboard**
- Real-time statistics
- Active shipments overview
- Driver availability
- Today's deliveries count

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Install Python 3.10+, ensure PostgreSQL is running |
| Frontend won't start | Install Node.js 18+, run `npm install` |
| Can't login | Register an account first |
| Database error | Check PostgreSQL is running on port 5432 |

**See [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for detailed troubleshooting**

---

## 📋 Prerequisites

1. **Python 3.10+** - https://python.org/downloads
2. **Node.js 18+** - https://nodejs.org
3. **PostgreSQL 14+** - https://postgresql.org/download

---

## 🎉 Quick Demo

1. **Start the application** using the startup scripts
2. **Open** http://localhost:5173
3. **Click "Register"** to create your first account
4. **Choose role:** Admin (full access) or Customer (create shipments)
5. **Login** with your credentials
6. **Explore** the dashboard and features!

---

## 📞 Support

For help:
1. Check [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
2. Review Troubleshooting section
3. Check browser console (F12) for errors
4. Verify all prerequisites are installed

---

**Built with ❤️ using FastAPI and React**

⭐ **NEW USERS:** Start with [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for step-by-step setup!
