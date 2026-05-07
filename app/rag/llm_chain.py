from google import genai
from app.config import settings
from loguru import logger

client = genai.Client(api_key=settings.GEMINI_API_KEY)

def format_prompt(question: str, contexts: list[dict], history: list[dict] = None) -> str:
    context_texts = [chunk["content"].strip() for chunk in contexts if chunk.get("content")]
    context_block = "\n".join(context_texts)

    history_block = ""
    if history:
        history_lines = []
        for chat in history:
            history_lines.append(f"Người dùng: {chat['question']}")
            history_lines.append(f"AI: {chat['answer']}")
        history_block = "\nLịch sử trò chuyện gần đây:\n" + "\n".join(history_lines) + "\n"

    return f"""Bạn là trợ lý AI chuyên nghiệp hỗ trợ thông tin tuyển sinh và đào tạo cho Trường Đại học Văn Lang.

Yêu cầu về ngôn ngữ và trình bày:
- Trả lời bằng ngôn ngữ tương ứng với câu hỏi của người dùng (Tiếng Việt hoặc Tiếng Anh).
- Bắt buộc sử dụng tiếng Việt chuẩn xác, đúng ngữ pháp, có ĐẦY ĐỦ dấu câu (chấm, phẩy rõ ràng) và dấu chữ (dấu thanh tiếng Việt).
- Diễn đạt câu văn trôi chảy, tự nhiên, lịch sự và chuyên nghiệp. Luôn viết hoa chữ cái đầu câu và có dấu chấm kết thúc câu.
- Tuyệt đối không viết tắt, không dùng ngôn ngữ mạng (teencode).

Hướng dẫn nội dung:
- Trả lời đầy đủ ý nhưng súc tích, đi thẳng vào trọng tâm câu hỏi.
- Nếu thông tin có nhiều ý, hãy trình bày rõ ràng bằng danh sách đánh số (1., 2., 3...) hoặc gạch đầu dòng (-).
- Bạn được phép sử dụng kiến thức chung để quy đổi tên các môn học thành mã khối thi tương ứng (ví dụ: Toán, Vật lý, Hóa học là khối A00) khi người dùng hỏi về mã khối.
- Chỉ dựa vào "Nội dung tham khảo" bên dưới để trả lời. Tuyệt đối không tự bịa đặt thông tin.
- Không lặp lại cụm từ "Theo nội dung tham khảo" hay "Trong tài liệu có ghi".
- Nếu nội dung tham khảo không chứa đủ thông tin để trả lời, hãy nói rõ: "Tôi chưa có thông tin chính xác cho câu hỏi này, bạn vui lòng liên hệ bộ phận tuyển sinh để được hỗ trợ cụ thể hơn."
- Nếu người dùng chỉ gửi lời chào, hãy đáp lại thân thiện.
- KHÔNG sử dụng định dạng Markdown (**in đậm**, *in nghiêng*, `#`...). Chỉ trả về văn bản thuần túy.

Nội dung tham khảo:
{context_block}
{history_block}
Câu hỏi của người dùng: {question}
Câu trả lời:""".strip()

async def ask_gemini(question: str, contexts: list[dict], history: list[dict] = None) -> str:
    prompt = format_prompt(question, contexts, history)

    try:
        response = await client.aio.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                temperature=0.0
            )
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

async def rewrite_question(question: str, history: list[dict]) -> str:
    if not history:
        return question
        
    history_lines = []
    for chat in history[-3:]: 
        history_lines.append(f"Người dùng: {chat['question']}")
        history_lines.append(f"AI: {chat['answer']}")
    history_block = "\n".join(history_lines)
    
    prompt = f"""Dựa vào lịch sử trò chuyện dưới đây, hãy viết lại câu hỏi mới nhất của người dùng thành một câu hỏi hoàn chỉnh, độc lập, rõ nghĩa và chứa đầy đủ chủ ngữ, từ khóa cần thiết (đặc biệt là tên ngành học, trường học, v.v.) để có thể hiểu được mà không cần xem lại lịch sử.
Nếu câu hỏi mới nhất đã rõ nghĩa và độc lập, hãy giữ nguyên câu hỏi đó. Tuyệt đối không tự trả lời câu hỏi, chỉ TRẢ VỀ CÂU HỎI ĐÃ VIẾT LẠI.

Lịch sử trò chuyện:
{history_block}

Câu hỏi mới nhất: {question}

Câu hỏi được viết lại:"""

    try:
        response = await client.aio.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt
        )
        return response.text.strip()
    except Exception as e:
        logger.error(f"Lỗi khi gọi Gemini để rewrite question: {e}")
        return question
