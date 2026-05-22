from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
import os

from sentence_transformers import SentenceTransformer

from app.routers import auth, chat, user, track, admin
from app.logger import setup_logger
from app.middleware.log_request import LogRequestMiddleware
from app.config import settings
from app.core.exceptions import setup_exception_handlers

setup_logger()

app = FastAPI(
    title="VLU AI Chatbot",
    description="AI tư vấn tuyển sinh và học vụ – Đại học Văn Lang",
    version="1.0.0"
)

# Setup centralized exception handling
setup_exception_handlers(app)

# Global embedding model (Singleton instance)
embedding_model: SentenceTransformer | None = None


@app.on_event("startup")
async def startup_event():
    """
    Load embedding model ONCE when app starts
    """
    global embedding_model
    embedding_model = SentenceTransformer(
        settings.EMBED_MODEL_NAME,
        device="cpu"
    )
    print("✅ Embedding model loaded")


# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vlu-chatbot.vercel.app/guide",
        "https://vlu-chatbot.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])
app.include_router(track.router)


@app.get("/", tags=["Health"])
async def root():
    return {"message": "VLU Chatbot API is up and running!"}


# Customize OpenAPI schema to include JWT Bearer authentication
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "Bearer",
            "bearerFormat": "JWT"
        }
    }

    for path in openapi_schema["paths"].values():
        for method in path.values():
            method.setdefault("security", [{"BearerAuth": []}])

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
