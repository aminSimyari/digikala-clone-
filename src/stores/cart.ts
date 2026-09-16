import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '../types'
import { storage, STORAGE_KEYS } from '../utils/storage'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(storage.get<CartItem[]>(STORAGE_KEYS.CART, []))

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    const existing = items.value.find((i) => i.id === item.id)
    if (existing) {
      existing.quantity = Math.min(
        existing.quantity + quantity,
        existing.maxQuantity || 10
      )
    } else {
      items.value.push({ ...item, quantity, maxQuantity: item.maxQuantity || 10 })
    }
    saveToStorage()
  }

  function removeItem(id: number) {
    items.value = items.value.filter((i) => i.id !== id)
    saveToStorage()
  }

  function updateQuantity(id: number, quantity: number) {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      if (quantity <= 0) {
        removeItem(id)
      } else {
        item.quantity = Math.min(quantity, item.maxQuantity || 10)
        saveToStorage()
      }
    }
  }

  function clearCart() {
    items.value = []
    saveToStorage()
  }

  function getItemQuantity(productId: number): number {
    const item = items.value.find((i) => i.productId === productId)
    return item?.quantity || 0
  }

  function saveToStorage() {
    storage.set(STORAGE_KEYS.CART, items.value)
  }

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
  }
})
