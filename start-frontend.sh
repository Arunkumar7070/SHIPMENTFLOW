#!/bin/bash

echo "===================================="
echo "   CourierTrack Frontend Server"
echo "===================================="
echo ""

cd frontend

echo "[1/3] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js 18 or higher from https://nodejs.org/"
    exit 1
fi
node --version

echo ""
echo "[2/3] Checking npm installation..."
npm --version

echo ""
echo "[3/3] Installing dependencies..."
echo "This may take a few minutes on first run..."
npm install

echo ""
echo "===================================="
echo "   Starting Frontend Server"
echo "===================================="
echo ""
echo "Server will run at: http://localhost:5173"
echo ""
echo "IMPORTANT: Make sure the backend is running first!"
echo ""
echo "Press CTRL+C to stop the server"
echo ""

npm run dev
