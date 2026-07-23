<script setup>
defineProps({
  /** Nama penulis */
  author: {
    type: String,
    default: 'Ashen Reverie',
  },
})
</script>

<template>
  <footer class="text-center py-8 px-5 border-t border-white/5">
    <p class="font-serif italic text-white/20 text-sm">
      {{ author }}
    </p>
    <p class="text-white/10 text-xs mt-1 tracking-widest uppercase">
      — karya tulis —
    </p>
  </footer>
</template>
