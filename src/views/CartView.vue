<template>
  <div class="max-w-[1400px] mx-auto px-4 py-3">
    <h1 class="sr-only">سبد خرید</h1>

    <div class="bg-white rounded-lg p-4">
      <h2 class="text-base font-bold text-gray-800 mb-4">سبد خرید ({{ cartStore.totalItems }} کالا)</h2>

      <!-- Empty cart -->
      <div v-if="cartStore.isEmpty" class="text-center py-8">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-sm text-gray-500 mb-4">سبد خرید شما خالی است.</p>
        <a href="/" class="inline-block bg-[#ed1b2f] text-white text-sm px-6 py-2 rounded-lg hover:bg-[#c41620] transition-colors">مشاهده محصولات</a>
      </div>

      <!-- Cart items -->
      <div v-else class="space-y-3">
        <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0">
          <img :src="item.image" :alt="item.title" class="w-16 h-16 object-contain rounded flex-shrink-0" loading="lazy" />
          <div class="flex-1 min-w-0">
            <a :href="'/product/' + item.productId + '/'" class="text-sm text-gray-700 hover:text-[#ed1b2f] line-clamp-1 block">{{ item.title }}</a>
            <div class="text-sm font-bold text-gray-800 mt-1">{{ formatPrice(item.price) }} <span class="text-xs font-normal text-gray-600">تومان</span></div>
          </div>
          <div class="flex items-center border border-gray-200 rounded overflow-hidden flex-shrink-0">
            <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm" aria-label="افزایش تعداد">+</button>
            <span class="w-8 text-center text-sm font-bold">{{ item.quantity }}</span>
            <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm" aria-label="کاهش تعداد">−</button>
          </div>
          <button @click="cartStore.removeItem(item.id)" class="text-gray-600 hover:text-[#ed1b2f] transition-colors p-1" aria-label="حذف از سبد">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <!-- Total -->
      <div v-if="!cartStore.isEmpty" class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <span class="text-sm text-gray-600">جمع سبد خرید:</span>
        <span class="text-lg font-bold text-gray-800">{{ formatPrice(cartStore.totalPrice) }} <span class="text-xs font-normal text-gray-600">تومان</span></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores'
import { formatPrice } from '../utils/format'

const cartStore = useCartStore()
</script>
