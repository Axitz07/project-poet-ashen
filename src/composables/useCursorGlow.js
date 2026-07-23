import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Cursor glow effect — mengikuti posisi mouse
 */
export function useCursorGlow() {
  const x = ref(-200)
  const y = ref(-200)
  const isVisible = ref(false)

  function onMouseMove(e) {
    x.value = e.clientX
    y.value = e.clientY
    isVisible.value = true
  }

  function onMouseLeave() {
    isVisible.value = false
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseleave', onMouseLeave)
  })

  return { x, y, isVisible }
}
