# Chatbot NCKH Backend

Dự án Backend cho hệ thống Chatbot Tư vấn Tuyển sinh và Hỗ trợ Sinh viên, phát triển trên nền tảng **FastAPI**, sử dụng kiến trúc **RAG** (Retrieval-Augmented Generation) kết hợp với các mô hình ngôn ngữ lớn (LLM).

## 🚀 Công nghệ sử dụng
- **Framework:** FastAPI
- **Database:** PostgreSQL (kèm extension `pgvector` để lưu trữ vector embeddings)
- **ORM & Migration:** SQLAlchemy (hỗ trợ Async) & Alembic
- **AI/LLM:** HuggingFace `BAAI/bge-m3` (để embedding), `Gemini` (để sinh câu trả lời)
- **Authentication:** JWT (JSON Web Tokens)
- **Công cụ hỗ trợ:** Loguru (Ghi log), Uvicorn (Server)

---

## 📂 Cấu trúc thư mục

```text
├── alembic/                # Cấu hình và scripts migration cho Database
├── app/
│   ├── auth/               # Xử lý xác thực (JWT token, email OTP)
│   ├── config.py           # Quản lý biến môi trường (Pydantic Settings)
│   ├── core/               # Các module cốt lõi (security, dependencies, constants, utils)
│   ├── db/                 # Kết nối DB, Models (SQLAlchemy) và Schemas (Pydantic)
│   │   ├── models/         # (user, chat_history, chat_session, vector)
│   │   └── schemas/
│   ├── middleware/         # Middleware (VD: ghi log mọi request)
│   ├── rag/                # Pipeline RAG (embedder, retriever, text_splitter, llm_chain)
│   ├── routers/            # Định nghĩa các API endpoint (admin, auth, chat, user)
│   └── services/           # Chứa logic nghiệp vụ xử lý chính
├── data/                   # Chứa tài liệu thô (JSON, PDF) và danh sách từ cấm
├── logs/                   # Thư mục lưu file log hệ thống
├── scripts/                # Script tiện ích (tạo admin, chạy batch embedding)
├── migrate_db.py           # Script hỗ trợ khởi tạo table (Database)
├── requirements.txt        # Các thư viện Python cần thiết
└── README.md               # Tài liệu dự án (File này)
```

---

## 🛠 Hướng dẫn Cài đặt & Khởi chạy

### 1. Yêu cầu hệ thống
- **Python:** 3.10 trở lên
- **Cơ sở dữ liệu:** PostgreSQL (có cài đặt sẵn extension `pgvector`).

### 2. Cài đặt thư viện
Tạo môi trường ảo (Virtual Environment) hoặc dùng Conda:
```bash
conda create -n nckh python=3.10
conda activate nckh
pip install -r requirements.txt
```

### 3. Cấu hình biến môi trường (`.env`)
Tạo file `.env` ở thư mục gốc của project với nội dung cơ bản sau:
```env
# Kết nối Database (Sync & Async)
DATABASE_URL=postgresql+psycopg2://<user>:<password>@<host>:<port>/<db_name>
DATABASE_URL_ASYNC=postgresql+asyncpg://<user>:<password>@<host>:<port>/<db_name>

# Cấu hình AI / LLM
PGVECTOR_DIM=1024
EMBED_MODEL_NAME=BAAI/bge-m3
GEMINI_MODEL=models/gemini-2.0-flash

# Cấu hình bảo mật
JWT_EXPIRE_MINUTES=60
NEXT_PUBLIC_API_BACKEND_DOMAIN=https://your-backend-domain.com
```

### 4. Khởi chạy Server
Dùng `uvicorn` để chạy server FastAPI:
```bash
python -m uvicorn app.main:app --reload --port 8000
```
- Server sẽ chạy tại: `http://localhost:8000`
- Tài liệu API tự động (Swagger UI) có sẵn tại: `http://localhost:8000/docs`

> *Mẹo: Nếu cần public API ra ngoài Internet (để test hoặc cho Frontend gọi), bạn có thể dùng Cloudflared:*
> ```bash
> cloudflared tunnel --url http://127.0.0.1:8000
> ```

---

## 🗄 Cấu trúc Database (PostgreSQL)

Bên dưới là thiết kế các bảng dữ liệu chính yếu của hệ thống. Bạn có thể tham khảo đoạn DDL dưới đây nếu muốn setup bằng lệnh SQL thuần túy (psql/DBeaver):

```sql
-- Cấu hình Extension cho Vector (RAG)
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Bảng Người dùng (Tài khoản)
CREATE TABLE IF NOT EXISTS user_20250627 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  full_name VARCHAR,
  role VARCHAR DEFAULT 'student',
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  force_password_change BOOLEAN NOT NULL DEFAULT FALSE
);

-- 2. Bảng Phiên trò chuyện (Nhóm các lịch sử chat)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  title TEXT NOT NULL DEFAULT 'New Chat',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bảng Lịch sử tin nhắn
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  username VARCHAR,
  role VARCHAR DEFAULT 'student',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Các Bảng Vector lưu trữ kiến thức RAG
CREATE TABLE IF NOT EXISTS embedding_admissions_20250716 (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1024),
  type TEXT,
  field TEXT,
  source TEXT,
  title_raw TEXT,
  ma_nganh TEXT,
  doi_tuong TEXT,
  chunk_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- (Tương tự cho embedding_students_20250716 và embedding_pdfs_20250716)

-- 5. Bảng phân tích lưu lượng
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  viewed_at TIMESTAMP DEFAULT NOW()
);
```
