<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  content: {
    type: Object,
    default: null,
  },
  displayedText: {
    type: String,
    default: '',
  },
  isTyping: {
    type: Boolean,
    default: false,
  },
  activeType: {
    type: String,
    default: 'poem',
  },
  /** Progress 0–100 */
  progress: {
    type: Number,
    default: 0,
  },
})

defineEmits(['random-poem', 'random-story', 'random-current'])

const isReading = computed(() => props.content !== null)

/** Pecah teks ke baris */
const lines = computed(() => {
  if (!props.displayedText) return []
  return props.displayedText.split('\n')
})

/** Kata count untuk metadata */
const wordCount = computed(() => {
  if (!props.content) return 0
  return props.content.body.split(/\s+/).length
})
</script>

<template>
  <main
    class="max-w-2xl mx-auto px-5 text-center flex-1 flex flex-col justify-center transition-all duration-700 ease-out"
    :class="isReading ? 'pt-16 pb-10' : 'pt-24 pb-10'"
  >
    <transition name="hero" mode="out-in">
      <!-- ── Hero state ──────────────────────────────────── -->
      <div v-if="!isReading" key="hero">
        <!-- Judul dengan glitch effect -->
        <div class="mb-4">
          <h1
            class="glitch font-serif text-6xl sm:text-7xl font-semibold tracking-wide"
            data-text="Ashen Reverie"
          >
            Ashen Reverie
          </h1>
        </div>

        <!-- Subtitle -->
        <p class="font-serif italic text-white/30 text-base tracking-wide mb-3">
          ruang hening untuk puisi &amp; cerita
        </p>
        <p class="font-serif italic text-purple-300/40 text-sm tracking-wider mb-14 subtitle-blink">
          Grey isn't confusion—it's where I stand between scars and hope
        </p>

        <!-- Divider ornamen -->
        <div class="ornament-line max-w-xs mx-auto mb-10">
          <span class="text-xs text-white/15 tracking-[0.3em] uppercase">mulai membaca</span>
        </div>

        <!-- CTA buttons dengan stagger -->
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

        <!-- Hint scroll -->
        <div class="mt-16 flex flex-col items-center gap-2 opacity-20">
          <div class="w-px h-8 bg-white/40 animate-pulse" />
          <span class="text-[10px] uppercase tracking-[0.4em] text-white/50">scroll</span>
        </div>
      </div>

      <!-- ── Reading state ───────────────────────────────── -->
      <div v-else key="reading" class="text-left max-w-xl mx-auto w-full">
        <!-- Label tipe -->
        <div class="flex items-center gap-3 mb-6">
          <span
            class="text-[10px] uppercase tracking-[0.35em] font-medium px-3 py-1 rounded-full border"
            :class="content.type === 'poem'
              ? 'text-purple-400/70 border-purple-500/20 bg-purple-500/5'
              : 'text-blue-400/70 border-blue-500/20 bg-blue-500/5'"
          >
            {{ content.type === 'poem' ? '✦ puisi' : '✍ cerita' }}
          </span>
          <span class="text-[10px] text-white/15 tracking-wider">
            {{ wordCount }} kata
          </span>
        </div>

        <!-- Judul karya -->
        <h2 class="font-serif text-3xl sm:text-4xl text-white/95 mb-8 leading-snug">
          {{ content.title }}
        </h2>

        <!-- Divider -->
        <div class="ornament-line mb-8">
          <span class="text-[10px] text-white/10 tracking-[0.4em]">✦</span>
        </div>

        <!-- Isi karya dengan typewriter -->
        <div
          class="leading-loose text-lg text-white/70 font-light min-h-52 whitespace-pre-line relative"
          :class="{ 'typewriter-cursor': isTyping }"
        >
          <template v-for="(line, i) in lines" :key="i">
            <span>{{ line }}</span>
            <br v-if="i < lines.length - 1" />
          </template>
        </div>

        <!-- Tombol aksi setelah selesai -->
        <transition name="content">
          <div v-if="!isTyping && displayedText" class="mt-12">
            <div class="ornament-line mb-8">
              <span class="text-[10px] text-white/10 tracking-[0.4em]">— selesai —</span>
            </div>
            <div class="flex gap-3 justify-center flex-wrap">
              <button class="btn-ghost stagger-item" style="animation-delay: 0.05s" @click="$emit('random-current')">
                ↻ Lainnya
              </button>
              <button class="btn-ghost stagger-item" style="animation-delay: 0.15s" @click="$emit('random-poem')">
                Puisi
              </button>
              <button class="btn-ghost stagger-item" style="animation-delay: 0.25s" @click="$emit('random-story')">
                Cerita
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </main>
</template>
