<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <transition name="toast">
    <div
      v-if="isVisible"
      class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]
             px-5 py-3 rounded-full text-sm text-white/90
             bg-white/10 border border-white/20 backdrop-blur-md
             shadow-xl shadow-black/30 flex items-center gap-2"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {{ message }}
    </div>
  </transition>
</template>
