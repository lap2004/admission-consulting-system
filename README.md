# Chatbot NCKH Frontend

Dự án Frontend cho hệ thống Chatbot Tư vấn Tuyển sinh và Hỗ trợ Sinh viên. 
Được xây dựng trên nền tảng **Next.js (App Router)** kết hợp với **Material-UI (MUI)** mang đến trải nghiệm người dùng hiện đại, mượt mà và tương thích tốt trên nhiều thiết bị.

## 🚀 Công nghệ sử dụng
- **Framework:** Next.js 14+ (App Router)
- **Ngôn ngữ:** TypeScript
- **UI Library:** Material-UI (MUI) v5
- **Animation:** Framer Motion
- **State Management & Fetching:** React Hooks (Custom Hooks), Axios
- **Authentication:** JWT (Lưu trữ qua Cookies)
- **Styling:** Emotion (CSS-in-JS chuẩn của MUI)

---

## 📂 Cấu trúc thư mục

Dự án tuân thủ cấu trúc thư mục của Next.js App Router:

```text
├── public/                 # Các tài nguyên tĩnh (Hình ảnh, Video, Favicon,...)
├── src/
│   ├── app/                # Chứa các route của ứng dụng (App Router)
│   │   ├── (admin)/        # Giao diện dành riêng cho Admin (Dashboard, Quản lý User/Database)
│   │   ├── (user)/         # Giao diện người dùng đã đăng nhập (Home, Profile)
│   │   ├── tu-van/         # Trang Chatbot chính (Giao diện nhắn tin)
│   │   ├── login/          # Trang đăng nhập
│   │   ├── register/       # Trang đăng ký
│   │   ├── forgot-password/# Trang quên mật khẩu
│   │   └── globals.css     # CSS toàn cục
│   ├── components/         # Các UI component dùng chung
│   │   ├── ChatComponent.tsx # Component khung chat chính (tích hợp Sidebar lịch sử)
│   │   ├── Header.tsx, Footer.tsx
│   │   └── layout/         # Layout riêng cho Admin và User
│   ├── config/             # Các cấu hình chung (Constants)
│   ├── lib/                # Cấu hình thư viện (Axios Interceptors, Helpers)
│   ├── services/           # Lớp gọi API (Giao tiếp với Backend)
│   │   ├── apis/           # Khai báo các endpoint (auth.ts, chat.ts, user.ts)
│   │   └── hooks/          # Custom hooks để fetch data (useGetAPI, usePostAPI, useChatStudent,...)
│   ├── utils/              # Các hàm tiện ích bổ trợ
│   └── middleware.ts       # Middleware kiểm tra phân quyền và chặn route (Next.js Middleware)
├── .env                    # Biến môi trường
├── package.json            # Danh sách dependencies
└── README.md               # Tài liệu dự án (File này)
```

---

## 🛠 Hướng dẫn Cài đặt & Khởi chạy

### 1. Yêu cầu hệ thống
- **Node.js:** v18.x trở lên
- **NPM / Yarn / pnpm**

### 2. Cài đặt thư viện
Mở terminal tại thư mục gốc của project frontend và chạy:
```bash
npm install
# hoặc
yarn install
```

### 3. Cấu hình biến môi trường (`.env`)
Tạo file `.env` ở thư mục gốc của project (nếu chưa có) để trỏ API về Backend:
```env
NEXT_PUBLIC_API_BACKEND_DOMAIN=http://127.0.0.1:8000
# Hoặc thay bằng domain public nếu đã deploy backend
```

### 4. Khởi chạy Server Development
```bash
npm run dev
# hoặc
yarn dev
```
Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

### 5. Build cho Production
Khi cần triển khai (Deploy) lên server thực tế (Vercel, VPS...):
```bash
npm run build
npm run start
```

---

## ✨ Các tính năng chính (Features)

1. **Hệ thống Chatbot RAG:**
   - Nhắn tin theo thời gian thực với trợ lý ảo.
   - Hỗ trợ xem lại **Lịch sử cuộc trò chuyện (Chat History)** thông qua Sidebar tiện lợi. Tự động nhóm tin nhắn theo Session.
2. **Xác thực và Phân quyền (Auth/Role-based):**
   - Đăng ký, Đăng nhập, Quên mật khẩu.
   - Middlewares bảo vệ các route nhạy cảm. Phân tách rõ ràng luồng người dùng (Khách, Sinh viên, Admin).
3. **Admin Dashboard:**
   - Quản lý danh sách người dùng.
   - Quản trị cơ sở dữ liệu Vector (cho pipeline RAG).
4. **Giao diện hiện đại (Responsive):**
   - Tối ưu hóa trên đa thiết bị (Mobile/Tablet/PC).
   - Tích hợp các hiệu ứng chuyển động mượt mà bằng Framer Motion.