# 🏗️ CourierTrack System Architecture

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR COMPUTER                            │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                   WEB BROWSER                          │   │
│  │              http://localhost:5173                     │   │
│  │                                                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │   │
│  │  │Dashboard │  │Shipments │  │Tracking  │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘           │   │
│  └────────────────────────────────────────────────────────┘   │
│                          ↕                                      │
│              HTTP Requests / Responses                          │
│                          ↕                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │             FRONTEND SERVER (React)                    │   │
│  │              Port: 5173 (Vite)                         │   │
│  │                                                        │   │
│  │  Technologies:                                         │   │
│  │  • React 18 + TypeScript                              │   │
│  │  • TailwindCSS (Styling)                              │   │
│  │  • Zustand (State Management)                         │   │
│  │  • React Router (Navigation)                          │   │
│  │  • Axios (HTTP Client)                                │   │
│  └────────────────────────────────────────────────────────┘   │
│                          ↕                                      │
│              REST API Calls (JSON)                              │
│                          ↕                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │             BACKEND SERVER (FastAPI)                   │   │
│  │              Port: 8000 (Uvicorn)                      │   │
│  │                                                        │   │
│  │  API Endpoints:                                        │   │
│  │  • /api/auth/* (Login, Register)                      │   │
│  │  • /api/shipments/* (CRUD Operations)                 │   │
│  │  • /api/drivers/* (Driver Management)                 │   │
│  │  • /api/dashboard/* (Statistics)                      │   │
│  │                                                        │   │
│  │  Technologies:                                         │   │
│  │  • FastAPI (Web Framework)                            │   │
│  │  • SQLAlchemy (Database ORM)                          │   │
│  │  • Pydantic (Data Validation)                         │   │
│  │  • JWT (Authentication)                               │   │
│  └────────────────────────────────────────────────────────┘   │
│                          ↕                                      │
│              SQL Queries                                        │
│                          ↕                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │           DATABASE (PostgreSQL)                        │   │
│  │              Port: 5432                                │   │
│  │                                                        │   │
│  │  Tables:                                               │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │   │
│  │  │  Users   │  │Shipments │  │ Drivers  │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘           │   │
│  │  ┌──────────┐  ┌──────────┐                         │   │
│  │  │ Events   │  │ Notifs   │                         │   │
│  │  └──────────┘  └──────────┘                         │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow Example: Creating a Shipment

```
1. User fills form in browser
   ↓
2. Frontend validates input
   ↓
3. Frontend sends POST /api/shipments
   ↓
4. Backend receives request
   ↓
5. Backend validates JWT token
   ↓
6. Backend validates shipment data
   ↓
7. Backend saves to database
   ↓
8. Database returns created record
   ↓
9. Backend sends response to frontend
   ↓
10. Frontend updates UI and shows success message
```

## 🔐 Authentication Flow

```
Registration:
Browser → POST /api/auth/register → Backend → Database
                                       ↓
                               Password Hashed
                                       ↓
                                User Created

Login:
Browser → POST /api/auth/login → Backend → Database
                                     ↓
                            Verify Password
                                     ↓
                            Generate JWT Token
                                     ↓
Browser ← Token ← Backend

All Future Requests:
Browser → Header: "Authorization: Bearer <token>" → Backend
                                                       ↓
                                                Verify Token
                                                       ↓
                                                Process Request
```

## 🗃️ Database Schema

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    Users    │     │   Drivers    │     │  Shipments  │
├─────────────┤     ├──────────────┤     ├─────────────┤
│ id (PK)     │────<│ user_id (FK) │     │ id (PK)     │
│ name        │     │ license_num  │     │ tracking_no │
│ email       │     │ vehicle_type │     │ sender_id   │
│ password    │     │ vehicle_plate│     │ driver_id   │
│ role        │     │ current_lat  │     │ status      │
│ is_active   │     │ current_lng  │     │ origin      │
└─────────────┘     │ is_available │     │ destination │
       │            └──────────────┘     │ weight      │
       │                    │            │ description │
       │                    └───────────>│             │
       └───────────────────────────────>│             │
                                         └─────────────┘
                                                │
                                                │
                                         ┌─────────────┐
                                         │   Events    │
                                         ├─────────────┤
                                         │ id (PK)     │
                                         │ shipment_id │
                                         │ event_type  │
                                         │ description │
                                         │ location    │
                                         │ occurred_at │
                                         └─────────────┘
```

## 👥 User Roles & Permissions

```
┌──────────────┬────────────┬────────────┬────────────┬────────────┐
│   Action     │   Admin    │ Dispatcher │   Driver   │  Customer  │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ View All     │     ✅     │     ✅     │     ❌     │     ❌     │
│ Shipments    │            │            │            │            │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Create       │     ✅     │     ✅     │     ❌     │     ✅     │
│ Shipment     │            │            │            │            │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Assign       │     ✅     │     ✅     │     ❌     │     ❌     │
│ Driver       │            │            │            │            │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Update       │     ✅     │     ✅     │     ✅     │     ❌     │
│ Status       │            │            │  (own only)│            │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ View         │     ✅     │     ✅     │     ✅     │     ✅     │
│ Dashboard    │            │            │  (own data)│  (own data)│
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Manage       │     ✅     │     ✅     │     ❌     │     ❌     │
│ Drivers      │            │            │            │            │
└──────────────┴────────────┴────────────┴────────────┴────────────┘
```

## 📦 Technology Stack Summary

### Frontend Stack
```
React 18.3.1          → UI Framework
TypeScript 5.4.5      → Type Safety
Vite 5.2.11           → Build Tool
TailwindCSS 3.4.4     → CSS Framework
React Router 6.23.1   → Navigation
Zustand 4.5.2         → State Management
TanStack Query 5.37.1 → Server State
Axios 1.7.2           → HTTP Client
Lucide React 0.383.0  → Icons
```

### Backend Stack
```
FastAPI 0.111.0       → Web Framework
Python 3.10+          → Language
SQLAlchemy 2.0.30     → Database ORM
PostgreSQL 14+        → Database
Pydantic 2.7.1        → Data Validation
JWT (python-jose)     → Authentication
Bcrypt                → Password Hashing
Uvicorn 0.29.0        → ASGI Server
```

## 🌐 Network Ports

```
Port 5173  →  Frontend Development Server (Vite)
Port 8000  →  Backend API Server (FastAPI/Uvicorn)
Port 5432  →  PostgreSQL Database Server
```

## 💾 Data Flow: Tracking a Shipment

```
1. Customer creates shipment
   └─> Database: Shipment record created with status "pending"
   └─> Database: Tracking event "created" logged

2. Admin/Dispatcher assigns driver
   └─> Database: Shipment.driver_id updated
   └─> Driver sees shipment in their dashboard

3. Driver picks up package
   └─> Driver updates status to "picked_up"
   └─> Database: Shipment.status = "picked_up"
   └─> Database: Tracking event "picked_up" logged

4. Driver moves to destination
   └─> Driver updates location (lat/lng)
   └─> Database: Driver.current_lat/lng updated
   └─> Status changes to "in_transit", "at_hub", "out_for_delivery"

5. Driver delivers package
   └─> Driver updates status to "delivered"
   └─> Database: Shipment.status = "delivered"
   └─> Database: Shipment.delivered_at = current timestamp
   └─> Database: Tracking event "delivered" logged

6. Anyone can track using tracking number
   └─> Public endpoint: GET /api/shipments/track/{tracking_number}
   └─> Returns shipment details + all tracking events
```

This architecture ensures:
✅ Separation of concerns
✅ Scalability
✅ Security through authentication
✅ Real-time tracking capabilities
✅ Role-based access control
