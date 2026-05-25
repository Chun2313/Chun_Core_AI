<script setup>
import { ref, nextTick } from 'vue'

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

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
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
      </div>
    </header>

    <main ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950/40 scroll-smooth">
      
      <div 
        v-for="msg in messages" 
        :key="msg.id"
        :class="['flex items-start space-x-3 max-w-[85%]', msg.sender === 'user' ? 'ml-auto justify-end' : '']"
      >
        <div v-if="msg.sender === 'ai'" class="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
          <span class="text-emerald-400 text-xs font-bold">AI</span>
        </div>

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