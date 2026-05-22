# from uuid import uuid4
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.rag.chat_pipeline import chat_pipeline
# from app.db.models.chat_model import ChatHistory
# from app.db.schemas.chat_schema import ChatResponse
# from app.rag.word_filter import is_question_safe

# async def handle_admission_query(question: str, db: AsyncSession):
#     role = "admission"
#     user_id = None
#     username = "guest"

#     result = await chat_pipeline(
#         question=question,
#         role=role,
#         db=db,
#         user_id=user_id,
#         username=username
#     )

#     return {
#         "answer": result["answer"],
#         "sources": result["chunks"]
#     }

# async def handle_student_query(question: str, db: AsyncSession, user: dict) -> ChatResponse:
#     if not is_question_safe(question):
#         return ChatResponse(
#             answer="Câu hỏi của bạn chứa nội dung không phù hợp.",
#             chunks=[]
#         )

#     result = await chat_pipeline(
#         question=question,
#         role="student",
#         db=db
#     )

#     new_log = ChatHistory(
#         id=uuid4(),
#         user_id=user.id,
#         username=user.full_name or user.email or "unknown",  
#         role=user.role,
#         question=question,
#         answer=result["answer"]
#     )

#     db.add(new_log)
#     await db.commit()
#     return ChatResponse(
#         answer=result["answer"],
#         chunks=result["chunks"]
#     )
from sqlalchemy.ext.asyncio import AsyncSession
from app.rag.chat_pipeline import chat_pipeline
from app.db.schemas.chat_schema import ChatResponse
from app.rag.word_filter import is_question_safe


from uuid import UUID
from typing import Optional
from sqlalchemy import select

async def handle_admission_query(question: str, db: AsyncSession, session_id: Optional[UUID] = None) -> ChatResponse:
    from app.db.models.chat_session import ChatSession
    role = "admission"
    user_id = None
    username = "guest"
    
    # Handle session
    if not session_id:
        new_session = ChatSession(user_id=user_id, title=question[:50])
        db.add(new_session)
        await db.flush()
        session_id = new_session.id

    result = await chat_pipeline(
        question=question,
        role=role,
        db=db,
        user_id=user_id,
        username=username,
        session_id=session_id
    )

    return ChatResponse(
        answer=result["answer"],
        session_id=session_id,
        chunks=result["chunks"]
    )


async def handle_student_query(question: str, db: AsyncSession, user: dict, session_id: Optional[UUID] = None) -> ChatResponse:
    from app.db.models.chat_session import ChatSession
    if not is_question_safe(question):
        return ChatResponse(
            answer="Câu hỏi của bạn chứa nội dung không phù hợp.",
            chunks=[]
        )
        
    # Handle session
    if not session_id:
        new_session = ChatSession(user_id=user.id, title=question[:50])
        db.add(new_session)
        await db.flush()
        session_id = new_session.id

    result = await chat_pipeline(
        question=question,
        role="student",
        db=db,
        user_id=user.id,
        username=user.full_name or user.email or "unknown",
        session_id=session_id
    )

    return ChatResponse(
        answer=result["answer"],
        session_id=session_id,
        chunks=result["chunks"]
    )
