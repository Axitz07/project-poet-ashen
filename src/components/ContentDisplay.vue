<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  content:       { type: Object,  default: null },
  displayedText: { type: String,  default: '' },
  isTyping:      { type: Boolean, default: false },
  activeType:    { type: String,  default: 'poem' },
  progress:      { type: Number,  default: 0 },
  isFullscreen:  { type: Boolean, default: false },
})

const emit = defineEmits([
  'random-poem', 'random-story', 'random-current',
  'skip-typing', 'toggle-fullscreen',
])

const isReading = computed(() => props.content !== null)

const lines = computed(() => {
  if (!props.displayedText) return []
  return props.displayedText.split('\n')
})

const wordCount = computed(() => {
  if (!props.content) return 0
  return props.content.body.split(/\s+/).length
})

/** Skip typewriter — tampilkan semua teks langsung */
function handleSkip() {
  if (props.isTyping) emit('skip-typing')
}
</script>

<template>
  <main
    class="max-w-2xl mx-auto px-5 text-center flex-1 flex flex-col justify-center transition-all duration-700 ease-out"
    :class="isReading ? 'pt-16 pb-10' : 'pt-24 pb-10'"
  >
    <transition name="hero" mode="out-in">

      <!-- ── Hero state ──────────────────────────────────── -->
      <div v-if="!isReading" key="hero">
        <div class="mb-4">
          <h1
            class="glitch font-serif text-6xl sm:text-7xl font-semibold tracking-wide"
            data-text="Ashen Reverie"
          >
            Ashen Reverie
          </h1>
        </div>

        <p class="font-serif italic text-white/30 text-base tracking-wide mb-3">
          ruang hening untuk puisi &amp; cerita
        </p>
        <p class="font-serif italic text-purple-300/40 text-sm tracking-wider mb-14 subtitle-blink">
          Grey isn't confusion—it's where I stand between scars and hope
        </p>

        <div class="ornament-line max-w-xs mx-auto mb-10">
          <span class="text-xs text-white/15 tracking-[0.3em] uppercase">mulai membaca</span>
        </div>

        <div class="flex gap-4 justify-center flex-wrap">
          <button
            class="btn-ghost stagger-item"
            style="animation-delay: 0.1s"
            :class="{ 'btn-active': activeType === 'poem' }"
            @click="$emit('random-poem')"
          >
            ✦ Puisi
          </button>
          <button
            class="btn-ghost stagger-item"
            style="animation-delay: 0.22s"
            :class="{ 'btn-active': activeType === 'story' }"
            @click="$emit('random-story')"
          >
            ✦ Cerita
          </button>
        </div>

        <!-- Keyboard hints -->
        <div class="mt-12 flex items-center justify-center gap-3 flex-wrap">
          <span class="kbd-hint">P puisi</span>
          <span class="kbd-hint">C cerita</span>
          <span class="kbd-hint">L library</span>
        </div>

        <div class="mt-8 flex flex-col items-center gap-2 opacity-20">
          <div class="w-px h-8 bg-white/40 animate-pulse" />
          <span class="text-[10px] uppercase tracking-[0.4em] text-white/50">scroll</span>
        </div>
      </div>

      <!-- ── Reading state ───────────────────────────────── -->
      <div v-else key="reading" class="text-left max-w-xl mx-auto w-full">
        <!-- Label + metadata -->
        <div class="flex items-center justify-between gap-3 mb-6">
          <div class="flex items-center gap-3">
            <span
              class="text-[10px] uppercase tracking-[0.35em] font-medium px-3 py-1 rounded-full border"
              :class="content.type === 'poem'
                ? 'text-purple-400/70 border-purple-500/20 bg-purple-500/5'
                : 'text-blue-400/70 border-blue-500/20 bg-blue-500/5'"
            >
              {{ content.type === 'poem' ? '✦ puisi' : '✍ cerita' }}
            </span>
            <span class="text-[10px] text-white/15 tracking-wider">{{ wordCount }} kata</span>
          </div>

          <!-- Fullscreen toggle -->
          <button
            class="glass-pill !px-2.5 !py-1.5"
            :title="isFullscreen ? 'Keluar fullscreen (F)' : 'Fullscreen (F)'"
            @click="$emit('toggle-fullscreen')"
          >
            <svg v-if="!isFullscreen" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
            <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>
              <line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>
            </svg>
          </button>
        </div>

        <!-- Judul karya -->
        <h2 class="font-serif text-3xl sm:text-4xl text-white/95 mb-8 leading-snug">
          {{ content.title }}
        </h2>

        <div class="ornament-line mb-8">
          <span class="text-[10px] text-white/10 tracking-[0.4em]">✦</span>
        </div>

        <!-- Isi karya + skip on click -->
        <div
          class="leading-loose text-lg text-white/70 font-light min-h-52 whitespace-pre-line relative"
          :class="{ 'typewriter-cursor': isTyping }"
          @click="handleSkip"
        >
          <template v-for="(line, i) in lines" :key="i">
            <span>{{ line }}</span>
            <br v-if="i < lines.length - 1" />
          </template>
        </div>

        <!-- Skip hint saat typewriter berjalan -->
        <transition name="skip-hint">
          <p v-if="isTyping" class="text-[11px] text-white/20 mt-4 text-center tracking-wider">
            klik atau tekan <span class="kbd-hint">Esc</span> untuk skip
          </p>
        </transition>

        <!-- Keyboard hints saat selesai baca -->
        <transition name="content">
          <div v-if="!isTyping && displayedText" class="mt-12">
            <div class="ornament-line mb-8">
              <span class="text-[10px] text-white/10 tracking-[0.4em]">— selesai —</span>
            </div>
            <div class="flex gap-3 justify-center flex-wrap mb-6">
              <button class="btn-ghost stagger-item" style="animation-delay: 0.05s" @click="$emit('random-current')">↻ Lainnya</button>
              <button class="btn-ghost stagger-item" style="animation-delay: 0.15s" @click="$emit('random-poem')">Puisi</button>
              <button class="btn-ghost stagger-item" style="animation-delay: 0.25s" @click="$emit('random-story')">Cerita</button>
            </div>
            <div class="flex items-center justify-center gap-2 flex-wrap">
              <span class="kbd-hint">Space / → lainnya</span>
              <span class="kbd-hint">P puisi</span>
              <span class="kbd-hint">C cerita</span>
              <span class="kbd-hint">F fullscreen</span>
            </div>
          </div>
        </transition>
      </div>

    </transition>
  </main>
</template>
