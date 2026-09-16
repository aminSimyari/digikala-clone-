<template>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" aria-label="بنرهای تبلیغاتی">
    <a
      v-for="b in banners"
      :key="b.id"
      :href="b.link || '#'"
      class="relative overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] focus:ring-offset-1"
      :aria-label="b.title || b.alt || 'بنر تبلیغاتی'"
    >
      <img
        :src="getImageUrl(b)"
        :alt="b.title || b.alt || ''"
        class="w-full aspect-[2/1] object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        decoding="async"
        width="460"
        height="230"
        @error="onImageError($event)"
      />
    </a>
  </section>
</template>

<script setup lang="ts">
import type { Banner } from '../../types/banner'
import { getImageUrl as getImage } from '../../utils/constants'

defineProps<{
  banners: Banner[]
}>()

const getImageUrl = (b: Banner): string => {
  if (b.image?.path) return getImage(b.image.path)
  if (b.images?.[0]?.path) return getImage(b.images[0].path)
  return ''
}

const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}
</script>
