from google import genai
from app.config import settings
from loguru import logger

client = genai.Client(api_key=settings.GEMINI_API_KEY)

def format_prompt(question: str, contexts: list[dict]) -> str:
    context_texts = [chunk["content"].strip() for chunk in contexts if chunk.get("content")]
    context_block = "\n".join(context_texts)

    return f"""Bạn là trợ lý AI chuyên nghiệp hỗ trợ thông tin tuyển sinh và đào tạo cho Trường Đại học Văn Lang.

Yêu cầu về ngôn ngữ và trình bày:
- Trả lời bằng ngôn ngữ tương ứng với câu hỏi của người dùng (Tiếng Việt hoặc Tiếng Anh).
- Bắt buộc sử dụng tiếng Việt chuẩn xác, đúng ngữ pháp, có ĐẦY ĐỦ dấu câu (chấm, phẩy rõ ràng) và dấu chữ (dấu thanh tiếng Việt).
- Diễn đạt câu văn trôi chảy, tự nhiên, lịch sự và chuyên nghiệp. Luôn viết hoa chữ cái đầu câu và có dấu chấm kết thúc câu.
- Tuyệt đối không viết tắt, không dùng ngôn ngữ mạng (teencode).

Hướng dẫn nội dung:
- Trả lời đầy đủ ý nhưng súc tích, đi thẳng vào trọng tâm câu hỏi.
- Nếu thông tin có nhiều ý, hãy trình bày rõ ràng bằng danh sách đánh số (1., 2., 3...) hoặc gạch đầu dòng (-).
- Chỉ dựa vào "Nội dung tham khảo" bên dưới để trả lời. Tuyệt đối không tự bịa đặt thông tin.
- Không lặp lại cụm từ "Theo nội dung tham khảo" hay "Trong tài liệu có ghi".
- Nếu nội dung tham khảo không chứa đủ thông tin để trả lời, hãy nói rõ: "Tôi chưa có thông tin chính xác cho câu hỏi này, bạn vui lòng liên hệ bộ phận tuyển sinh để được hỗ trợ cụ thể hơn."
- Nếu người dùng chỉ gửi lời chào, hãy đáp lại thân thiện.
- KHÔNG sử dụng định dạng Markdown (**in đậm**, *in nghiêng*, `#`...). Chỉ trả về văn bản thuần túy.

Nội dung tham khảo:
{context_block}

Câu hỏi của người dùng: {question}
""".strip()

async def ask_gemini(question: str, contexts: list[dict]) -> str:
    prompt = format_prompt(question, contexts)

    try:
        response = await client.aio.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt
        )
        answer = response.text.strip()

        if not answer or "không rõ" in answer.lower() or "không hiểu" in answer.lower():
            return " Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi cụ thể hơn không?"

        if question.lower().strip() in ["xin chào", "chào", "hello", "hi"]:
            return "Xin chào! Tôi là AI Chatbot Tuyển sinh của Đại Học Văn Lang. Tôi có thể giúp gì cho bạn."

        return answer

    except Exception as e:
        logger.error(f"Lỗi khi gọi Gemini: {e}")
        return " Rất tiếc, hệ thống đang gặp lỗi. Bạn vui lòng thử lại sau."
