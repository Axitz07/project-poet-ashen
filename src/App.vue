<script setup>
import { ref } from 'vue'
import AshesCanvas from './components/AshesCanvas.vue'
import AmbientOrbs from './components/AmbientOrbs.vue'
import CursorGlow from './components/CursorGlow.vue'
import TopBar from './components/TopBar.vue'
import ContentDisplay from './components/ContentDisplay.vue'
import LibraryPanel from './components/LibraryPanel.vue'
import FooterSection from './components/FooterSection.vue'
import ToastNotif from './components/ToastNotif.vue'
import { useSound } from './composables/useSound.js'
import { useTypewriter } from './composables/useTypewriter.js'
import { useToast } from './composables/useToast.js'
import { getRandomByType } from './data/contents.js'

// ── State ────────────────────────────────────────────────────────────────────
const panelOpen = ref(false)
const activeContent = ref(null)
const activeType = ref('poem')

// ── Composables ───────────────────────────────────────────────────────────────
const { isPlaying, toggleSound } = useSound(
  'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'
)
const { displayedText, isTyping, progress, typeText } = useTypewriter({ charDelay: 16 })
const { isVisible: toastVisible, message: toastMessage, copyAndToast } = useToast()

// ── Actions ───────────────────────────────────────────────────────────────────
function showContent(item) {
  activeContent.value = item
  typeText(item.body)
}

function randomByType(type) {
  activeType.value = type
  const item = getRandomByType(type)
  showContent(item)
}

function randomCurrent() {
  randomByType(activeType.value)
}

function handleSelect(item) {
  activeType.value = item.type
  showContent(item)
}

function handleShare() {
  copyAndToast(window.location.href, 'Link disalin ke clipboard!')
}
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <!-- Background layers -->
    <AmbientOrbs />
    <AshesCanvas />

    <!-- Custom cursor -->
    <CursorGlow />

    <!-- Topbar + progress bar -->
    <TopBar
      :is-playing="isPlaying"
      :is-typing="isTyping"
      :progress="progress"
      :active-type="activeType"
      @toggle-sound="toggleSound"
      @toggle-panel="panelOpen = true"
      @share="handleShare"
    />

    <!-- Konten utama -->
    <ContentDisplay
      :content="activeContent"
      :displayed-text="displayedText"
      :is-typing="isTyping"
      :active-type="activeType"
      :progress="progress"
      @random-poem="randomByType('poem')"
      @random-story="randomByType('story')"
      @random-current="randomCurrent"
    />

    <!-- Footer -->
    <FooterSection />

    <!-- Library side panel -->
    <LibraryPanel
      :is-open="panelOpen"
      :active-id="activeContent?.id ?? null"
      @close="panelOpen = false"
      @select="handleSelect"
    />

    <!-- Toast notif -->
    <ToastNotif :is-visible="toastVisible" :message="toastMessage" />
  </div>
</template>
