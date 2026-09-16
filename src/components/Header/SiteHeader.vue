<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <div class="bg-white">
      <div class="max-w-[1400px] mx-auto px-4">
        <div class="flex items-center justify-between h-16 gap-3">
          <!-- Logo -->
          <a href="/" class="flex-shrink-0" aria-label="دیجی‌کالا - صفحه اصلی">
            <img :src="logoUrl" alt="دیجی‌کالا" class="h-7" width="110" height="28" fetchpriority="high" />
          </a>

          <!-- Search Bar (desktop) -->
          <SearchBar @search="onSearch" />

          <!-- Right Actions -->
          <div class="flex items-center gap-1">
            <!-- Login -->
            <a href="/login/" class="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#ed1b2f] px-3 py-2 rounded-lg transition-colors min-h-[44px]" aria-label="ورود به حساب کاربری">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="hidden lg:inline text-xs">ورود | ثبت‌نام</span>
            </a>

            <div class="w-px h-6 bg-gray-200 hidden lg:block" aria-hidden="true" />

            <!-- Favorites -->
            <button
              @click="$emit('openFavorites')"
              class="relative flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#ed1b2f] px-3 py-2 rounded-lg transition-colors min-h-[44px]"
              aria-label="لیست علاقه‌مندی‌ها"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="favoritesCount > 0" class="absolute -top-0.5 -left-0.5 bg-[#ed1b2f] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ favoritesCount }}</span>
            </button>

            <div class="w-px h-6 bg-gray-200 hidden lg:block" aria-hidden="true" />

            <!-- Cart -->
            <button
              @click="$emit('openCart')"
              class="relative flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#ed1b2f] px-3 py-2 rounded-lg transition-colors min-h-[44px]"
              aria-label="سبد خرید"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="cartCount > 0" class="absolute -top-0.5 -left-0.5 bg-[#ed1b2f] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ cartCount }}</span>
              <span class="hidden lg:inline text-xs">سبد خرید</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Nav -->
    <nav class="bg-white border-t border-gray-100 hidden md:block" aria-label="منوی اصلی">
      <div class="max-w-[1400px] mx-auto px-4">
        <ul class="flex items-center gap-0.5 h-10 text-sm overflow-x-auto scroll-hidden" role="menubar">
          <li role="none" v-for="n in navItems" :key="n.id">
            <a
              :href="n.href"
              role="menuitem"
              class="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-[#ed1b2f] hover:bg-gray-50 whitespace-nowrap rounded transition-colors text-xs"
            >
              <span aria-hidden="true">{{ n.icon }}</span>
              {{ n.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile Bottom Nav -->
    <MobileNav :cart-count="cartCount" :favorites-count="favoritesCount" />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SearchBar from './SearchBar.vue'
import MobileNav from './MobileNav.vue'
import { useCartStore, useFavoritesStore } from '../../stores'
import { LOGO_URL } from '../../utils/constants'

defineEmits<{
  openCart: []
  openFavorites: []
}>()

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const cartCount = computed(() => cartStore.totalItems)
const favoritesCount = computed(() => favoritesStore.totalItems)
const logoUrl = LOGO_URL

const navItems = [
  { id: 1, label: 'دسته‌بندی کالاها', href: '/categories/', icon: '☰' },
  { id: 2, label: 'پیشنهادات ویژه', href: '/special-offers/', icon: '🔥' },
  { id: 3, label: 'سوپرمارکت', href: '/supermarket/', icon: '🛒' },
  { id: 4, label: 'تخفیف‌ها و پیشنهادات', href: '/discounts/', icon: '💰' },
  { id: 5, label: 'گیمینگ', href: '/gaming/', icon: '🎮' },
  { id: 6, label: 'دیجی‌استایل', href: '/digistyle/', icon: '👕' },
  { id: 7, label: 'دیجی‌پی', href: '/digipay/', icon: '💳' },
  { id: 8, label: 'دیجی‌کلاب', href: '/digiclub/', icon: '🎁' },
]

const onSearch = (query: string) => {
  window.location.href = '/search/?q=' + encodeURIComponent(query)
}
</script>
