import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storage, STORAGE_KEYS } from '../utils/storage'
import { getSearchSuggestions } from '../api/search'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const suggestions = ref<{ id: number; title: string; url: string }[]>([])
  const history = ref<string[]>(storage.get<string[]>(STORAGE_KEYS.SEARCH_HISTORY, []))
  const isOpen = ref(false)
  const isLoading = ref(false)

  async function updateSuggestions(q: string) {
    query.value = q
    if (!q || q.length < 2) {
      suggestions.value = []
      return
    }
    isLoading.value = true
    try {
      const results = await getSearchSuggestions(q)
      suggestions.value = results as { id: number; title: string; url: string }[]
    } catch {
      suggestions.value = []
    } finally {
      isLoading.value = false
    }
  }

  function addToHistory(q: string) {
    if (!q.trim()) return
    const trimmed = q.trim()
    history.value = [trimmed, ...history.value.filter((h) => h !== trimmed)].slice(0, 10)
    storage.set(STORAGE_KEYS.SEARCH_HISTORY, history.value)
  }

  function clearHistory() {
    history.value = []
    storage.set(STORAGE_KEYS.SEARCH_HISTORY, [])
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    suggestions.value = []
  }

  return {
    query,
    suggestions,
    history,
    isOpen,
    isLoading,
    updateSuggestions,
    addToHistory,
    clearHistory,
    open,
    close,
  }
})
