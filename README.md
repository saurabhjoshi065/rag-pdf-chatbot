# RAG PDF Chatbot

A Retrieval-Augmented Generation (RAG) chatbot that allows users to upload PDFs and ask questions about their content. This application works completely offline using local LLMs and vector databases.

## Features

- **Offline Capabilities**: Uses ObjectBox (lightweight vector database) to store document embeddings locally
- **Local LLM Processing**: Uses Ollama for running language models locally instead of external APIs
- **PDF Question Answering**: Upload PDF documents and ask questions about their content
- **Modern Architecture**: Built with FastAPI backend and React/MUI frontend

## Tech Stack

- **Frontend**: React + Material-UI
- **Backend**: FastAPI (Python ASGI framework)
- **LLM**: Ollama (using qwen3-coder or similar models)
- **Embeddings**: HuggingFace BGE-small
- **Vector DB**: ObjectBox (embedded, lightweight)
- **Document loading**: PyPDF

## Setup

1. Install dependencies for backend:
   ```
   pip install -r backend/requirements.txt
   ```

2. Install dependencies for frontend:
   ```
   cd frontend
   npm install
   ```

3. Start the backend server:
   ```
   cd backend
   uvicorn main:app --reload
   ```

4. Start the frontend:
   ```
   cd frontend
   npm start
   ```

## Usage

1. Upload PDF documents through the web interface
2. Ask questions about the content of your documents
3. Get AI-powered answers grounded in your document content