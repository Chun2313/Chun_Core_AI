import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  try {
    // 1. Đọc tin nhắn từ Front-end gửi lên
    const body = await readBody(event)
    const userMessage = body.message

    if (!userMessage) {
      return { error: 'Tin nhắn không được để trống bạn ơi!' }
    }

    // 2. Lấy API Key từ file .env
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return { error: 'Chưa tìm thấy GEMINI_API_KEY. Hãy kiểm tra lại file .env tại thư mục gốc nhé!' }
    }

    // 3. Khởi tạo bộ não Gemini thông qua tên Class chính thức: GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(apiKey)
    
    // Lấy model gemini-2.5-flash cực nhanh
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    // Gọi lệnh tạo nội dung
    const result = await model.generateContent(userMessage)
    const response = await result.response
    const text = response.text()

    // 4. Trả kết quả chữ về cho Front-end
    return { text: text }

  } catch (error: any) {
    console.error('Lỗi chi tiết từ Server:', error)
    return { error: error.message || 'Lỗi kết nối bộ não AI bên trong hệ thống.' }
  }
})