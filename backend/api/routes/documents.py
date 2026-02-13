from fastapi import APIRouter, UploadFile, File, HTTPException, status, Request
from fastapi.responses import JSONResponse
from typing import List
import os
import uuid
from datetime import datetime

from api.models import DocumentUploadResponse, DocumentListResponse, DocumentInfo
from config import settings

router = APIRouter()

# Ensure documents directory exists
os.makedirs(settings.DOCUMENTS_PATH, exist_ok=True)

@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(request: Request, file: UploadFile = File(...)):
    """Upload a PDF document"""
    try:
        # Check if file is PDF
        if not file.filename.endswith('.pdf'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only PDF files are allowed"
            )

        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(settings.DOCUMENTS_PATH, unique_filename)

        # Save file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        # Process document through RAG pipeline
        rag_pipeline = request.app.state.rag_pipeline
        processing_result = rag_pipeline.process_document(file_path)

        return DocumentUploadResponse(
            document_id=str(uuid.uuid4()),
            filename=file.filename,
            status="success",
            message=f"Document {file.filename} uploaded and processed successfully"
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload document: {str(e)}"
        )

@router.get("/list", response_model=DocumentListResponse)
async def list_documents():
    """List all uploaded documents"""
    try:
        documents = []
        for filename in os.listdir(settings.DOCUMENTS_PATH):
            if filename.endswith('.pdf'):
                file_path = os.path.join(settings.DOCUMENTS_PATH, filename)
                stat = os.stat(file_path)

                documents.append(DocumentInfo(
                    id=str(uuid.uuid4()),
                    filename=filename,
                    upload_date=datetime.fromtimestamp(stat.st_mtime),
                    size=stat.st_size
                ))

        return DocumentListResponse(
            documents=documents,
            total_count=len(documents)
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to list documents: {str(e)}"
        )

@router.delete("/{document_id}")
async def delete_document(document_id: str):
    """Delete a document by ID"""
    # This is a placeholder - in a real implementation, you'd map document_id to actual files
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": f"Document {document_id} deleted successfully"}
    )