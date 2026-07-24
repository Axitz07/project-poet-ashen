<script setup>
import { ref } from 'vue'
import AshesCanvas from './components/AshesCanvas.vue'
import AmbientOrbs from './components/AmbientOrbs.vue'
import CursorGlow from './components/CursorGlow.vue'
import TopBar from './components/TopBar.vue'
import ContentDisplay from './components/ContentDisplay.vue'
import LibraryPanel from './components/LibraryPanel.vue'
import AboutSection from './components/AboutSection.vue'
import FooterSection from './components/FooterSection.vue'
import ToastNotif from './components/ToastNotif.vue'
import { useSound } from './composables/useSound.js'
import { useTypewriter } from './composables/useTypewriter.js'
import { useToast } from './composables/useToast.js'
import { useSwipe } from './composables/useSwipe.js'
import { getRandomByType } from './data/contents.js'

// ── State ─────────────────────────────────────────────────────────────────────
const panelOpen     = ref(false)
const aboutOpen     = ref(false)
const activeContent = ref(null)
const activeType    = ref('poem')
const isFullscreen  = ref(false)

// Ink splash
const splashStyle  = ref({ left: '50%', top: '50%' })
const splashActive = ref(false)

// ── Composables ───────────────────────────────────────────────────────────────
const { isPlaying, toggleSound } = useSound('/project-poet-ashen/bgm.mp3')
const { displayedText, isTyping, progress, typeText, stopTyping } = useTypewriter({ charDelay: 16 })
const { isVisible: toastVisible, message: toastMessage, copyAndToast } = useToast()

// ── Swipe gesture (mobile) ────────────────────────────────────────────────────
useSwipe({
  onLeft:  () => { if (!panelOpen.value && !aboutOpen.value) randomCurrent() },
  onRight: () => { if (!panelOpen.value && !aboutOpen.value) randomCurrent() },
})

// ── Ink splash ────────────────────────────────────────────────────────────────
function triggerSplash(e) {
  if (e) {
    splashStyle.value = { left: `${e.clientX}px`, top: `${e.clientY}px` }
  }
  splashActive.value = false
  setTimeout(() => {
    splashActive.value = true
    setTimeout(() => { splashActive.value = false }, 900)
  }, 10)
}

// ── Actions ───────────────────────────────────────────────────────────────────
function showContent(item, e) {
  triggerSplash(e)
  setTimeout(() => {
    activeContent.value = item
    typeText(item.body)
  }, 120)
}

function randomByType(type, e) {
  activeType.value = type
  const item = getRandomByType(type)
  showContent(item, e)
}

function randomCurrent(e) {
  randomByType(activeType.value, e)
}

function handleSelect(item) {
  activeType.value = item.type
  showContent(item)
}

function skipTyping() {
  if (isTyping.value && activeContent.value) {
    stopTyping()
    displayedText.value = activeContent.value.body
  }
}

function handleShare() {
  copyAndToast(window.location.href, 'Link disalin ke clipboard!')
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col relative"
    :class="{ 'fullscreen-mode': isFullscreen }"
  >
    <!-- Background layers -->
    <AmbientOrbs />
    <AshesCanvas />

    <!-- Ink splash overlay -->
    <div
      class="ink-splash"
      :class="{ active: splashActive }"
      :style="splashStyle"
    />

    <!-- Custom cursor -->
    <CursorGlow />

    <!-- Reading progress bar (sisi kiri) -->
    <transition name="fade">
      <div v-if="activeContent" class="reading-progress">
        <div class="reading-progress-fill" :style="{ height: `${progress}%` }" />
      </div>
    </transition>

    <!-- Topbar -->
    <div class="topbar-el">
      <TopBar
        :is-playing="isPlaying"
        :is-typing="isTyping"
        :progress="progress"
        :active-type="activeType"
        @toggle-sound="toggleSound"
        @toggle-panel="panelOpen = true"
        @toggle-about="aboutOpen = true"
        @share="handleShare"
      />
    </div>

    <!-- Konten utama -->
    <ContentDisplay
      :content="activeContent"
      :displayed-text="displayedText"
      :is-typing="isTyping"
      :active-type="activeType"
      :progress="progress"
      :is-fullscreen="isFullscreen"
      @random-poem="(e) => randomByType('poem', e)"
      @random-story="(e) => randomByType('story', e)"
      @random-current="(e) => randomCurrent(e)"
      @skip-typing="skipTyping"
      @toggle-fullscreen="isFullscreen = !isFullscreen"
    />

    <!-- Footer -->
    <FooterSection @open-about="aboutOpen = true" />

    <!-- Library panel -->
    <LibraryPanel
      :is-open="panelOpen"
      :active-id="activeContent?.id ?? null"
      @close="panelOpen = false"
      @select="handleSelect"
    />

    <!-- About modal -->
    <AboutSection
      :is-open="aboutOpen"
      @close="aboutOpen = false"
    />

    <!-- Toast -->
    <ToastNotif :is-visible="toastVisible" :message="toastMessage" />
  </div>
</template>
