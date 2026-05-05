# from typing import Optional
# from uuid import UUID
# from app.rag.retriever import retrieve_chunks
# from app.rag.llm_chain import ask_gemini
# from app.config import settings
# from sentence_transformers import SentenceTransformer
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.db.models.chat_model import ChatHistory

# # model = SentenceTransformer(settings.EMBED_MODEL_NAME)
# model = SentenceTransformer(settings.EMBED_MODEL_NAME, device="cpu")

# # async def chat_pipeline(
# async def chat_pipeline(
#     question: str,
#     role: str,
#     db: AsyncSession,
#     top_k: int = 20,
#     filter_field: str = "",
#     filter_type: str = "",
#     user_id: Optional[UUID] = None,
#     username: str = "guest"
# ) -> dict:
#     query_vector = model.encode(question, normalize_embeddings=True).tolist()
    
#     chunks = await retrieve_chunks(
#         embedding=query_vector,
#         role=role,
#         db=db,
#         top_k=top_k,
#         field=filter_field,
#         type_=filter_type
#     )

#     answer = ask_gemini(question, chunks)
#     history = ChatHistory(
#         user_id=user_id,
#         username=username,
#         role=role,
#         question=question,
#         answer=answer,
#     )
#     db.add(history)
#     await db.commit()

#     return {
#         "answer": answer,
#         "chunks": chunks
#     }
# # from typing import Optional
# # from uuid import UUID
# # from sqlalchemy.ext.asyncio import AsyncSession
# # from sqlalchemy import select
# # from app.rag.retriever import retrieve_chunks
# # from app.rag.llm_chain import ask_claude
# # from app.config import settings
# # from sentence_transformers import SentenceTransformer
# # from app.db.models.chat_model import ChatHistory

# # model = SentenceTransformer(settings.EMBED_MODEL_NAME, device="cpu")

# # async def get_user_history(user_id: UUID, role: str, db: AsyncSession, limit: int = 5) -> list[dict]:
# #     result = await db.execute(
# #         select(ChatHistory)
# #         .where(ChatHistory.user_id == user_id)
# #         .where(ChatHistory.role == role)
# #         .order_by(ChatHistory.created_at.desc())
# #         .limit(limit)
# #     )
# #     previous_chats = result.scalars().all()
# #     return [
# #         {"question": chat.question, "answer": chat.answer}
# #         for chat in reversed(previous_chats)
# #         if chat.question and chat.answer
# #     ]

# # async def save_chat_history(user_id: Optional[UUID], username: str, role: str, question: str, answer: str, db: AsyncSession):
# #     chat = ChatHistory(
# #         user_id=user_id,
# #         username=username,
# #         role=role,
# #         question=question,
# #         answer=answer,
# #     )
# #     db.add(chat)
# #     await db.commit()

# # async def chat_pipeline(
# #     question: str,
# #     role: str,
# #     db: AsyncSession,
# #     top_k: int = 20,
# #     filter_field: str = "",
# #     filter_type: str = "",
# #     user_id: Optional[UUID] = None,
# #     username: str = "guest"
# # ) -> dict:
# #     # 1. Tạo vector embedding
# #     query_vector = model.encode(question, normalize_embeddings=True).tolist()

# #     # 2. Truy xuất chunks từ DB
# #     chunks = await retrieve_chunks(
# #         embedding=query_vector,
# #         role=role,
# #         db=db,
# #         top_k=top_k,
# #         field=filter_field,
# #         type_=filter_type
# #     )

# #     # 3. Lấy lịch sử hội thoại
# #     history = await get_user_history(user_id, role, db) if user_id else []

# #     # 4. Gọi Claude
# #     answer = ask_claude(question, chunks, history=history)
# #     if not answer:
# #         answer = "Xin lỗi, tôi chưa thể trả lời câu hỏi này. Bạn có thể hỏi lại rõ hơn không?"

# #     # 5. Ghi log vào DB
# #     await save_chat_history(user_id, username, role, question, answer, db)

# #     # 6. Trả kết quả
# #     return {
# #         "answer": answer,
# #         "chunks": chunks
# #     }


from typing import Optional
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.rag.retriever import retrieve_chunks
from app.rag.llm_chain import ask_gemini
from app.db.models.chat_model import ChatHistory


async def chat_pipeline(
    question: str,
    role: str,
    db: AsyncSession,
    top_k: int = 20,
    filter_field: str = "",
    filter_type: str = "",
    user_id: Optional[UUID] = None,
    username: str = "guest"
) -> dict:
    from app.main import embedding_model
    # =========================
    # SAFETY CHECK
    # =========================
    if embedding_model is None:
        raise RuntimeError("Embedding model not loaded")

    # =========================
    # QUERY EMBEDDING
    # =========================
    query_vector = embedding_model.encode(
        question,
        normalize_embeddings=True
    ).tolist()

    # =========================
    # RETRIEVE CHUNKS
    # =========================
    chunks = await retrieve_chunks(
        embedding=query_vector,
        role=role,
        db=db,
        top_k=top_k,
        field=filter_field,
        type_=filter_type
    )

    # =========================
    # LLM
    # =========================
    answer = ask_gemini(question, chunks)

    # =========================
    # SAVE CHAT HISTORY
    # =========================
    history = ChatHistory(
        user_id=user_id,
        username=username,
        role=role,
        question=question,
        answer=answer,
    )
    db.add(history)
    await db.commit()

    return {
        "answer": answer,
        "chunks": chunks
    }
