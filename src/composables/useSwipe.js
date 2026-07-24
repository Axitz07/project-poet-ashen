import { onMounted, onUnmounted } from 'vue'

/**
 * Swipe gesture composable — deteksi swipe horizontal & vertikal
 * @param {{ onLeft?, onRight?, onUp?, onDown?, threshold? }} handlers
 */
export function useSwipe(handlers) {
  const { onLeft, onRight, onUp, onDown, threshold = 50 } = handlers

  let startX = 0
  let startY = 0
  let startTime = 0

  function onTouchStart(e) {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
    startTime = Date.now()
  }

  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - startX
    const dy = e.changedTouches[0].clientY - startY
    const dt = Date.now() - startTime

    // Abaikan kalau terlalu lambat (bukan swipe, tapi scroll)
    if (dt > 400) return

    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    if (absDx > absDy && absDx > threshold) {
      // Horizontal swipe
      if (dx < 0) onLeft?.()
      else onRight?.()
    } else if (absDy > absDx && absDy > threshold) {
      // Vertical swipe
      if (dy < 0) onUp?.()
      else onDown?.()
    }
  }

  onMounted(() => {
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend', onTouchEnd)
  })
}
