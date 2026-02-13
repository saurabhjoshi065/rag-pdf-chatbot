@echo off
echo Starting RAG Chatbot Application...

echo Starting backend server...
start "Backend" cmd /k "cd backend && uvicorn main:app --reload"

echo Starting frontend development server...
timeout /t 5 /nobreak >nul
start "Frontend" cmd /k "cd frontend && npm start"

echo Application started!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to close this window...
pause >nul