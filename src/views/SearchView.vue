<template>
  <div class="max-w-[1400px] mx-auto px-4 py-3">
    <h1 class="sr-only">نتایج جستجو</h1>

    <!-- Search header -->
    <div class="bg-white rounded-lg p-3 mb-3">
      <form role="search" @submit.prevent="doSearch">
        <div class="relative">
          <label for="search-page-input" class="sr-only">جستجوی محصولات</label>
          <input
            id="search-page-input"
            v-model="query"
            type="search"
            placeholder="جستجوی محصولات، برندها و دسته‌بندی‌ها"
            class="w-full h-10 px-4 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#ed1b2f] focus:ring-1 focus:ring-[#ed1b2f] bg-gray-50 transition-colors"
            autocomplete="off"
          />
          <button type="submit" class="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-gray-600 hover:text-[#ed1b2f] transition-colors" aria-label="جستجو">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      <p v-if="!isLoading && query" class="text-sm text-gray-500 mt-2">
        {{ total > 0 ? `${total.toLocaleString('fa-IR')} نتیجه برای` : 'نتیجه‌ای برای' }} <strong>"{{ query }}"</strong>
      </p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      <div v-for="i in 10" :key="i" class="border border-gray-100 rounded-lg overflow-hidden">
        <div class="skeleton aspect-square" />
        <div class="p-2"><div class="skeleton h-3 w-3/4 rounded mb-1" /><div class="skeleton h-3 w-1/2 rounded" /></div>
      </div>
    </div>

    <!-- Results -->
    <div v-else-if="products.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>

    <!-- Empty -->
    <div v-else-if="query" class="bg-white rounded-lg p-8 text-center">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-sm text-gray-500">نتیجه‌ای برای <strong>"{{ query }}"</strong> یافت نشد.</p>
      <p class="text-xs text-gray-600 mt-1">لطفاً کلمات کلیدی دیگری امتحان کنید.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../types/product'
import { search } from '../api/search'
import ProductCard from '../components/ProductCarousel/ProductCard.vue'

const route = useRoute()
const query = ref((route.query.q as string) || '')
const products = ref<Product[]>([])
const total = ref(0)
const isLoading = ref(false)

const doSearch = async () => {
  if (!query.value.trim()) return
  isLoading.value = true
  try {
    const result = await search(query.value.trim())
    products.value = result.products
    total.value = result.total
  } catch {
    products.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

watch(() => route.query.q, (newQ) => {
  if (newQ && typeof newQ === 'string') {
    query.value = newQ
    doSearch()
  }
})

onMounted(() => {
  if (query.value) doSearch()
})
</script>
