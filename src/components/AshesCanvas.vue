<script setup>
import { ref } from 'vue'
import { useAshes } from '../composables/useAshes.js'

const canvasRef = ref(null)
useAshes(canvasRef)
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 -z-10 pointer-events-none" />
</template>
