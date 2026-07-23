import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Keyboard shortcuts composable
 * @param {{ onPoem, onStory, onNext, onTogglePanel, onFullscreen, onSkip }} handlers
 */
export function useKeyboard(handlers) {
  function onKeyDown(e) {
    // Jangan trigger kalau user lagi focus di input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

    switch (e.key.toLowerCase()) {
      case 'p':
        handlers.onPoem?.()
        break
      case 'c':
        handlers.onStory?.()
        break
      case ' ':
      case 'arrowright':
        e.preventDefault()
        handlers.onNext?.()
        break
      case 'l':
        handlers.onTogglePanel?.()
        break
      case 'f':
        handlers.onFullscreen?.()
        break
      case 'escape':
        handlers.onSkip?.()
        break
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeyDown))
  onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
}
