<template>
  <div lang="fa" dir="rtl" class="flex flex-col" style="min-height: 100vh;">
    <!-- Skip Link -->
    <a href="#content" class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:right-4 focus:bg-[#ed1b2f] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none">رفتن به محتوای اصلی</a>

    <!-- Header -->
    <SiteHeader @open-cart="cartOpen = true" @open-favorites="favOpen = true" />

    <!-- Main Content -->
    <main id="content" class="max-w-[1400px] mx-auto px-4 py-3 flex-1">
      <h1 class="sr-only">دیجی‌کالا - فروشگاه اینترنتی خرید آنلاین</h1>
      <RouterView />
    </main>

    <!-- Footer -->
    <SiteFooter />

    <!-- Cart drawer -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="cartOpen" class="fixed inset-0 z-[100]" @click.self="cartOpen = false">
          <div class="absolute inset-0 bg-black/40" @click="cartOpen = false" />
          <div class="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-y-auto p-4 transition-transform">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-base font-bold">سبد خرید</h2>
              <button @click="cartOpen = false" class="p-2 hover:bg-gray-100 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="بستن">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div v-if="cartStore.isEmpty" class="text-center py-8 text-sm text-gray-600">سبد خرید شما خالی است.</div>
            <div v-else class="space-y-3">
              <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-3 border-b border-gray-100 pb-3">
                <img :src="item.image" :alt="item.title" class="w-14 h-14 object-contain rounded flex-shrink-0" loading="lazy" width="56" height="56" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-700 line-clamp-1">{{ item.title }}</p>
                  <p class="text-sm font-bold text-gray-800 mt-0.5">{{ formatPrice(item.price) }} <span class="text-xs font-normal text-gray-600">تومان</span></p>
                </div>
                <div class="flex items-center border border-gray-200 rounded overflow-hidden flex-shrink-0">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-9 h-8 flex items-center justify-center text-sm hover:bg-gray-50 min-w-[44px]" aria-label="افزایش تعداد">+</button>
                  <span class="w-6 text-center text-xs font-bold">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-9 h-8 flex items-center justify-center text-sm hover:bg-gray-50 min-w-[44px]" aria-label="کاهش تعداد">−</button>
                </div>
              </div>
              <div class="pt-3 border-t border-gray-200 flex items-center justify-between">
                <span class="text-sm text-gray-600">جمع:</span>
                <span class="font-bold text-gray-800">{{ formatPrice(cartStore.totalPrice) }} تومان</span>
              </div>
              <a href="/cart/" class="block w-full bg-[#ed1b2f] text-white text-sm text-center py-2.5 rounded-lg hover:bg-[#c41620] transition-colors font-medium min-h-[44px] flex items-center justify-center">مشاهده سبد خرید</a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Favorites drawer -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="favOpen" class="fixed inset-0 z-[100]" @click.self="favOpen = false">
          <div class="absolute inset-0 bg-black/40" @click="favOpen = false" />
          <div class="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-y-auto p-4">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-base font-bold">علاقه‌مندی‌ها</h2>
              <button @click="favOpen = false" class="p-2 hover:bg-gray-100 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="بستن">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div v-if="favoritesStore.totalItems === 0" class="text-center py-8 text-sm text-gray-600">لیست علاقه‌مندی‌ها خالی است.</div>
            <div v-else class="space-y-3">
              <div v-for="item in favoritesStore.items" :key="item.id" class="flex items-center gap-3 border-b border-gray-100 pb-3">
                <img :src="item.image" :alt="item.title" class="w-14 h-14 object-contain rounded flex-shrink-0" loading="lazy" width="56" height="56" />
                <div class="flex-1 min-w-0">
                  <a :href="'/product/' + item.productId + '/'" class="text-xs text-gray-700 hover:text-[#ed1b2f] line-clamp-1 block underline decoration-gray-300 underline-offset-2">{{ item.title }}</a>
                  <p class="text-sm font-bold text-gray-800 mt-0.5">{{ formatPrice(item.price) }} <span class="text-xs font-normal text-gray-600">تومان</span></p>
                </div>
                <button @click="favoritesStore.removeFavorite(item.productId)" class="text-gray-600 hover:text-[#ed1b2f] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="حذف از علاقه‌مندی‌ها">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SiteHeader from './components/Header/SiteHeader.vue'
import SiteFooter from './components/Footer/SiteFooter.vue'
import { useCartStore, useFavoritesStore } from './stores'
import { formatPrice } from './utils/format'

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const cartOpen = ref(false)
const favOpen = ref(false)
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.skeleton {
  background: linear-gradient(90deg, #e4e4e4 25%, #d1d1d1 50%, #e4e4e4 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }

.scroll-hidden { -ms-overflow-style: none; scrollbar-width: none; }
.scroll-hidden::-webkit-scrollbar { display: none; }

.safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
