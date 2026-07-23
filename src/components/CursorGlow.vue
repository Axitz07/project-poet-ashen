<script setup>
import { computed } from 'vue'
import { useCursorGlow } from '../composables/useCursorGlow.js'

const { x, y, isVisible } = useCursorGlow()

const dotStyle = computed(() => ({
  left: `${x.value}px`,
  top: `${y.value}px`,
  opacity: isVisible.value ? 1 : 0,
}))

const glowStyle = computed(() => ({
  left: `${x.value}px`,
  top: `${y.value}px`,
  opacity: isVisible.value ? 1 : 0,
}))
</script>

<template>
  <!-- Cursor dot -->
  <div class="cursor-dot" :style="dotStyle" />
  <!-- Cursor glow halo -->
  <div class="cursor-glow" :style="glowStyle" />
</template>
