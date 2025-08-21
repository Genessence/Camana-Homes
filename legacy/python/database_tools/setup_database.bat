@echo off
echo ========================================
echo    Camana Homes Database Setup
echo ========================================
echo.

echo [1/4] Checking current database state...
python check_database.py
echo.

echo [2/4] Clearing demo data...
python clear_demo_data.py
echo.

echo [3/4] Updating trending scores...
python update_trending_scores.py
echo.

echo [4/4] Updating property prices...
python simple_price_update.py
echo.

echo ========================================
echo    Database Setup Complete!
echo ========================================
echo.
echo You can now start your backend and frontend:
echo   - Backend: cd api && uvicorn main:app --reload --host 0.0.0.0 --port 8000
echo   - Frontend: npm run dev
echo.
pause
