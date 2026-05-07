from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID

from app.db.database import get_db
from app.db.schemas.chat_schema import ChatRequest, ChatResponse, ChatSessionOut, ChatHistoryOut
from app.services.chat_service import handle_admission_query, handle_student_query
from app.core.security import decode_access_token, get_current_user
from app.db.models.user_model import User
from app.db.models.chat_session import ChatSession
from app.db.models.chat_model import ChatHistory

router = APIRouter(tags=["Chat"])

@router.post("/student", response_model=ChatResponse)
async def chat_student(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    return await handle_student_query(request.question, db, user, request.session_id)

@router.post("/admission", response_model=ChatResponse)
async def chat_admission(
    request: ChatRequest,
    http_request: Request,
    db: AsyncSession = Depends(get_db),
):
    auth_header: Optional[str] = http_request.headers.get("Authorization")
    
    if auth_header:
        try:
            token = auth_header.split(" ")[1]
            payload = decode_access_token(token)  
            if payload.get("role") != "admin":
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Bạn không có quyền truy cập API này.",
                )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token không hợp lệ.",
            )

    return await handle_admission_query(request.question, db, request.session_id)

@router.get("/sessions", response_model=List[ChatSessionOut])
async def get_sessions(
    db: AsyncSession = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    result = await db.execute(
        select(ChatSession)
        .where(ChatSession.user_id == user.id)
        .order_by(ChatSession.created_at.desc())
    )
    return result.scalars().all()

@router.get("/sessions/{session_id}/messages", response_model=List[ChatHistoryOut])
async def get_session_messages(
    session_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    # Verify session belongs to user
    session = await db.get(ChatSession, session_id)
    if not session or session.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

    result = await db.execute(
        select(ChatHistory)
        .where(ChatHistory.session_id == session_id)
        .order_by(ChatHistory.created_at.asc())
    )
    return result.scalars().all()