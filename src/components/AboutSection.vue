<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
})

defineEmits(['close'])
</script>

<template>
  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-5"
      @click.self="$emit('close')"
    >
      <!-- Modal -->
      <transition name="content">
        <div
          v-if="isOpen"
          class="relative max-w-md w-full rounded-2xl overflow-hidden"
          style="background: linear-gradient(160deg, rgba(22,18,38,0.98) 0%, rgba(10,8,20,0.98) 100%); border: 1px solid rgba(255,255,255,0.07);"
        >
          <!-- Tutup -->
          <button
            class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
                   border border-white/10 text-white/30 hover:text-white/70
                   hover:border-white/20 transition-all duration-200 z-10"
            @click="$emit('close')"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- Konten -->
          <div class="px-8 py-10">
            <!-- Nama -->
            <p class="text-[10px] uppercase tracking-[0.4em] text-purple-400/50 mb-3">tentang penulis</p>
            <h2 class="font-serif text-3xl text-white/90 mb-1">Ashen Reverie</h2>
            <p class="text-sm text-white/25 tracking-wider font-serif italic mb-8">
              Aditya Fhaturohman
            </p>

            <!-- Divider -->
            <div class="w-8 h-px bg-white/10 mb-8" />

            <!-- Bio -->
            <div class="space-y-4 text-white/55 text-sm leading-relaxed font-light">
              <p>
                Menulis adalah cara saya memahami hal-hal yang terlalu besar untuk diucapkan —
                luka yang belum sembuh, ketenangan yang datang terlambat, dan semua yang berada
                di antaranya.
              </p>
              <p>
                Saya percaya bahwa abu bukan akhir. Ia adalah sesuatu yang tertinggal
                setelah sesuatu yang pernah menyala.
              </p>
              <p class="font-serif italic text-white/35">
                "Grey isn't confusion — it's where I stand between scars and hope."
              </p>
            </div>

            <!-- Divider bawah -->
            <div class="mt-10 pt-6" style="border-top: 1px solid rgba(255,255,255,0.05);">
              <p class="text-[11px] text-white/20 text-center tracking-widest uppercase">
                karya tulis · 2024–sekarang
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
