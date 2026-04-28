# 🚀 CourierTrack — Complete Setup Guide
## Design and Implementation of a Courier Tracking System using Database Technologies

---

## What This System Does

**CourierTrack** is a full-stack courier tracking system with:
- **PostgreSQL** database storing users, shipments, drivers, tracking events
- **FastAPI** backend with JWT authentication and role-based access
- **React + TypeScript** frontend with a dark, professional UI
- **Real-time shipment tracking** by tracking number

**Roles:** Admin · Dispatcher · Driver · Customer

---

## ✅ What You Need to Install (Step by Step)

### OPTION A — Docker (Easiest, ~10 mins)

#### Step 1: Install Docker Desktop
Download from: https://www.docker.com/products/docker-desktop/
- Windows/Mac: Run the installer, follow prompts
- After install: Open Docker Desktop, wait for it to say "Running"

#### Step 2: Verify Docker is working
Open a terminal (Command Prompt / PowerShell / Terminal) and run:
```bash
docker --version
docker compose version
```
You should see version numbers. If not, restart Docker Desktop.

#### Step 3: Navigate to project folder
```bash
cd path/to/courier-system
# Example: cd C:\Users\YourName\Desktop\courier-system
```

#### Step 4: Copy environment file
```bash
cp backend/.env.example backend/.env
```
On Windows:
```cmd
copy backend\.env.example backend\.env
```

#### Step 5: Start everything
```bash
docker compose up --build
```
Wait 2-3 minutes for first build. You'll see logs from postgres, backend, frontend.

#### Step 6: Open the app
- **Frontend (main app):** http://localhost:5173
- **Backend API docs:** http://localhost:8000/docs
- **Database:** PostgreSQL running at localhost:5432

---

### OPTION B — Manual Setup (Without Docker)

#### Prerequisites to install:
1. **Python 3.11+** — https://python.org/downloads
2. **Node.js 18+** — https://nodejs.org
3. **PostgreSQL 16** — https://postgresql.org/download

#### Step 1: Set up PostgreSQL database
After installing PostgreSQL, open pgAdmin or psql and run:
```sql
CREATE USER courier_user WITH PASSWORD 'courier_pass';
CREATE DATABASE courier_db OWNER courier_user;
GRANT ALL PRIVILEGES ON DATABASE courier_db TO courier_user;
```

#### Step 2: Set up the Backend
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it:
source venv/bin/activate          # Mac/Linux
venv\Scripts\activate             # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```
DATABASE_URL=postgresql://courier_user:courier_pass@localhost:5432/courier_db
REDIS_URL=redis://localhost:6379
SECRET_KEY=mysupersecretkey12345678901234567890
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Start the backend:
```bash
uvicorn app.main:app --reload --port 8000
```
✅ Backend running at http://localhost:8000

#### Step 3: Set up the Frontend
Open a NEW terminal:
```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
```
✅ Frontend running at http://localhost:5173

---

## 🗄️ Database Schema

The database auto-creates these tables on first run:

| Table | Purpose |
|-------|---------|
| `users` | All user accounts (admin, dispatcher, driver, customer) |
| `drivers` | Driver profiles with vehicle info and GPS location |
| `shipments` | Shipment records with addresses, status, tracking number |
| `tracking_events` | Timeline of each shipment's movement |
| `notifications` | Email/SMS/push notification records |

**Tracking Number Format:** `CT-YYYYMMDD-XXXXXX` (e.g., `CT-20250405-A3F9K2`)

---

## 👤 Create Your First Admin User

Once the app is running, go to http://localhost:5173/register

To register as Admin, use the API directly at http://localhost:8000/docs:
1. Click `POST /api/auth/register`
2. Click "Try it out"
3. Enter:
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "password123",
  "role": "admin"
}
```

---

## 🔄 Shipment Status Flow

```
pending → picked_up → in_transit → at_hub → out_for_delivery → delivered
                                                              ↘ failed → returned
```

---

## 🛠 Troubleshooting

| Problem | Solution |
|---------|----------|
| `docker: command not found` | Install Docker Desktop and restart terminal |
| `Port 5432 already in use` | Stop local PostgreSQL: `sudo service postgresql stop` |
| `Port 8000 in use` | Kill process: `lsof -ti:8000 \| xargs kill` |
| Backend shows DB error | Check `.env` has correct DATABASE_URL |
| Frontend shows CORS error | Make sure backend is running on port 8000 |
| `npm install` fails | Update Node.js to version 18+ |

---

## 📁 Project Structure

```
courier-system/
├── backend/                    ← Python FastAPI
│   ├── app/
│   │   ├── api/routes/         ← auth.py, shipments.py, drivers.py, dashboard.py
│   │   ├── core/               ← security.py (JWT), config.py
│   │   ├── db/database.py      ← SQLAlchemy connection
│   │   ├── models/user.py      ← ALL database models (User, Shipment, Driver...)
│   │   ├── schemas/schemas.py  ← Pydantic validation schemas
│   │   └── main.py             ← FastAPI app entry point
│   ├── .env                    ← Your environment variables (DO NOT COMMIT)
│   └── requirements.txt        ← Python packages
│
├── frontend/                   ← React + TypeScript
│   ├── src/
│   │   ├── pages/              ← LoginPage, DashboardPage, ShipmentsPage...
│   │   ├── components/         ← Navbar, Layout, UI components
│   │   ├── store/authStore.ts  ← Zustand state (user session)
│   │   ├── lib/api.ts          ← Axios HTTP client
│   │   └── App.tsx             ← Router + protected routes
│   └── package.json
│
├── docker-compose.yml          ← Runs postgres + redis + backend + frontend
└── SETUP_GUIDE.md              ← This file
```

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login → returns JWT token | No |
| GET | `/api/shipments` | List shipments (role-filtered) | Yes |
| POST | `/api/shipments` | Create new shipment | Yes |
| GET | `/api/shipments/track/{id}` | **Public tracking — no login!** | No |
| PATCH | `/api/shipments/{id}/status` | Update shipment status | Staff only |
| GET | `/api/drivers` | List all drivers | Admin/Dispatcher |
| GET | `/api/dashboard/stats` | Summary statistics | Admin/Dispatcher |

Full interactive API docs: **http://localhost:8000/docs**

---

*Project: Design and Implementation of a Courier Tracking System using Database Technologies*
