<script setup>
import { ref, computed } from 'vue'
import { contents } from '../data/contents.js'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  activeId: { type: Number, default: null },
})

const emit = defineEmits(['close', 'select'])

const filter = ref('all')
const hoveredId = ref(null)

const filtered = computed(() => {
  if (filter.value === 'all') return contents
  return contents.filter(c => c.type === filter.value)
})

const poems = computed(() => contents.filter(c => c.type === 'poem').length)
const stories = computed(() => contents.filter(c => c.type === 'story').length)

/** Preview 80 karakter pertama */
function preview(body) {
  const cleaned = body.replace(/\n/g, ' ')
  return cleaned.length > 80 ? cleaned.substring(0, 80) + '…' : cleaned
}

function select(item) {
  emit('select', item)
  emit('close')
}
</script>

<template>
  <!-- Overlay blur -->
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      @click="$emit('close')"
    />
  </transition>

  <!-- Panel -->
  <transition name="panel-slide">
    <aside
      v-if="isOpen"
      class="fixed top-0 right-0 z-50 h-full w-80 flex flex-col"
      style="background: linear-gradient(180deg, rgba(18,15,32,0.98) 0%, rgba(10,8,20,0.98) 100%); border-left: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(24px);"
    >
      <!-- Header -->
      <div class="px-6 pt-6 pb-4">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-serif text-lg text-white/90">Perpustakaan</h3>
            <p class="text-[11px] text-white/25 mt-0.5">
              {{ poems }} puisi · {{ stories }} cerita
            </p>
          </div>
          <button
            class="w-8 h-8 rounded-full flex items-center justify-center
                   border border-white/10 text-white/30 hover:text-white/70
                   hover:border-white/20 transition-all duration-200"
            @click="$emit('close')"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Filter tabs -->
        <div class="flex gap-1 p-1 rounded-full" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
          <button
            v-for="tab in [{ key: 'all', label: 'Semua' }, { key: 'poem', label: 'Puisi' }, { key: 'story', label: 'Cerita' }]"
            :key="tab.key"
            class="flex-1 py-1.5 rounded-full text-[11px] tracking-wider transition-all duration-200"
            :class="filter === tab.key
              ? 'bg-white/10 text-white/80 border border-white/10'
              : 'text-white/30 hover:text-white/60'"
            @click="filter = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Daftar karya -->
      <ul class="flex-1 overflow-y-auto px-3 pb-3 space-y-1" style="scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent;">
        <li
          v-for="item in filtered"
          :key="item.id"
          @mouseenter="hoveredId = item.id"
          @mouseleave="hoveredId = null"
        >
          <button
            class="w-full text-left px-4 py-3.5 rounded-xl transition-all duration-250 relative overflow-hidden group"
            :class="activeId === item.id
              ? 'border border-purple-500/20 bg-purple-500/8'
              : 'border border-transparent hover:border-white/8 hover:bg-white/[0.035]'"
            @click="select(item)"
          >
            <!-- Active indicator -->
            <div
              v-if="activeId === item.id"
              class="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-purple-400/60"
            />

            <div class="flex items-start justify-between gap-2 mb-1.5">
              <span
                class="font-serif text-sm leading-snug transition-colors duration-200"
                :class="activeId === item.id
                  ? 'text-purple-200/90'
                  : 'text-white/60 group-hover:text-white/85'"
              >
                {{ item.title }}
              </span>
              <span
                class="text-[9px] uppercase tracking-widest shrink-0 mt-0.5 px-1.5 py-0.5 rounded"
                :class="item.type === 'poem'
                  ? 'text-purple-400/50 bg-purple-500/8'
                  : 'text-blue-400/50 bg-blue-500/8'"
              >
                {{ item.type === 'poem' ? 'puisi' : 'cerita' }}
              </span>
            </div>

            <!-- Preview teks -->
            <p
              class="text-[11px] leading-relaxed transition-all duration-300"
              :class="hoveredId === item.id ? 'text-white/30 max-h-8' : 'text-white/15 max-h-4 overflow-hidden'"
            >
              {{ preview(item.body) }}
            </p>
          </button>
        </li>
      </ul>

      <!-- Footer -->
      <div class="px-6 py-4" style="border-top: 1px solid rgba(255,255,255,0.04);">
        <p class="text-[10px] text-white/15 text-center font-serif italic tracking-wider">
          Ashen Reverie · karya tulis
        </p>
      </div>
    </aside>
  </transition>
</template>
