from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class ChatRequest(BaseModel):
    question: str
    session_id: Optional[UUID] = None

class SourceChunk(BaseModel):
    id: UUID
    title: str
    content: str
    field: Optional[str] = None
    type: Optional[str] = None
    score: Optional[float] = None 

class ChatResponse(BaseModel):
    answer: str
    session_id: Optional[UUID] = None
    chunks: Optional[List[SourceChunk]] = None 

class ChatHistoryOut(BaseModel):
    id: UUID
    session_id: Optional[UUID] = None
    username: str
    role: str
    question: str
    answer: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }

class ChatSessionOut(BaseModel):
    id: UUID
    user_id: Optional[UUID] = None
    title: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }