@echo off
echo ====================================
echo   CourierTrack Backend Server
echo ====================================
echo.

cd backend

echo [1/4] Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.10 or higher from https://www.python.org/
    pause
    exit /b 1
)

echo.
echo [2/4] Checking virtual environment...
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo.
echo [3/4] Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo [4/4] Installing dependencies...
pip install -r requirements.txt --quiet

echo.
echo ====================================
echo   Starting Backend Server
echo ====================================
echo.
echo Server will run at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press CTRL+C to stop the server
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

pause
