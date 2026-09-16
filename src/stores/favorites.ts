import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FavoriteItem } from '../types'
import { storage, STORAGE_KEYS } from '../utils/storage'

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref<FavoriteItem[]>(storage.get<FavoriteItem[]>(STORAGE_KEYS.FAVORITES, []))

  const totalItems = computed(() => items.value.length)

  function isFavorite(productId: number): boolean {
    return items.value.some((i) => i.productId === productId)
  }

  function toggleFavorite(item: Omit<FavoriteItem, 'addedAt'>) {
    if (isFavorite(item.productId)) {
      removeFavorite(item.productId)
    } else {
      addFavorite(item)
    }
  }

  function addFavorite(item: Omit<FavoriteItem, 'addedAt'>) {
    if (!isFavorite(item.productId)) {
      items.value.push({ ...item, addedAt: Date.now() })
      saveToStorage()
    }
  }

  function removeFavorite(productId: number) {
    items.value = items.value.filter((i) => i.productId !== productId)
    saveToStorage()
  }

  function clearFavorites() {
    items.value = []
    saveToStorage()
  }

  function saveToStorage() {
    storage.set(STORAGE_KEYS.FAVORITES, items.value)
  }

  return {
    items,
    totalItems,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  }
})
