# CourierTrack Backend

FastAPI-based REST API for the CourierTrack courier management system.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
python -m app.db.database  # Creates tables automatically

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
API Documentation (Swagger): `http://localhost:8000/docs`

## 📁 Project Structure

```
app/
├── api/
│   └── routes/       # API endpoints
│       ├── auth.py       # Authentication
│       ├── shipments.py  # Shipment management
│       ├── drivers.py    # Driver management
│       └── dashboard.py  # Dashboard stats
├── core/             # Core functionality
│   ├── config.py     # Configuration
│   ├── security.py   # Auth & JWT
│   └── utils.py      # Utilities
├── db/               # Database
│   └── database.py   # SQLAlchemy setup
├── models/           # Database models
│   └── user.py       # User, Driver, Shipment, etc.
├── schemas/          # Pydantic schemas
│   └── schemas.py    # Request/Response models
└── main.py           # FastAPI app entry point
```

## 🗄️ Database Setup

### PostgreSQL

```bash
# Create database and user
psql -U postgres
CREATE DATABASE courier_db;
CREATE USER courier_user WITH PASSWORD 'courier_pass';
GRANT ALL PRIVILEGES ON DATABASE courier_db TO courier_user;
```

### Environment Variables

Edit `.env`:
```env
DATABASE_URL=postgresql://courier_user:courier_pass@localhost:5432/courier_db
SECRET_KEY=your-secret-key-change-in-production
```

## 🔑 API Authentication

Uses JWT Bearer tokens:

1. **Register**: POST `/api/auth/register`
2. **Login**: POST `/api/auth/login` → Returns `access_token`
3. **Use Token**: Add header `Authorization: Bearer <token>`

## 👥 User Roles

- **admin**: Full system access
- **dispatcher**: Manage shipments and assign drivers
- **driver**: View assigned shipments, update status
- **customer**: Create shipments, track own shipments

## 📡 Main API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Shipments
- `POST /api/shipments` - Create shipment
- `GET /api/shipments` - List shipments
- `GET /api/shipments/{id}` - Get shipment details
- `GET /api/shipments/track/{tracking_number}` - Track shipment
- `PATCH /api/shipments/{id}/status` - Update status
- `POST /api/shipments/{id}/assign` - Assign driver
- `POST /api/shipments/{id}/events` - Add tracking event

### Drivers
- `POST /api/drivers/profile` - Create driver profile
- `GET /api/drivers` - List drivers
- `GET /api/drivers/me` - Get my driver profile
- `PATCH /api/drivers/me/location` - Update location
- `PATCH /api/drivers/me/availability` - Toggle availability

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/users` - List all users (admin only)

## 🛠️ Technologies

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Uvicorn** - ASGI server

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- CORS configuration
- Input validation with Pydantic

## 📊 Database Models

- **User** - System users (customers, drivers, admins, dispatchers)
- **Driver** - Driver profiles with vehicle info
- **Shipment** - Courier shipments
- **TrackingEvent** - Shipment tracking history
- **Notification** - User notifications

## 🧪 Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database and user exist

### Import Errors
- Activate virtual environment
- Reinstall requirements: `pip install -r requirements.txt`

### Port Already in Use
- Change port: `uvicorn app.main:app --port 8001`
