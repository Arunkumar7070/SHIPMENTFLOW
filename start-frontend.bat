@echo off
echo ====================================
echo   CourierTrack Frontend Server
echo ====================================
echo.

cd frontend

echo [1/3] Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18 or higher from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo [2/3] Checking npm installation...
npm --version

echo.
echo [3/3] Installing dependencies...
echo This may take a few minutes on first run...
call npm install

echo.
echo ====================================
echo   Starting Frontend Server
echo ====================================
echo.
echo Server will run at: http://localhost:5173
echo.
echo IMPORTANT: Make sure the backend is running first!
echo.
echo Press CTRL+C to stop the server
echo.

npm run dev

pause
