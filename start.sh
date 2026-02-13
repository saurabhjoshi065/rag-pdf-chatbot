#!/bin/bash

# Start RAG Chatbot Application

echo "Starting RAG Chatbot Application..."

# Create a new terminal for backend
echo "Starting backend server..."
cd backend
uvicorn main:app --reload &
BACKEND_PID=$!
cd ..

# Create a new terminal for frontend
echo "Starting frontend development server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "Application started!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "API Docs: http://localhost:8000/docs"

# Cleanup function
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "Servers stopped."
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID