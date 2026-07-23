import { ref } from 'vue'

/**
 * Audio BGM toggle composable
 * @param {string} src - URL audio
 */
export function useSound(src) {
  const isPlaying = ref(false)

  let audio = null

  function getAudio() {
    if (!audio) {
      audio = new Audio(src)
      audio.loop = true
      audio.volume = 0.3
    }
    return audio
  }

  async function toggleSound() {
    const bgm = getAudio()
    if (bgm.paused) {
      try {
        await bgm.play()
        isPlaying.value = true
      } catch {
        // Autoplay policy — browser memblokir tanpa interaksi user
        isPlaying.value = false
      }
    } else {
      bgm.pause()
      isPlaying.value = false
    }
  }

  function stop() {
    if (audio && !audio.paused) {
      audio.pause()
      audio.currentTime = 0
      isPlaying.value = false
    }
  }

  return { isPlaying, toggleSound, stop }
}
