<script setup>

import { ref, nextTick } from 'vue'
import { onMounted, watch } from 'vue'

const newMessage = ref('')
const isAiTyping = ref(false)
const chatContainer = ref(null)
const messages = ref([
  {
    id: 1,
    sender: 'ai',
    text: 'Xin chào! Mình là Chún. Bạn cần mình trợ giúp gì hôm nay? 🧠🔮'
  }
])

// Danh sách các câu hỏi gợi ý cho người dùng
const suggestedPrompts = [
  { icon: '📝', text: 'Viết email xin thực tập Frontend' },
  { icon: '🐛', text: 'Giúp tôi debug lỗi code Vue 3' },
  { icon: '🇬🇧', text: 'Dịch đoạn văn này sang tiếng Anh' },
  { icon: '💡', text: 'Giải thích khái niệm Virtual DOM' }
]

// Hàm xử lý khi người dùng bấm vào 1 ô gợi ý
const usePrompt = (promptText) => {
  // Gán nội dung gợi ý vào ô input của người dùng
  userInput.value = promptText 
  // Gọi luôn hàm gửi tin nhắn 
  sendMessage() 
}

// 1. Khi web vừa mở lên, móc lịch sử chat từ bộ nhớ ra (nếu có)
onMounted(() => {
  const savedChat = localStorage.getItem('chun_chat_history')
  if (savedChat) {
    messages.value = JSON.parse(savedChat)
  }
})

// 2. Tự động lưu lại mỗi khi có tin nhắn mới gửi đi hoặc nhận về
watch(messages, (newMessages) => {
  localStorage.setItem('chun_chat_history', JSON.stringify(newMessages))
}, { deep: true }) // deep: true để Vue theo dõi sâu vào từng phần tử trong mảng

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('✅ Đã copy câu trả lời của Chún!') 
  } catch (err) {
    console.error('Lỗi khi copy: ', err)
  }
}

// HÀM XỬ LÝ CHAT REAL-TIME VỚI AI
const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return

  // Push tin nhắn của User lên màn hình
  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: newMessage.value.trim()
  })

  const userQuery = newMessage.value.trim()
  newMessage.value = ''
  scrollToBottom()

  // Bật hiệu ứng ba chấm đang gõ
  isAiTyping.value = true
  scrollToBottom()

  try {
    // GỬI TIN NHẮN LÊN SERVER BACK-END CỦA NUXT
    const data = await $fetch('/api/chat', {
      method: 'POST',
      body: { message: userQuery }
    })

    isAiTyping.value = false

    // Đẩy câu trả lời THẬT của Gemini vào khung chat
    if (data.text) {
      messages.value.push({
        id: Date.now() + 1,
        sender: 'ai',
        text: data.text
      })
    } else if (data.error) {
      messages.value.push({
        id: Date.now() + 1,
        sender: 'ai',
        text: `❌ Lỗi: ${data.error}`
      })
    }
  } catch (err) {
    isAiTyping.value = false
    messages.value.push({
      id: Date.now() + 1,
      sender: 'ai',
      text: '💥 Có lỗi hệ thống xảy ra khi kết nối đầu não AI!'
    })
  }
  scrollToBottom()
}
    const createNewChat = () => {
    if (confirm('Bạn có chắc chắn muốn xóa cuộc trò chuyện này để bắt đầu chat mới không?')) {
        messages.value = [] 
        localStorage.removeItem('chun_chat_history') 
    }
    }
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
    
    <header class="flex items-center justify-between p-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur shrink-0">
      <div class="flex items-center space-x-3">
        <button @click="navigateTo('/dashboard')" class="p-2 hover:bg-slate-900 rounded-xl text-slate-400 hover:text-white transition active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <div>
          <h2 class="text-sm font-bold tracking-wide flex items-center space-x-2">
            <span>Siêu trợ lý AI</span>
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">Mô hình ngôn ngữ thế hệ mới</p>
        </div>
        <button 
        @click="createNewChat" 
        class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 transition-all shadow-sm"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Chat Mới
        </button>
      </div>
    </header>

    <main ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950/40 scroll-smooth">
  
  <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-[65vh] px-4">
    <div class="w-16 h-16 mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
      <span class="text-3xl">🔮</span>
    </div>
    <h2 class="text-2xl font-bold text-white mb-8 text-center">Xin chào! Chún có thể giúp gì cho bạn?</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
      <button 
        v-for="(prompt, index) in suggestedPrompts" 
        :key="index"
        @click="usePrompt(prompt.text)"
        class="flex items-center gap-3 p-4 text-left border rounded-xl bg-slate-800/50 border-slate-700 hover:border-emerald-500 hover:bg-slate-700/50 transition-all text-slate-300 hover:text-white"
      >
        <span class="text-xl">{{ prompt.icon }}</span>
        <span class="text-sm font-medium">{{ prompt.text }}</span>
      </button>
    </div>
  </div>

  <div 
    v-for="msg in messages" 
    :key="msg.id"
    :class="['flex items-start space-x-3 max-w-[85%]', msg.sender === 'user' ? 'ml-auto justify-end' : '']"
  >
    <div v-if="msg.sender === 'ai'" class="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
      <span class="text-emerald-400 text-xs font-bold">AI</span>
    </div>

    <div class="flex flex-col" :class="msg.sender === 'user' ? 'items-end' : 'items-start'">
      
      <div 
        :class="[
          'p-3.5 text-sm leading-relaxed shadow-sm rounded-2xl',
          msg.sender === 'user' 
            ? 'bg-gradient-to-br from-emerald-400 to-blue-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-emerald-500/5' 
            : 'bg-slate-900 border border-slate-800/80 text-slate-200 rounded-tl-none'
        ]"
      >
        {{ msg.text }}
      </div>

      <button 
        v-if="msg.sender === 'ai'"
        @click="copyToClipboard(msg.text)" 
        class="mt-1.5 ml-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        Copy
      </button>

    </div>
  </div>

  <div v-if="isAiTyping" class="flex items-start space-x-3 max-w-[85%]">
    <div class="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
      <span class="text-emerald-400 text-xs font-bold">AI</span>
    </div>
    <div class="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl rounded-tl-none flex items-center space-x-1.5 text-slate-400 min-h-[44px]">
      <span class="w-2 h-2 bg-emerald-400/80 rounded-full animate-bounce [animation-duration:0.6s]"></span>
      <span class="w-2 h-2 bg-emerald-400/80 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></span>
      <span class="w-2 h-2 bg-emerald-400/80 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></span>
    </div>
  </div>

</main>

    <footer class="p-4 border-t border-slate-900 bg-slate-950 shrink-0">
      <div class="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-2xl p-2 pl-4 focus-within:border-emerald-500/40 focus-within:ring-1 focus-within:ring-emerald-500/40 transition-all duration-200">
        <input 
          v-model="newMessage"
          @keydown.enter="handleSendMessage"
          type="text" 
          placeholder="Nhập câu hỏi của bạn tại đây..." 
          class="flex-1 bg-transparent border-none outline-none text-sm text-slate-100 placeholder-slate-500 py-1"
        />
        <button 
          @click="handleSendMessage"
          class="p-2.5 bg-emerald-400 text-slate-950 rounded-xl font-bold hover:opacity-90 active:scale-95 transition flex items-center justify-center shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </footer>

  </div>
</template>