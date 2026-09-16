<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 safe-bottom" aria-label="ناوبری موبایل">
    <div class="flex items-center justify-around h-14">
      <a
        v-for="m in items"
        :key="m.id"
        :href="m.href"
        class="relative flex flex-col items-center justify-center gap-0.5 text-gray-600 hover:text-[#ed1b2f] transition-colors w-full h-full min-h-[44px]"
        :aria-label="m.label"
      >
        <span class="text-lg" aria-hidden="true">{{ m.icon }}</span>
        <span class="text-xs">{{ m.label }}</span>
        <span
          v-if="m.badge > 0"
          class="absolute top-1.5 bg-[#ed1b2f] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
        >{{ m.badge }}</span>
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  cartCount: number
  favoritesCount: number
}>()

const items = computed(() => [
  { id: 1, label: 'خانه', href: '/', icon: '🏠', badge: 0 },
  { id: 2, label: 'دسته‌بندی', href: '/categories/', icon: '☰', badge: 0 },
  { id: 3, label: 'سبد خرید', href: '/cart/', icon: '🛒', badge: props.cartCount },
  { id: 4, label: 'علاقه‌مندی', href: '/favorites/', icon: '❤️', badge: props.favoritesCount },
  { id: 5, label: 'حساب کاربری', href: '/login/', icon: '👤', badge: 0 },
])
</script>
