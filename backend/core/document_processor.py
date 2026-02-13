try:
    from langchain.text_splitter import RecursiveCharacterTextSplitter
except ImportError:
    from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from typing import List
import os

from config import settings

class DocumentProcessor:
    """Handles document loading and chunking"""

    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP,
            length_function=len,
        )

    def load_pdf(self, file_path: str) -> List[Document]:
        """Load a PDF file and return its content as LangChain documents"""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        loader = PyPDFLoader(file_path)
        documents = loader.load()
        return documents

    def chunk_documents(self, documents: List[Document]) -> List[Document]:
        """Split documents into chunks"""
        chunks = self.text_splitter.split_documents(documents)
        return chunks

    def process_pdf_file(self, file_path: str) -> List[Document]:
        """Load and chunk a PDF file"""
        documents = self.load_pdf(file_path)
        chunks = self.chunk_documents(documents)
        return chunks