<script setup>
defineProps({
  isPlaying:  { type: Boolean, default: false },
  isTyping:   { type: Boolean, default: false },
  progress:   { type: Number,  default: 0 },
  activeType: { type: String,  default: 'poem' },
})

defineEmits(['toggle-sound', 'toggle-panel', 'toggle-about', 'share'])
</script>

<template>
  <header class="fixed top-5 right-5 z-50 flex items-center gap-2">
    <!-- Sound toggle -->
    <button class="glass-pill" :title="isPlaying ? 'Matikan musik' : 'Putar musik'" @click="$emit('toggle-sound')">
      <svg v-if="!isPlaying" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
      </svg>
      <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    </button>

    <!-- Share -->
    <button class="glass-pill" title="Salin link" @click="$emit('share')">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    </button>

    <!-- About -->
    <button class="glass-pill" title="Tentang penulis" @click="$emit('toggle-about')">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    </button>

    <!-- Library toggle -->
    <button class="glass-pill gap-1.5" title="Lihat semua karya" @click="$emit('toggle-panel')">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
      <span class="text-xs tracking-wider">Karya</span>
    </button>
  </header>

  <!-- Progress bar typewriter (fixed top) -->
  <transition name="fade">
    <div v-if="isTyping" class="fixed top-0 left-0 right-0 z-40 progress-track">
      <div class="progress-fill" :style="{ width: `${progress}%` }" />
    </div>
  </transition>
</template>
