import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Particle ash/ember effect menggunakan canvas
 * @param {import('vue').Ref<HTMLCanvasElement | null>} canvasRef
 */
export function useAshes(canvasRef) {
  let animFrameId = null
  const particles = []

  const PARTICLE_COUNT = 60

  function createParticle(canvas) {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      radius: Math.random() * 2 + 0.5,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.005,
    }
  }

  function initParticles(canvas) {
    particles.length = 0
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle(canvas)
      // Distribusikan partikel di seluruh layar saat init
      p.y = Math.random() * canvas.height
      particles.push(p)
    }
  }

  function resize(canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function animate() {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.wobble += p.wobbleSpeed
      p.x += p.speedX + Math.sin(p.wobble) * 0.3
      p.y += p.speedY

      if (p.y < -10) {
        Object.assign(particles[i], createParticle(canvas))
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200, 190, 220, ${p.opacity})`
      ctx.fill()
    }

    animFrameId = requestAnimationFrame(animate)
  }

  function handleResize() {
    const canvas = canvasRef.value
    if (!canvas) return
    resize(canvas)
    initParticles(canvas)
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    resize(canvas)
    initParticles(canvas)
    animate()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    if (animFrameId) cancelAnimationFrame(animFrameId)
    window.removeEventListener('resize', handleResize)
  })
}
