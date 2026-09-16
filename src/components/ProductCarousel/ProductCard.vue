<template>
  <a
    :href="productUrl"
    class="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow group focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] focus:ring-offset-1 block"
    :aria-label="product.title"
  >
    <div class="relative p-2 aspect-square">
      <img
        :src="imageUrl"
        :alt="product.title"
        class="w-full h-full object-contain group-hover:scale-105 transition-transform"
        loading="lazy"
        decoding="async"
        width="200"
        height="200"
        @error="onImageError"
      />
      <!-- Discount badge -->
      <span
        v-if="discount > 0"
        class="absolute top-1 right-1 text-white text-[12px] px-1.5 py-0.5 rounded font-bold"
        :class="discountBadgeClass"
        :aria-label="'تخفیف ' + discount + ' درصد'"
      >{{ discount }}%</span>

      <!-- Favorite button -->
      <button
        @click.prevent.stop="toggleFavorite"
        class="absolute top-1 left-1 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#ed1b2f]"
        :aria-label="isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
      >
        <svg class="w-4 h-4" :class="isFav ? 'text-[#ed1b2f]' : 'text-gray-600'" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <div class="p-2 border-t border-gray-50">
      <h3 class="text-xs text-gray-700 line-clamp-2 mb-1 leading-5">{{ product.title }}</h3>

      <!-- Rating -->
      <div v-if="product.rating" class="flex items-center gap-0.5 mb-0.5" :aria-label="'امتیاز ' + product.rating.rating + ' از 5'">
        <div class="flex" aria-hidden="true">
          <span v-for="s in 5" :key="s" class="text-xs" :class="s <= Math.round(product.rating.rating / 20) ? 'text-yellow-400' : 'text-gray-300'">★</span>
        </div>
        <span class="text-xs text-gray-600">({{ product.rating.count }})</span>
      </div>

      <!-- Original price -->
      <div v-if="originalPrice > sellingPrice" class="text-xs text-gray-600 line-through">{{ formatPrice(originalPrice) }}</div>

      <!-- Selling price -->
      <div class="text-xs md:text-sm font-bold text-gray-800">
        {{ formatPrice(sellingPrice) }}
        <span class="text-xs font-normal text-gray-600">تومان</span>
      </div>

      <!-- Add to cart -->
      <button
        v-if="cartQty === 0"
        @click.prevent.stop="addToCart"
        class="w-full mt-1.5 bg-[#ed1b2f] text-white text-xs py-1.5 rounded font-medium hover:bg-[#c41620] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] focus:ring-offset-1 min-h-[44px]"
      >
        افزودن به سبد
      </button>
      <div v-else class="flex items-center justify-between mt-1.5 border border-gray-200 rounded overflow-hidden">
        <button @click.prevent.stop="decrementCart" class="w-9 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm" aria-label="کاهش تعداد">−</button>
        <span class="text-xs font-bold text-gray-800">{{ cartQty }}</span>
        <button @click.prevent.stop="incrementCart" class="w-9 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm" aria-label="افزایش تعداد">+</button>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Product } from '../../types/product'
import { useCartStore, useFavoritesStore } from '../../stores'
import { formatPrice, calcDiscount, buildProductUrl } from '../../utils/format'
import { getProductImage } from '../../api/products'

const props = withDefaults(
  defineProps<{
    product: Product
    discountBadgeClass?: string
  }>(),
  { discountBadgeClass: 'bg-[#ed1b2f]' }
)

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const imageError = ref(false)

const sellingPrice = computed(() => props.product.price?.selling_price || 0)
const originalPrice = computed(() => props.product.price?.rrp || 0)
const discount = computed(() => props.product.price?.discount || calcDiscount(originalPrice.value, sellingPrice.value))
const imageUrl = computed(() => imageError.value ? '' : getProductImage(props.product))
const productUrl = computed(() => buildProductUrl(props.product.id, props.product.title))
const isFav = computed(() => favoritesStore.isFavorite(props.product.id))
const cartQty = computed(() => cartStore.getItemQuantity(props.product.id))

const onImageError = () => { imageError.value = true }

const toggleFavorite = () => {
  favoritesStore.toggleFavorite({
    id: props.product.id,
    productId: props.product.id,
    title: props.product.title,
    image: getProductImage(props.product),
    price: sellingPrice.value,
  })
}

const addToCart = () => {
  cartStore.addItem({
    id: props.product.id,
    productId: props.product.id,
    title: props.product.title,
    image: getProductImage(props.product),
    price: sellingPrice.value,
  })
}

const incrementCart = () => {
  cartStore.updateQuantity(props.product.id, cartQty.value + 1)
}

const decrementCart = () => {
  cartStore.updateQuantity(props.product.id, cartQty.value - 1)
}
</script>
