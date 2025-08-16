Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Camana Homes Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Checking current database state..." -ForegroundColor Yellow
python check_database.py
Write-Host ""

Write-Host "[2/4] Clearing demo data..." -ForegroundColor Yellow
python clear_demo_data.py
Write-Host ""

Write-Host "[3/4] Updating trending scores..." -ForegroundColor Yellow
python update_trending_scores.py
Write-Host ""

Write-Host "[4/4] Updating property prices..." -ForegroundColor Yellow
python simple_price_update.py
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "    Database Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now start your backend and frontend:" -ForegroundColor White
Write-Host "  - Backend: cd api && uvicorn main:app --reload --host 0.0.0.0 --port 8000" -ForegroundColor Gray
Write-Host "  - Frontend: npm run dev" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to continue"
