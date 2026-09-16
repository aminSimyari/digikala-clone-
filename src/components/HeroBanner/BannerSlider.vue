<template>
  <section aria-label="اسلایدر بنرهای تبلیغاتی">
    <div class="relative overflow-hidden bg-white rounded-lg">
      <!-- Banner image -->
      <a
        :href="currentBanner?.link || '#'"
        class="block aspect-[2/1] md:aspect-[3/1] relative"
        :aria-label="currentBanner?.title || 'بنر تبلیغاتی'"
      >
        <img
          :src="currentBannerImage"
          :alt="currentBanner?.title || ''"
          class="w-full h-full object-cover"
          width="1400"
          height="467"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </a>

      <!-- Dots -->
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" role="tablist" aria-label="انتخاب بنر">
        <button
          v-for="(_, i) in banners"
          :key="i"
          @click="goTo(i)"
          class="w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] focus:ring-offset-1 min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
          :class="i === currentIndex ? 'bg-[#ed1b2f] w-5' : 'bg-white/70 hover:bg-white'"
          role="tab"
          :aria-selected="i === currentIndex"
          :aria-label="'بنر ' + (i + 1)"
        />
      </div>

      <!-- Prev/Next buttons -->
      <button
        @click="prev"
        class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] focus:ring-offset-1 transition-colors min-w-[44px] min-h-[44px]"
        aria-label="بنر قبلی"
      >
        <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        @click="next"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] focus:ring-offset-1 transition-colors min-w-[44px] min-h-[44px]"
        aria-label="بنر بعدی"
      >
        <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Banner } from '../../types/banner'
import { getImageUrl } from '../../utils/constants'

const props = withDefaults(
  defineProps<{
    banners: Banner[]
    autoPlay?: boolean
    interval?: number
  }>(),
  {
    autoPlay: true,
    interval: 5000,
  }
)

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const currentBanner = computed(() => props.banners[currentIndex.value])
const currentBannerImage = computed(() => {
  const banner = currentBanner.value
  if (!banner?.image?.path) return ''
  return getImageUrl(banner.image.path)
})

const goTo = (index: number) => {
  currentIndex.value = index
  resetTimer()
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % (props.banners.length || 1)
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + (props.banners.length || 1)) % (props.banners.length || 1)
}

const resetTimer = () => {
  stopTimer()
  if (props.autoPlay && props.banners.length > 1) {
    timer = setInterval(next, props.interval)
  }
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// Touch support
let touchStartX = 0
const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
  stopTimer()
}
const onTouchEnd = (e: TouchEvent) => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 50) {
    if (diff > 0) next()
    else prev()
  }
  resetTimer()
}

onMounted(() => {
  resetTimer()
  document.addEventListener('touchstart', onTouchStart, { passive: true })
  document.addEventListener('touchend', onTouchEnd, { passive: true })
})

onUnmounted(() => {
  stopTimer()
  document.removeEventListener('touchstart', onTouchStart)
  document.removeEventListener('touchend', onTouchEnd)
})
</script>
