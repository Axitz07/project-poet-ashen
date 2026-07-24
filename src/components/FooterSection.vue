<script setup>
defineEmits(['open-about'])
</script>

<template>
  <footer class="text-center py-8 px-5" style="border-top: 1px solid rgba(255,255,255,0.04);">
    <p class="font-serif italic text-white/20 text-sm mb-2">Ashen Reverie</p>
    <p class="text-white/10 text-xs tracking-widest uppercase mb-4">— karya tulis —</p>
    <button
      class="text-[11px] text-white/15 hover:text-white/35 transition-colors duration-200 tracking-wider"
      @click="$emit('open-about')"
    >
      tentang penulis
    </button>
  </footer>
</template>
