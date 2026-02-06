# FROM python:3.11-slim

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# WORKDIR /app

# # (Tuỳ chọn) cài build deps nếu bạn có package cần compile (psycopg2, etc.)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     build-essential gcc \
#  && rm -rf /var/lib/apt/lists/*

# # Copy requirements trước để cache tốt
# COPY requirements.txt .

# RUN pip install --no-cache-dir -r requirements.txt

# # Copy toàn bộ source
# COPY . .

# # Cloud Run sẽ cung cấp PORT (mặc định 8080)
# CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}"]

FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
