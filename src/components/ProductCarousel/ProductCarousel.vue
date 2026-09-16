<template>
  <section class="bg-white rounded-lg p-3" :aria-label="title">
    <SectionHeader
      :title="title"
      :badge="badge"
      :badge-class="badgeClass"
      :show-link="showLink"
      :link-url="linkUrl"
      :link-text="linkText"
    />

    <!-- Loading -->
    <div v-if="loading" class="flex gap-2 overflow-hidden">
      <div v-for="i in 5" :key="i" class="flex-shrink-0 w-36 md:w-44">
        <div class="skeleton h-44 rounded-lg mb-2" />
        <div class="skeleton h-3 w-3/4 rounded mb-1" />
        <div class="skeleton h-3 w-1/2 rounded" />
      </div>
    </div>

    <!-- Error -->
    <ErrorState v-else-if="error" :show-retry="true" @retry="$emit('retry')" />

    <!-- Empty -->
    <div v-else-if="products.length === 0" class="py-8 text-center text-sm text-gray-600">
      محصولی یافت نشد
    </div>

    <!-- Products carousel -->
    <div v-else class="relative">
      <button
        v-if="canScrollRight"
        @click="scroll('right')"
        class="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 hover:border-gray-300 rounded-full flex items-center justify-center shadow z-10 focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] transition-all hidden md:flex"
        aria-label="محصولات قبلی"
      >
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button
        v-if="canScrollLeft"
        @click="scroll('left')"
        class="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 hover:border-gray-300 rounded-full flex items-center justify-center shadow z-10 focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] transition-all hidden md:flex"
        aria-label="محصولات بعدی"
      >
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      <div
        ref="scrollContainer"
        class="flex gap-2 overflow-x-auto pb-1 scroll-hidden"
      >
        <div v-for="p in products" :key="p.id" class="flex-shrink-0 w-36 md:w-44">
          <ProductCard :product="p" :discount-badge-class="discountBadgeClass" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../../types/product'
import { useProductCarousel } from '../../composables/useProductCarousel'
import ProductCard from './ProductCard.vue'
import SectionHeader from '../common/SectionHeader.vue'
import ErrorState from '../common/ErrorState.vue'

withDefaults(
  defineProps<{
    title: string
    products: Product[]
    loading?: boolean
    error?: boolean
    badge?: string
    badgeClass?: string
    showLink?: boolean
    linkUrl?: string
    linkText?: string
    belowFold?: boolean
    discountBadgeClass?: string
  }>(),
  {
    loading: false,
    error: false,
    badge: '',
    badgeClass: 'bg-[#ff6f00]',
    showLink: false,
    linkUrl: '#',
    linkText: '',
    belowFold: false,
    discountBadgeClass: 'bg-[#ed1b2f]',
  }
)

defineEmits<{
  retry: []
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const { canScrollLeft, canScrollRight, scroll } = useProductCarousel(scrollContainer)
</script>
