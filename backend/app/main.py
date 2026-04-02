from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.db.database import engine, Base
from app.api.routes import auth, shipments, drivers, dashboard

# Import all models so they register with Base
import app.models.user  # noqa


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created/verified")
    yield
    print("👋 Shutting down")


app = FastAPI(
    title="CourierTrack API",
    description="Local courier tracking system API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://frontend:5173",  # Docker container name
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(shipments.router)
app.include_router(drivers.router)
app.include_router(dashboard.router)


@app.get("/health")
def health():
    return {"status": "ok", "service": "CourierTrack API"}


@app.get("/")
def root():
    return {"message": "CourierTrack API v1.0 — visit /docs for Swagger UI"}
