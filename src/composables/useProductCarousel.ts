import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useProductCarousel(containerRef: Ref<HTMLElement | null>) {
  const canScrollLeft = ref(false)
  const canScrollRight = ref(false)
  const currentIndex = ref(0)

  const updateScrollState = () => {
    const el = containerRef.value
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const currentScroll = Math.abs(el.scrollLeft)
    canScrollLeft.value = currentScroll < maxScroll - 5
    canScrollRight.value = currentScroll > 5
  }

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.value
    if (!el) return
    const cardWidth = el.children[0]?.getBoundingClientRect().width || 200
    const scrollAmount = cardWidth * 2 + 8
    const rtl = document.documentElement.dir === 'rtl'
    const dir = rtl ? (direction === 'left' ? 1 : -1) : (direction === 'left' ? -1 : 1)
    el.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' })
  }

  let startX = 0
  let startScroll = 0

  const onTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX
    startScroll = containerRef.value?.scrollLeft || 0
  }

  const onTouchMove = (e: TouchEvent) => {
    if (!containerRef.value) return
    containerRef.value.scrollLeft = startScroll + (startX - e.touches[0].clientX)
  }

  const onTouchEnd = () => updateScrollState()

  onMounted(() => {
    const el = containerRef.value
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    updateScrollState()
  })

  onUnmounted(() => {
    const el = containerRef.value
    if (!el) return
    el.removeEventListener('scroll', updateScrollState)
    el.removeEventListener('touchstart', onTouchStart)
    el.removeEventListener('touchmove', onTouchMove)
    el.removeEventListener('touchend', onTouchEnd)
  })

  return { canScrollLeft, canScrollRight, currentIndex, scroll }
}
