#!/bin/bash

echo "===================================="
echo "   CourierTrack Backend Server"
echo "===================================="
echo ""

cd backend

echo "[1/4] Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.10 or higher"
    exit 1
fi
python3 --version

echo ""
echo "[2/4] Checking virtual environment..."
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo ""
echo "[3/4] Activating virtual environment..."
source venv/bin/activate

echo ""
echo "[4/4] Installing dependencies..."
pip install -r requirements.txt --quiet

echo ""
echo "===================================="
echo "   Starting Backend Server"
echo "===================================="
echo ""
echo "Server will run at: http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo ""
echo "Press CTRL+C to stop the server"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
