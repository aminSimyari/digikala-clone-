<template>
  <div ref="searchContainer" class="flex-1 max-w-2xl hidden md:block relative">
    <form role="search" aria-label="جستجوی محصولات" @submit.prevent="onSubmit">
      <div class="relative">
        <label for="search-input" class="sr-only">جستجوی محصولات</label>
        <input
          id="search-input"
          ref="inputRef"
          :value="query"
          type="search"
          placeholder="جستجوی محصولات، برندها و دسته‌بندی‌ها"
          class="w-full h-10 px-4 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#ed1b2f] focus:ring-1 focus:ring-[#ed1b2f] bg-gray-50 transition-colors"
          autocomplete="off"
          role="combobox"
          :aria-expanded="showSuggestions"
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @keydown.escape="close"
        />
        <button
          type="submit"
          class="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-gray-600 hover:text-[#ed1b2f] transition-colors"
          aria-label="جستجو"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>

    <!-- Suggestions dropdown -->
    <div
      v-if="showSuggestions"
      id="search-suggestions"
      class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
      role="listbox"
    >
      <!-- Loading -->
      <div v-if="isLoading" class="p-4 text-center text-sm text-gray-600">
        <div class="animate-spin w-5 h-5 border-2 border-gray-200 border-t-[#ed1b2f] rounded-full mx-auto mb-2" />
        در حال جستجو...
      </div>

      <!-- Suggestions -->
      <template v-else-if="suggestionItems.length > 0">
        <button
          v-for="(s, i) in suggestionItems"
          :key="s.id || i"
          class="w-full px-4 py-2.5 text-right text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          role="option"
          @mousedown.prevent="selectSuggestion(s)"
        >
          <svg class="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>{{ s.title }}</span>
        </button>
      </template>

      <!-- History -->
      <template v-else-if="showHistory && searchHistory.length > 0">
        <div class="px-4 py-2 text-xs text-gray-600 font-bold border-b border-gray-100 flex items-center justify-between">
          <span>جستجوهای اخیر</span>
          <button @mousedown.prevent="clearHistory" class="text-[#ed1b2f] hover:text-[#c41620] text-xs">پاک کردن</button>
        </div>
        <button
          v-for="(h, i) in searchHistory.slice(0, 5)"
          :key="i"
          class="w-full px-4 py-2 text-right text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          role="option"
          @mousedown.prevent="selectHistory(h)"
        >
          {{ h }}
        </button>
      </template>

      <!-- No results -->
      <div v-else-if="query.length >= 2" class="p-4 text-center text-sm text-gray-600">
        نتیجه‌ای یافت نشد
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getSearchSuggestions } from '../../api/search'
import { storage, STORAGE_KEYS } from '../../utils/storage'

interface Suggestion {
  id: number
  title: string
  url: string
}

const emit = defineEmits<{
  search: [query: string]
  clearHistory: []
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const searchContainer = ref<HTMLElement | null>(null)
const query = ref('')
const suggestionItems = ref<Suggestion[]>([])
const isLoading = ref(false)
const isFocused = ref(false)
const showHistory = ref(false)

const searchHistory = ref<string[]>(storage.get<string[]>(STORAGE_KEYS.SEARCH_HISTORY, []))

const showSuggestions = computed(() => {
  return isFocused.value && (suggestionItems.value.length > 0 || showHistory.value || query.value.length >= 2)
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  query.value = value
  showHistory.value = false

  if (debounceTimer) clearTimeout(debounceTimer)

  if (!value || value.length < 2) {
    suggestionItems.value = []
    if (!value) showHistory.value = true
    return
  }

  isLoading.value = true
  debounceTimer = setTimeout(async () => {
    try {
      suggestionItems.value = await getSearchSuggestions(value) as Suggestion[]
    } catch {
      suggestionItems.value = []
    } finally {
      isLoading.value = false
    }
  }, 300)
}

const onFocus = () => {
  isFocused.value = true
  if (!query.value) showHistory.value = true
}

const onBlur = () => {
  setTimeout(() => {
    isFocused.value = false
    showHistory.value = false
  }, 200)
}

const close = () => {
  isFocused.value = false
  showHistory.value = false
  inputRef.value?.blur()
}

const onSubmit = () => {
  if (query.value.trim()) {
    addToHistory(query.value.trim())
    emit('search', query.value.trim())
  }
}

const selectSuggestion = (s: Suggestion) => {
  addToHistory(s.title)
  query.value = s.title
  if (s.url) {
    window.location.href = s.url
  } else {
    window.location.href = '/search/?q=' + encodeURIComponent(s.title)
  }
}

const selectHistory = (h: string) => {
  query.value = h
  window.location.href = '/search/?q=' + encodeURIComponent(h)
}

const addToHistory = (q: string) => {
  searchHistory.value = [q, ...searchHistory.value.filter((h) => h !== q)].slice(0, 10)
  storage.set(STORAGE_KEYS.SEARCH_HISTORY, searchHistory.value)
}

const clearHistory = () => {
  searchHistory.value = []
  storage.set(STORAGE_KEYS.SEARCH_HISTORY, [])
}

const onClickOutside = (e: MouseEvent) => {
  if (searchContainer.value && !searchContainer.value.contains(e.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>
