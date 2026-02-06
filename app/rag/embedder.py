from app.config import settings
from app.db.database import get_sync_session
from app.db.models.vector_model import EmbeddingAdmissions, EmbeddingStudents, EmbeddingPDFs
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

model = SentenceTransformer(settings.EMBED_MODEL_NAME,device="cpu")

def embed_chunks(chunks: list[dict], table_name: str):
    if not chunks:
        print("Không có dữ liệu để embedding.")
        return

    texts = [chunk["content"] for chunk in chunks]
    embeddings = model.encode(texts, normalize_embeddings=True).tolist()

    with get_sync_session() as session:
        for chunk, vector in tqdm(zip(chunks, embeddings), total=len(chunks), desc=f"🔹 Embedding → {table_name}"):
            record = get_model_instance(table_name, chunk, vector)
            session.add(record)
        session.commit()
        print(f"Đã lưu {len(chunks)} vector vào bảng {table_name}")

def get_model_instance(table_name: str, chunk: dict, vector: list[float]):
    if table_name == "embedding_admissions_20250716":
        return EmbeddingAdmissions(**chunk, embedding=vector)
    elif table_name == "embedding_students_20250716":
        return EmbeddingStudents(**chunk, embedding=vector)
    elif table_name == "embedding_pdfs_20250716":
        return EmbeddingPDFs(**chunk, embedding=vector)
    else:
        raise ValueError(f"Bảng không hợp lệ: {table_name}")
