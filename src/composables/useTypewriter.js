import { ref } from 'vue'

/**
 * Typewriter effect dengan delay per karakter + progress 0–100
 * @param {{ charDelay?: number }} options
 */
export function useTypewriter(options = {}) {
  const { charDelay = 18 } = options

  const displayedText = ref('')
  const isTyping = ref(false)
  const progress = ref(0)

  let timeoutId = null
  let totalLen = 0

  /**
   * Mulai mengetik teks baru. Setiap panggilan membatalkan ketikan sebelumnya.
   * @param {string} text
   */
  function typeText(text) {
    if (timeoutId) clearTimeout(timeoutId)
    displayedText.value = ''
    progress.value = 0
    isTyping.value = true
    totalLen = text.length

    let index = 0

    function type() {
      if (index < text.length) {
        displayedText.value += text[index]
        index++
        progress.value = Math.round((index / totalLen) * 100)
        timeoutId = setTimeout(type, charDelay)
      } else {
        isTyping.value = false
        progress.value = 100
        timeoutId = null
      }
    }

    type()
  }

  function stopTyping() {
    if (timeoutId) clearTimeout(timeoutId)
    isTyping.value = false
    progress.value = 100
  }

  return { displayedText, isTyping, progress, typeText, stopTyping }
}
