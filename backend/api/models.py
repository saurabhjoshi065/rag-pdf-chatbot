from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class DocumentUploadRequest(BaseModel):
    """Request model for document upload"""
    filename: str
    content: str  # Base64 encoded content or file path

class DocumentUploadResponse(BaseModel):
    """Response model for document upload"""
    document_id: str
    filename: str
    status: str
    message: str

class DocumentInfo(BaseModel):
    """Model for document information"""
    id: str
    filename: str
    upload_date: datetime
    size: int

class DocumentListResponse(BaseModel):
    """Response model for document list"""
    documents: List[DocumentInfo]
    total_count: int

class ChatMessage(BaseModel):
    """Model for chat messages"""
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime

class ChatRequest(BaseModel):
    """Request model for chat queries"""
    query: str
    document_ids: Optional[List[str]] = None  # If None, search all documents

class ChatResponse(BaseModel):
    """Response model for chat queries"""
    answer: str
    sources: List[dict]  # Source documents/chunks used
    response_time: float  # Time taken to generate response
    chat_history: List[ChatMessage]

class HealthCheckResponse(BaseModel):
    """Response model for health check"""
    status: str
    service: str
    timestamp: datetime = None