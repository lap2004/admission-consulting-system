import os
import json
from typing import List, Dict
from dotenv import load_dotenv
import google.generativeai as genai

# Load biến môi trường
load_dotenv()

# Cấu hình Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

if not GEMINI_API_KEY:
    raise ValueError("Thiếu GEMINI_API_KEY trong file .env")

genai.configure(api_key=GEMINI_API_KEY)

# Các thư mục cấu hình
UPDATE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "update")
OUTPUT_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "extracted_update.json")

def read_txt(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def read_pdf(file_path: str) -> str:
    try:
        import fitz  # PyMuPDF
    except ImportError:
        raise ImportError("Hãy cài đặt thư viện PyMuPDF (pip install PyMuPDF) để đọc PDF.")
    
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text("text") + "\n"
    return text

def read_docx(file_path: str) -> str:
    try:
        import docx
    except ImportError:
        raise ImportError("Hãy cài đặt thư viện python-docx (pip install python-docx) để đọc DOCX.")
    
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_content(file_path: str) -> str:
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".txt":
        return read_txt(file_path)
    elif ext == ".pdf":
        return read_pdf(file_path)
    elif ext == ".docx":
        return read_docx(file_path)
    else:
        print(f"Bỏ qua định dạng không hỗ trợ: {file_path}")
        return ""

def generate_json_via_gemini(text_content: str, filename: str) -> List[Dict]:
    """Sử dụng Gemini để chuyển văn bản thô thành cấu trúc JSON chuẩn."""
    if not text_content.strip():
        return []

    model = genai.GenerativeModel(GEMINI_MODEL)
    
    prompt = f"""Bạn là một chuyên gia xử lý dữ liệu. Nhiệm vụ của bạn là đọc nội dung văn bản dưới đây và trích xuất các thông tin quan trọng để cấu trúc hóa lại dưới dạng một mảng (array) các object JSON.
    Văn bản gốc thuộc file: {filename}
    
    YÊU CẦU FORMAT TRẢ VỀ LÀ JSON ARRAY CHUẨN, KHÔNG ĐƯỢC CHỨA BẤT KỲ VĂN BẢN NÀO KHÁC BÊN NGOÀI BLOCK JSON.
    
    Cấu trúc của mỗi object trong mảng:
    {{
        "id": "chuỗi UUID ngẫu nhiên v4",
        "type": "loại thông tin (ví dụ: chuong_trinh_dao_tao, thong_tin_tuyen_sinh, hoc_phi, quy_che...)",
        "title": "Tiêu đề ngắn gọn tóm tắt đoạn nội dung",
        "content": "Nội dung chi tiết được trích xuất (tối đa giữ được đầy đủ ý nghĩa, không tự chế thêm)",
        "source": "{filename}",
        "ma_nganh": "Mã ngành nếu văn bản có nhắc đến, nếu không thì để trống",
        "doi_tuong": "Đối tượng (nếu có, ví dụ: sinh viên khóa 29, thí sinh...)"
    }}
    
    Tách nội dung thành nhiều object nếu văn bản đề cập đến nhiều chủ đề/ngành khác nhau.
    
    --- BẮT ĐẦU VĂN BẢN ---
    {text_content}
    --- KẾT THÚC VĂN BẢN ---
    """
    
    print(f"Đang gửi {len(text_content)} ký tự của file {filename} lên Gemini...")
    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json"
            )
        )
        # Parse output JSON
        raw_output = response.text.strip()
        data = json.loads(raw_output)
        if isinstance(data, dict):
            data = [data]
        return data
    except Exception as e:
        print(f"Lỗi khi xử lý file {filename} qua Gemini: {e}")
        # In ra raw text nếu parse JSON thất bại
        if 'raw_output' in locals():
            print(f"Raw output: {raw_output[:200]}...")
        return []

def main():
    if not os.path.exists(UPDATE_DIR):
        os.makedirs(UPDATE_DIR)
        print(f"Đã tạo thư mục {UPDATE_DIR}. Vui lòng copy các file cần xử lý vào đây.")
        return

    all_extracted_data = []
    
    # Nếu file JSON đã tồn tại, đọc lên để append thay vì ghi đè hoàn toàn
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
                all_extracted_data = json.load(f)
            print(f"Đã tải {len(all_extracted_data)} record từ {OUTPUT_FILE} hiện tại.")
        except json.JSONDecodeError:
            print("File JSON hiện tại bị lỗi, sẽ ghi đè file mới.")
    
    files_processed = 0
    for filename in os.listdir(UPDATE_DIR):
        file_path = os.path.join(UPDATE_DIR, filename)
        if os.path.isfile(file_path):
            print(f"\n--- Bắt đầu đọc: {filename} ---")
            content = extract_content(file_path)
            if content:
                # Nếu file quá dài (ví dụ > 500k ký tự) thì nên có logic chunking, 
                # tuy nhiên Gemini 2.0 Flash xử lý tốt đến 1M tokens nên có thể gửi nguyên file.
                extracted_json = generate_json_via_gemini(content, filename)
                if extracted_json:
                    all_extracted_data.extend(extracted_json)
                    print(f"Đã trích xuất {len(extracted_json)} bản ghi từ {filename}.")
                    files_processed += 1
            else:
                print(f"Không thể đọc text hoặc file rỗng: {filename}")
                
    if files_processed > 0:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(all_extracted_data, f, ensure_ascii=False, indent=2)
        print(f"\nThành công! Đã lưu tổng cộng {len(all_extracted_data)} bản ghi vào {OUTPUT_FILE}")
    else:
        print("\nKhông có file hợp lệ nào được xử lý thành công.")

if __name__ == "__main__":
    main()
