from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from typing import Dict, List
import json

from config import settings

class LLMHandler:
    """Handles interactions with the LLM (Ollama)"""

    def __init__(self):
        self.llm = OllamaLLM(
            model=settings.OLLAMA_MODEL,
            base_url=settings.OLLAMA_BASE_URL,
            temperature=0.7
        )

        # Define prompt template for RAG
        self.prompt_template = PromptTemplate(
            input_variables=["context", "question"],
            template="""Use the following context to answer the question at the end.
            If you don't know the answer, just say that you don't know, don't try to make up an answer.

            Context:
            {context}

            Question: {question}
            Helpful Answer:"""
        )

        self.chain = self.prompt_template | self.llm | StrOutputParser()

    def generate_answer(self, context: str, question: str) -> str:
        """Generate an answer based on context and question"""
        try:
            response = self.chain.invoke({"context": context, "question": question})
            return response.strip()
        except Exception as e:
            raise Exception(f"Error generating answer: {str(e)}")

    def get_available_models(self) -> List[str]:
        """Get list of available models"""
        try:
            # This is a simplified approach - in practice you might want to
            # make a direct API call to Ollama to get the list of models
            return [settings.OLLAMA_MODEL]
        except Exception as e:
            raise Exception(f"Error getting available models: {str(e)}")

    def test_connection(self) -> bool:
        """Test connection to Ollama"""
        try:
            # Simple test - generate a short response
            response = self.llm.invoke("Hello")
            return response is not None
        except Exception as e:
            print(f"Connection test failed: {str(e)}")
            return False