from langchain_huggingface import HuggingFaceEmbeddings
from typing import List
import numpy as np

class EmbeddingHandler:
    """Handles document embedding generation"""

    def __init__(self):
        # Initialize HuggingFace embeddings
        # Using a lightweight model suitable for local execution
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

    def embed_texts(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for a list of texts"""
        return self.embeddings.embed_documents(texts)

    def embed_query(self, query: str) -> List[float]:
        """Generate embedding for a query"""
        return self.embeddings.embed_query(query)

    def get_embedding_dimension(self) -> int:
        """Get the dimension of the embeddings"""
        # The dimension for the 'sentence-transformers/all-MiniLM-L6-v2' model is 384.
        # Hardcoding this value is more efficient than running a sample embedding on startup.
        return 384