from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Server settings
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    DEBUG: bool = True

    # Document settings
    DOCUMENTS_PATH: str = "../documents"
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200

    # Ollama settings
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen3-coder:480b-cloud"

    # ObjectBox settings
    OBJECTBOX_PATH: str = "./objectbox"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()