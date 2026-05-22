# Chatbot NCKH - Tư vấn Tuyển sinh và Hỗ trợ Sinh viên

Dự án Hệ thống Chatbot Tư vấn Tuyển sinh và Hỗ trợ Sinh viên hoàn chỉnh bao gồm cả **Frontend** và **Backend** trong cùng một Repository (Monorepo). 

Hệ thống được xây dựng với kiến trúc **RAG** (Retrieval-Augmented Generation) kết hợp mô hình ngôn ngữ lớn (LLM) để trả lời câu hỏi tự động, cùng với giao diện người dùng hiện đại, quản lý hội thoại và hệ thống phân quyền Admin/Student.

---

## 🚀 Công nghệ sử dụng

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Ngôn ngữ:** TypeScript
- **UI Library:** Material-UI (MUI) v5
- **Animation:** Framer Motion
- **State Management & Fetching:** React Hooks, Axios
- **Styling:** Emotion (CSS-in-JS)

### Backend
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL (với extension `pgvector` để lưu trữ vector)
- **ORM & Migration:** SQLAlchemy (Async) & Alembic
- **AI/LLM:** HuggingFace `BAAI/bge-m3` (để embedding), `Gemini` (để sinh câu trả lời)
- **Authentication:** JWT (JSON Web Tokens)
- **Công cụ hỗ trợ:** Loguru (Ghi log), Uvicorn (Server)

---

## 📂 Cấu trúc thư mục (Monorepo)

Dự án được chia thành 2 thư mục chính: `frontend` và `backend`.

```text
nckh-backend/ (Root)
├── frontend/               # Toàn bộ mã nguồn Frontend (Next.js)
│   ├── public/             # Tài nguyên tĩnh (Hình ảnh, Video, Favicon,...)
│   ├── src/                # Mã nguồn chính (App Router, Components, Hooks, API,...)
│   ├── .env                # Biến môi trường Frontend
│   └── package.json        # Danh sách thư viện Frontend
│
├── backend/                # Toàn bộ mã nguồn Backend (FastAPI)
│   ├── alembic/            # Cấu hình migration Database
│   ├── app/                # Các module chính (auth, core, db, rag, routers, services)
│   ├── data/               # Chứa tài liệu thô (JSON, PDF) và file liên quan
│   ├── scripts/            # Script tiện ích (embedding, tạo admin)
│   ├── .env                # Biến môi trường Backend
│   └── requirements.txt    # Danh sách thư viện Python
│
└── README.md               # Tài liệu dự án (File này)
```

---

## 🛠 Hướng dẫn Cài đặt & Khởi chạy

### 1. Khởi chạy Backend (FastAPI)

**Yêu cầu:** Python 3.10+ và PostgreSQL (có cài `pgvector`).

```bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Tạo môi trường ảo và cài đặt thư viện
conda create -n nckh python=3.10
conda activate nckh
pip install -r requirements.txt

# 3. Cấu hình biến môi trường
# Tạo file backend/.env theo mẫu:
# DATABASE_URL=postgresql+psycopg2://<user>:<password>@<host>:<port>/<db_name>
# DATABASE_URL_ASYNC=postgresql+asyncpg://<user>:<password>@<host>:<port>/<db_name>
# PGVECTOR_DIM=1024
# EMBED_MODEL_NAME=BAAI/bge-m3
# GEMINI_MODEL=models/gemini-2.0-flash
# JWT_EXPIRE_MINUTES=60
# NEXT_PUBLIC_API_BACKEND_DOMAIN=http://localhost:3000

# 4. Khởi chạy Server
python -m uvicorn app.main:app --reload --port 8000
```
Backend sẽ chạy tại: `http://localhost:8000` (Swagger UI: `http://localhost:8000/docs`).

### 2. Khởi chạy Frontend (Next.js)

**Yêu cầu:** Node.js v18.x trở lên.

```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt thư viện
npm install

# 3. Cấu hình biến môi trường
# Tạo file frontend/.env theo mẫu:
# NEXT_PUBLIC_API_BACKEND_DOMAIN=http://127.0.0.1:8000

# 4. Khởi chạy Server
npm run dev
```
Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000).

---

## ✨ Các tính năng chính (Features)

1. **Hệ thống Chatbot RAG:** Nhắn tin thời gian thực với AI, tự động nhóm tin nhắn theo Session và xem lại lịch sử dễ dàng.
2. **Xác thực và Phân quyền:** Đăng ký, Đăng nhập, Quên mật khẩu với luồng người dùng tách biệt (Khách, Sinh viên, Admin).
3. **Admin Dashboard:** Quản lý danh sách người dùng và dữ liệu hệ thống.
4. **Cập nhật Dữ liệu AI tự động:** Hỗ trợ trích xuất dữ liệu từ các tệp thô (Word, PDF, txt) và tự động Vector hóa (Embedding) thông qua các Script tiện ích ở backend.

---

## 🤖 Hướng dẫn cập nhật Dữ liệu Embedding (RAG)

Khi có tài liệu mới cần cập nhật cho Chatbot:
1. Copy các file tài liệu thô (`.txt`, `.pdf`, `.docx`) vào thư mục `backend/data/update/`.
2. Di chuyển vào thư mục backend và chạy script trích xuất:
   ```bash
   cd backend
   python scripts/extract_update_to_json.py
   ```
3. Sau khi file `extracted_update.json` được tạo, chạy script embedding để lưu vào Database:
   ```bash
   python scripts/embed_runner.py
   ```
