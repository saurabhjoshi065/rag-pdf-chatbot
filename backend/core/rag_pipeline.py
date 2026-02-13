from typing import List, Dict
import os
import time

from core.document_processor import DocumentProcessor
from core.embedding_handler import EmbeddingHandler
from core.llm_handler import LLMHandler
from langchain_objectbox.vectorstores import ObjectBox
from config import settings

# Placeholder for ObjectBox integration
# In a full implementation, you would integrate with ObjectBox here

class RAGPipeline:
    """Main RAG pipeline orchestrator"""

    def __init__(self):
        self.document_processor = DocumentProcessor()
        self.embedding_handler = EmbeddingHandler()
        self.llm_handler = LLMHandler()
        self.vector_store = ObjectBox(
            embedding=self.embedding_handler.embeddings,
            embedding_dimensions=self.embedding_handler.get_embedding_dimension()
        )
        self.llm_connected = False

        # Test connection to LLM
        self._check_connection()

    def _check_connection(self):
        """Check and update LLM connection status"""
        if self.llm_handler.test_connection():
            self.llm_connected = True
        else:
            self.llm_connected = False
            print("Warning: Could not connect to Ollama. Check that Ollama is running and the model is available.")

    def process_document(self, file_path: str) -> Dict:
        """Process a document through the full RAG pipeline"""
        start_time = time.time()

        try:
            # Step 1: Load and chunk document
            chunks = self.document_processor.process_pdf_file(file_path)

            # Step 2: Generate embeddings (placeholder)
            self.vector_store.add_documents(chunks)

            processing_time = time.time() - start_time

            return {
                "status": "success",
                "document_path": file_path,
                "chunks_processed": len(chunks),
                "processing_time": processing_time,
                "message": f"Successfully processed {len(chunks)} chunks from document"
            }

        except Exception as e:
            return {
                "status": "error",
                "document_path": file_path,
                "error": str(e),
                "processing_time": time.time() - start_time
            }

    def query_documents(self, query: str, document_paths: List[str] = None) -> Dict:
        """Query documents using RAG"""
        start_time = time.time()

        try:
            # Step 1: Check connection

            # Check connection before attempting generation
            if not self.llm_connected:
                # Try to reconnect in case the service started
                self._check_connection()
                if not self.llm_connected:
                    return {
                        "status": "error",
                        "query": query,
                        "error": "LLM Service is not connected. Please check that Ollama is running and the model is available.",
                        "response_time": time.time() - start_time
                    }

            # Step 2: Retrieve relevant documents
            docs = self.vector_store.similarity_search(query, k=3)
            context = "\n\n".join([doc.page_content for doc in docs])
            sources = [{"name": os.path.basename(doc.metadata.get("source", "unknown")), "page": doc.metadata.get("page", "unknown")} for doc in docs]

            # Step 3: Generate answer with LLM
            answer = self.llm_handler.generate_answer(context, query)

            response_time = time.time() - start_time

            return {
                "status": "success",
                "query": query,
                "answer": answer,
                "sources": sources,
                "response_time": response_time
            }

        except Exception as e:
            return {
                "status": "error",
                "query": query,
                "error": str(e),
                "response_time": time.time() - start_time
            }

    def get_system_status(self) -> Dict:
        """Get the status of the RAG system"""
        self._check_connection()
        return {
            "ollama_connected": self.llm_connected,  # Keep key as 'ollama_connected' for frontend compatibility
            "embedding_model": "sentence-transformers/all-MiniLM-L6-v2",
            "chunk_size": settings.CHUNK_SIZE,
            "chunk_overlap": settings.CHUNK_OVERLAP
        }