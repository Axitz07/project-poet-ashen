import { ref } from 'vue'

/**
 * Simple toast notification composable
 */
export function useToast() {
  const isVisible = ref(false)
  const message = ref('')

  let timeoutId = null

  /**
   * @param {string} msg
   * @param {number} [duration=3000]
   */
  function showToast(msg, duration = 3000) {
    if (timeoutId) clearTimeout(timeoutId)
    message.value = msg
    isVisible.value = true
    timeoutId = setTimeout(() => {
      isVisible.value = false
    }, duration)
  }

  async function copyAndToast(text, msg = 'Link disalin ke clipboard!') {
    try {
      await navigator.clipboard.writeText(text)
      showToast(msg)
    } catch {
      showToast('Gagal menyalin link.')
    }
  }

  return { isVisible, message, showToast, copyAndToast }
}
