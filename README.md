# 🔮 Chún Al Core - Siêu Trợ Lý Chatbot AI Generation Next

<div align="center">
  <img src="https://img.shields.io/badge/Nuxt-4.x-emerald?style=for-the-badge&logo=nuxt.js&logoColor=white" alt="Nuxt 4" />
  <img src="https://img.shields.io/badge/Vue-3.x-emerald?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Google-Gemini_Flash-purple?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini">
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

<br />

**Chún** là một ứng dụng Web Chatbot thông minh, được xây dựng trên nền tảng **Nuxt 4** (Nitro Engine), kết hợp với giao diện **Tailwind CSS** phong cách tối tân (Cyberpunk Dark Mode) và được trang bị "bộ não" tối tân **Google Gemini AI (`gemini-3.1-Thinking`)**. 

Dự án sở hữu trải nghiệm người dùng (UX/UI) mượt mà với hiệu ứng gõ phím real-time, cấu trúc API Server an toàn, bảo mật tuyệt đối mã khóa API.

---

## ✨ Tính Năng Nổi Bật

- 🧠 **Đầu não Google Gemini:** Tích hợp trực tiếp với SDK chính thức của Google, xử lý ngôn ngữ tự nhiên, trả lời thông minh, đa ngữ cảnh.
- 🎨 **Giao diện Cyberpunk Dark Mode:** Thiết kế UI/UX đỉnh cao với tone màu Slate đen sâu kết hợp viền Neon Emerald tràn đầy năng lượng tương lai.
- ⚡ **Phản hồi Real-time sinh động:** Hiệu ứng bong bóng chat nhấp nháy ba chấm (`animate-bounce`) mang lại cảm giác AI đang suy nghĩ thực tế.
- 🔒 **Bảo mật Server-side:** Toàn bộ request gọi lên Google được xử lý ẩn danh qua tầng Server API (`server/api/chat.post.ts`) của Nuxt 4. Không lộ `GEMINI_API_KEY` ở Front-end.
- 📱 **Responsive 100%:** Hiển thị hoàn hảo trên mọi thiết bị từ Desktop, Máy tính bảng đến Điện thoại di động.

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework:** Nuxt 4 (Bản phát hành thế hệ mới nhất với cấu trúc thư mục `app/` tinh gọn).
- **Trình biên dịch & Bundler:** Vite & Nitro Engine.
- **Style:** Tailwind CSS (Tận dụng tối đa các class tiện ích cùng hiệu ứng backdrop-blur nghệ thuật).
- **AI Core:** `@google/generative-ai` SDK (Model `gemini-3.1-thinking`).

---

## 📂 Cấu Trúc Thư Mục Dự Án

ux-ai-chatbot/
├── .nuxt/                  # Thư mục build tự động của Nuxt
├── app/                    # Tầng giao diện người dùng (Front-end)
│   ├── assets/
│   │   └── css/
│   │       └── main.css    # Cấu hình Tailwind CSS toàn cục
│   ├── pages/
│   │   ├── index.vue       # Màn hình Splash chào mừng người dùng
│   │   ├── onboarding.vue  # Màn hình giới thiệu tính năng
│   │   ├── dashboard.vue   # Màn hình bảng điều khiển / Chọn trợ lý
│   │   └── chat.vue        # Phòng chat real-time với Trợ lý Chún
│   └── app.vue             # File layout gốc của ứng dụng
├── server/                 # Tầng xử lý Logic Bảo Mật (Back-end)
│   └── api/
│       └── chat.post.ts    # API Endpoint nhận message, gọi Google Gemini SDK
├── .env                    # Nơi lưu trữ GEMINI_API_KEY bảo mật (Bị gitignore bỏ qua)
├── .gitignore              # Chặn các thư mục node_modules, .env đẩy lên GitHub
├── nuxt.config.ts          # File cấu hình lõi của Nuxt 4
├── tailwind.config.js      # File tinh chỉnh Theme & Màu sắc của Tailwind
└── package.json            # Quản lý các thư viện cài đặt


## 🚀 Hướng Dẫn Cài Đặt và Chạy Local

## Để khởi chạy phòng chat của Chún trên máy tính cá nhân của bạn, hãy làm theo các bước sau:
1. Clone dự án và truy cập thư mục
cd ux-ai-chatbot
2. Cài đặt các thư viện phụ thuộc (Dependencies)
npm install
3. Cấu hình biến môi trường bảo mật
GEMINI_API_KEY=MÃ_API_KEY_GEMINI_CỦA_BẠN
4. Khởi chạy Server ở môi trường Phát triển (Development)
npm run dev
Bây giờ, mở trình duyệt của bạn và truy cập: http://localhost:3000 để trải nghiệm trò chuyện cùng Chún!

# 🔒 Cơ Chế Bảo Mật API Toàn Diện
File .env chứa API Key độc quyền của bạn đã được khai báo trong .gitignore để không bao giờ bị dính khi git push lên kho mã nguồn mở.

Quá trình giao tiếp với Google được đóng gói hoàn chỉnh bằng phương thức POST nội bộ:

TypeScript
// Front-end gửi tin nhắn lên Server của chính mình:
const data = await $fetch('/api/chat', { method: 'POST', body: { message: userQuery } })
Điều này khiến hacker hoặc người dùng thông thường khi F12 trình duyệt lên sẽ chỉ nhìn thấy request nội bộ, hoàn toàn không thấy token bí mật của Google.

# 📝 Giấy Phép (License)
Dự án được phân phối dưới giấy phép MIT License. Bạn hoàn toàn có thể tự do sao chép, chỉnh sửa cấu trúc UI/UX và tích hợp thêm các tính năng nâng cao cho mục đích cá nhân hoặc thương mại.

with open("README.md", "w", encoding="utf-8") as f:
f.write(final_readme)
print("SUCCESS")

