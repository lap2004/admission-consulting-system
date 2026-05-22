import time
from typing import Optional
from uuid import UUID
import asyncio

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from loguru import logger

from app.rag.retriever import retrieve_chunks
from app.rag.llm_chain import ask_gemini
from app.db.models.chat_model import ChatHistory

async def get_user_history(session_id: UUID, db: AsyncSession, limit: int = 5) -> list[dict]:
    result = await db.execute(
        select(ChatHistory)
        .where(ChatHistory.session_id == session_id)
        .order_by(ChatHistory.created_at.desc())
        .limit(limit)
    )
    previous_chats = result.scalars().all()
    return [
        {"question": chat.question, "answer": chat.answer}
        for chat in reversed(previous_chats)
        if chat.question and chat.answer
    ]


async def chat_pipeline(
    question: str,
    role: str,
    db: AsyncSession,
    top_k: int = 5,
    filter_field: str = "",
    filter_type: str = "",
    user_id: Optional[UUID] = None,
    username: str = "guest",
    session_id: Optional[UUID] = None
) -> dict:
    from app.main import embedding_model
    # =========================
    # SAFETY CHECK
    # =========================
    if embedding_model is None:
        raise RuntimeError("Embedding model not loaded")

    start_total = time.time()

    # =========================
    # GET USER HISTORY & REWRITE
    # =========================
    t0 = time.time()
    history = []
    search_query = question
    if session_id:
        history = await get_user_history(session_id, db, limit=5)
        if history:
            from app.rag.llm_chain import rewrite_question
            search_query = await rewrite_question(question, history)
            logger.info(f"Original Query: {question} | Rewritten: {search_query}")
    rewrite_time = time.time() - t0

    # =========================
    # QUERY EMBEDDING
    # =========================
    t0 = time.time()
    query_vector_np = await asyncio.to_thread(
        embedding_model.encode,
        search_query,
        normalize_embeddings=True
    )
    query_vector = query_vector_np.tolist()
    embed_time = time.time() - t0

    # =========================
    # RETRIEVE CHUNKS
    # =========================
    t0 = time.time()
    chunks = await retrieve_chunks(
        embedding=query_vector,
        role=role,
        db=db,
        top_k=top_k,
        field=filter_field,
        type_=filter_type
    )
    retrieve_time = time.time() - t0

    # =========================
    # LLM
    # =========================
    t0 = time.time()
    answer = await ask_gemini(question, chunks, history=history)
    llm_time = time.time() - t0

    # =========================
    # SAVE CHAT HISTORY
    # =========================
    t0 = time.time()
    history_record = ChatHistory(
        session_id=session_id,
        user_id=user_id,
        username=username,
        role=role,
        question=question,
        answer=answer,
    )
    db.add(history_record)
    await db.commit()
    save_time = time.time() - t0
    
    total_time = time.time() - start_total
    logger.info(f"[TIMING] Rewrite: {rewrite_time:.2f}s | Embed: {embed_time:.2f}s | Retrieve: {retrieve_time:.2f}s | LLM: {llm_time:.2f}s | Save: {save_time:.2f}s | TOTAL: {total_time:.2f}s")

    return {
        "answer": answer,
        "chunks": chunks
    }
