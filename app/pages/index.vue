<script setup>
import { onMounted } from 'vue'

// Sau khi màn hình hiển thị được 3 giây (3000ms), tự động chuyển sang trang /onboarding
onMounted(() => {
  setTimeout(() => {
    navigateTo('/onboarding')
  }, 3000)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-slate-950 text-white relative overflow-hidden">
    <div class="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -top-10 -left-10"></div>
    <div class="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -bottom-10 -right-10"></div>

    <div class="flex flex-col items-center z-10 space-y-6">
      <div class="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400">
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M9 13h.01" />
          <path d="M15 13h.01" />
          <path d="M9 17h6" />
        </svg>
      </div>

      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold tracking-wider bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          UX AI CHATBOT
        </h1>
        <p class="text-sm text-slate-400 font-light">Tương lai trong tầm tay bạn</p>
      </div>
    </div>

    <div class="absolute bottom-12 flex items-center space-y-2 flex-col">
      <div class="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
      <span class="text-xs text-slate-500 tracking-widest">ĐANG TẢI...</span>
    </div>
  </div>
</template>