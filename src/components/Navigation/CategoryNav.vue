<template>
  <section class="bg-white rounded-lg p-3" aria-label="دسته‌بندی‌های اصلی">
    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1.5">
      <div v-for="i in 12" :key="i" class="flex flex-col items-center gap-1 p-2">
        <div class="skeleton w-12 h-12 rounded-full" />
        <div class="skeleton h-3 w-10 rounded" />
      </div>
    </div>

    <!-- Categories -->
    <div v-else class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1.5">
      <a
        v-for="c in categories"
        :key="c.id"
        :href="c.url || '/categories/'"
        class="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
        :aria-label="c.title"
      >
        <img
          :src="getCategoryImage(c)"
          :alt="c.title"
          class="w-11 h-11 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform"
          width="48"
          height="48"
          loading="lazy"
          decoding="async"
          @error="onImageError($event)"
        />
        <span class="text-xs text-gray-700 text-center leading-tight group-hover:text-[#ed1b2f] transition-colors">{{ c.title }}</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HomepageCategory } from '../../types/category'
import { getCategoryImage as buildCategoryImage } from '../../api/categories'

defineProps<{
  categories: HomepageCategory[]
  loading?: boolean
}>()

const getCategoryImage = (c: HomepageCategory): string => {
  if (c.icon?.path) return buildCategoryImage(c as unknown as import('../../types/category').Category)
  if (c.image?.path) return buildCategoryImage(c as unknown as import('../../types/category').Category)
  return ''
}

const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}
</script>
