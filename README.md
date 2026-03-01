# 🚚 CourierTrack - Local Courier Tracking System

A modern full-stack web application designed for streamlined courier tracking and package delivery management.

## Project Overview
CourierTrack is built to manage courier and delivery operations with real-time tracking, driver assignment, and role-based access control.

### Core Modules
- **Authentication & Security:** JWT-based role management (Admin, Dispatcher, Driver, Customer)
- **Shipment Management:** Origin, destination, parcel attributes, and live tracking numbers
- **Driver Operations:** Location tracking and delivery route handling
- **Real-time Tracking:** Public status lookup and milestone event logging
- **Management Dashboard:** Operations analytics and status breakdowns

## Architecture
- **Backend:** FastAPI (Python 3.10+) with SQLAlchemy ORM and PostgreSQL
- **Frontend:** React 18, TypeScript, TailwindCSS, Vite
- **Deployment:** Docker & Docker Compose
