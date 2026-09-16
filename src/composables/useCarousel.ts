import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface UseCarouselOptions {
  gap?: number
  scrollByCard?: boolean
  autoScroll?: boolean
  autoScrollInterval?: number
}

export function useCarousel(
  containerRef: Ref<HTMLElement | null>,
  options: UseCarouselOptions = {}
) {
  const { gap = 8, scrollByCard = true, autoScroll = false, autoScrollInterval = 5000 } = options

  const canScrollLeft = ref(false)
  const canScrollRight = ref(false)
  const scrollProgress = ref(0)
  let autoTimer: ReturnType<typeof setInterval> | null = null

  const updateScrollState = () => {
    const el = containerRef.value
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const currentScroll = Math.abs(el.scrollLeft)
    canScrollLeft.value = currentScroll < maxScroll - 5
    canScrollRight.value = currentScroll > 5
    scrollProgress.value = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0
  }

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.value
    if (!el) return
    const scrollAmount = scrollByCard ? el.clientWidth - gap * 2 : el.clientWidth / 2
    const rtl = document.documentElement.dir === 'rtl'
    const dir = rtl ? (direction === 'left' ? 1 : -1) : (direction === 'left' ? -1 : 1)
    el.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' })
  }

  const scrollToStart = () => containerRef.value?.scrollTo({ left: 0, behavior: 'smooth' })
  const scrollToEnd = () => containerRef.value?.scrollTo({ left: containerRef.value?.scrollWidth || 0, behavior: 'smooth' })

  const startAutoScroll = () => {
    if (!autoScroll) return
    autoTimer = setInterval(() => {
      const el = containerRef.value
      if (!el) return
      const maxScroll = el.scrollWidth - el.clientWidth
      if (Math.abs(el.scrollLeft) >= maxScroll - 5) scrollToStart()
      else scroll('right')
    }, autoScrollInterval)
  }

  const stopAutoScroll = () => {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null }
  }

  let touchStartX = 0
  let touchStartScrollLeft = 0

  const onTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX
    touchStartScrollLeft = containerRef.value?.scrollLeft || 0
    stopAutoScroll()
  }

  const onTouchMove = (e: TouchEvent) => {
    if (!containerRef.value) return
    containerRef.value.scrollLeft = touchStartScrollLeft + (touchStartX - e.touches[0].clientX)
  }

  const onTouchEnd = () => { updateScrollState(); startAutoScroll() }

  const setupTouchListeners = () => {
    const el = containerRef.value
    if (!el) return
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
  }

  const removeTouchListeners = () => {
    const el = containerRef.value
    if (!el) return
    el.removeEventListener('touchstart', onTouchStart)
    el.removeEventListener('touchmove', onTouchMove)
    el.removeEventListener('touchend', onTouchEnd)
  }

  onMounted(() => {
    const el = containerRef.value
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true })
      updateScrollState()
      setupTouchListeners()
      startAutoScroll()
    }
  })

  onUnmounted(() => {
    containerRef.value?.removeEventListener('scroll', updateScrollState)
    removeTouchListeners()
    stopAutoScroll()
  })

  return { canScrollLeft, canScrollRight, scrollProgress, scroll, scrollToStart, scrollToEnd, startAutoScroll, stopAutoScroll }
}
