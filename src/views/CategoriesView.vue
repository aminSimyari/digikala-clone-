<template>
  <div class="max-w-[1400px] mx-auto px-4 py-3">
    <h1 class="text-base font-bold text-gray-800 mb-4">دسته‌بندی کالاها</h1>

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <div v-for="i in 12" :key="i" class="skeleton h-32 rounded-lg" />
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <a
        v-for="c in categories"
        :key="c.id"
        :href="c.url || '/categories/'"
        class="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-[#ed1b2f]"
      >
        <img
          v-if="getCatImage(c)"
          :src="getCatImage(c)"
          :alt="c.title"
          class="w-16 h-16 mx-auto object-contain mb-2"
          loading="lazy"
        />
        <span class="text-sm text-gray-700">{{ c.title }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Category } from '../types/category'
import { fetchCategoryTree, getCategoryImage } from '../api/categories'

const categories = ref<Category[]>([])
const loading = ref(true)

const getCatImage = (c: Category): string => getCategoryImage(c)

onMounted(async () => {
  try {
    categories.value = await fetchCategoryTree()
  } catch {
    categories.value = []
  } finally {
    loading.value = false
  }
})
</script>
