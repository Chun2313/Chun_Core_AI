<script setup>
const goToDashboard = () => {
  navigateTo('/dashboard')
}
</script>
<template>
  <div class="flex flex-col items-center justify-between h-screen bg-slate-950 text-white p-6 relative overflow-hidden">
    <div class="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -top-20 -right-20"></div>

    <div class="w-full flex justify-end pt-4">
      <button class="text-sm text-slate-400 hover:text-white transition">Bỏ qua</button>
    </div>

    <div class="flex flex-col items-center text-center max-w-sm space-y-8 z-10">
      <div class="w-48 h-48 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-full flex items-center justify-center p-1 shadow-2xl animate-bounce">
        <div class="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
      </div>

      <div class="space-y-3">
        <h2 class="text-2xl font-bold tracking-tight">Trò chuyện thông minh cùng AI</h2>
        <p class="text-sm text-slate-400 leading-relaxed">
          Trải nghiệm trợ lý ảo thế hệ mới, giải đáp mọi thắc mắc và hỗ trợ công việc của bạn chỉ trong vài giây.
          </p>
      </div>

      <div class="flex space-x-2">
        <div class="w-6 h-2 bg-emerald-400 rounded-full"></div>
        <div class="w-2 h-2 bg-slate-700 rounded-full"></div>
        <div class="w-2 h-2 bg-slate-700 rounded-full"></div>
      </div>
    </div>

    <div class="w-full max-w-sm pb-8 z-10">
      <button @click="goToDashboard" class="w-full py-4 bg-gradient-to-r from-emerald-400 to-blue-500 text-slate-950 font-semibold rounded-2xl shadow-lg shadow-emerald-500/20 hover:opacity-90 active:scale-95 transition-all text-center">
    Tiếp theo
      </button>
    </div>
  </div>
</template>