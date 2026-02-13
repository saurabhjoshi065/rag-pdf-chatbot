from fastapi import APIRouter, HTTPException, status, Request
from typing import List
import time
import os

from api.models import ChatRequest, ChatResponse, ChatMessage
from config import settings

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_query(request: Request, request_data: ChatRequest):
    """Process a chat query using RAG"""
    start_time = time.time()

    try:
        # Get the shared RAG pipeline instance
        rag_pipeline = request.app.state.rag_pipeline

        # Get list of available documents
        document_paths = []
        if os.path.exists(settings.DOCUMENTS_PATH):
            for filename in os.listdir(settings.DOCUMENTS_PATH):
                if filename.endswith('.pdf'):
                    document_paths.append(os.path.join(settings.DOCUMENTS_PATH, filename))

        # If specific document IDs were requested, filter them
        if request_data.document_ids:
            # In a full implementation, you would map document_ids to actual files
            # For now, we'll just use all documents
            pass

        # Query documents using RAG pipeline
        result = rag_pipeline.query_documents(request_data.query, document_paths)

        if result["status"] == "error":
            raise Exception(result["error"])

        # Create response
        answer = result["answer"]

        # Create sources (placeholder for now)
        sources = [
            {
                "document": "uploaded_document.pdf",
                "page": 1,
                "content": "Relevant content from your document"
            }
        ]

        response_time = time.time() - start_time

        # Create chat history
        chat_history = [
            ChatMessage(
                role="user",
                content=request_data.query,
                timestamp=start_time
            ),
            ChatMessage(
                role="assistant",
                content=answer,
                timestamp=time.time()
            )
        ]

        return ChatResponse(
            answer=answer,
            sources=sources,
            response_time=response_time,
            chat_history=chat_history
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process chat query: {str(e)}"
        )

@router.get("/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    # Placeholder implementation
    return {
        "session_id": session_id,
        "history": [],
        "message": "Chat history retrieval not yet implemented"
    }