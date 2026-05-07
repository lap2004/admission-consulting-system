# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from app.routers import auth, chat, user, track
# from app.logger import setup_logger
# from app.middleware.log_request import LogRequestMiddleware
# from fastapi.openapi.utils import get_openapi
# from app.routers import admin

# setup_logger()

# app = FastAPI(
#     title="VLU AI Chatbot",
#     description="AI tư vấn tuyển sinh và học vụ – Đại học Văn Lang",
#     version="1.0.0"
# )

# app.add_middleware(
#     CORSMiddleware,

#     allow_origins=["https://seo-visiting-emissions-lazy.trycloudflare.com","https://vlu-chatbot.vercel.app","http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# app.include_router(auth.router, prefix="/auth", tags=["Auth"],)       
# app.include_router(chat.router, prefix="/chat", tags=["Chat"])        
# app.include_router(user.router, prefix="/users", tags=["Users"])     
# app.include_router(admin.router, prefix="/admin",tags=["Admin"])
# app.include_router(track.router)

# @app.get("/", tags=["Health"])
# async def root():
#     return {"message": "VLU Chatbot API is up and running! "}

# def custom_openapi():
#     if app.openapi_schema:
#         return app.openapi_schema

#     openapi_schema = get_openapi(
#         title=app.title,
#         version=app.version,
#         description=app.description,
#         routes=app.routes,
#     )
#     openapi_schema["components"]["securitySchemes"] = {
#         "BearerAuth": {
#             "type": "http",
#             "scheme": "Bearer",
#             "bearerFormat": "JWT"
#         }
#     }
#     for path in openapi_schema["paths"].values():
#         for method in path.values():
#             method.setdefault("security", [{"BearerAuth": []}])

#     app.openapi_schema = openapi_schema
#     return app.openapi_schema

# app.openapi = custom_openapi


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
import os

os.environ["HF_HUB_OFFLINE"] = "1"

from sentence_transformers import SentenceTransformer

from app.routers import auth, chat, user, track, admin
from app.logger import setup_logger
from app.middleware.log_request import LogRequestMiddleware
from app.config import settings

setup_logger()

app = FastAPI(
    title="VLU AI Chatbot",
    description="AI tư vấn tuyển sinh và học vụ – Đại học Văn Lang",
    version="1.0.0"
)

# =========================
# GLOBAL MODEL (singleton)
# =========================
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


# =========================
# MIDDLEWARE
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://viewers-chen-chicago-organizer.trycloudflare.com",
        "https://vlu-chatbot.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# ROUTERS
# =========================
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])
app.include_router(track.router)


@app.get("/", tags=["Health"])
async def root():
    return {"message": "VLU Chatbot API is up and running!"}


# =========================
# OPENAPI JWT
# =========================
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
