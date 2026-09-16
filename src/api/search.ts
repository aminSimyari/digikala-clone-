import apiClient from './client'
import type { Product, ProductListResponse } from '../types/product'

interface SearchSuggestionItem {
  id: number
  title: string
  url: string
  type?: string
}

interface SearchSuggestionResponse {
  data: {
    suggestions: SearchSuggestionItem[]
  }
  status: string
}

/**
 * Simple debounce utility for async functions
 */
function debounceAsync<F extends (...args: string[]) => Promise<unknown>>(
  fn: F,
  ms: number
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { fn(...args) }, ms)
  }
}

/**
 * Get search suggestions
 */
async function fetchSearchSuggestionsRaw(query: string): Promise<SearchSuggestionItem[]> {
  if (!query || query.length < 2) return []
  try {
    const response = await apiClient<SearchSuggestionResponse>('/v1/search-suggestion/', {
      params: { q: query } as Record<string, string | number | boolean>,
      cache: true,
    })
    return response.data?.suggestions || []
  } catch {
    return []
  }
}

// Store latest results
let latestSuggestions: SearchSuggestionItem[] = []

/**
 * Fetch suggestions (non-debounced, returns results directly)
 */
export async function getSearchSuggestions(query: string): Promise<SearchSuggestionItem[]> {
  const results = await fetchSearchSuggestionsRaw(query)
  latestSuggestions = results
  return results
}

/**
 * Debounced trigger for suggestions
 */
export const triggerSuggestions = debounceAsync(fetchSearchSuggestionsRaw, 300)

/**
 * Get latest suggestions (after debounce fires)
 */
export function getLatestSuggestions(): SearchSuggestionItem[] {
  return latestSuggestions
}

/**
 * Perform search and return results
 */
export async function search(query: string, page = 1): Promise<{
  products: Product[]
  total: number
  query: string
}> {
  if (!query) return { products: [], total: 0, query: '' }
  try {
    const response = await apiClient<ProductListResponse>('/v1/search/', {
      params: {
        q: query,
        page,
        size: 20,
      } as Record<string, string | number | boolean>,
    })
    return {
      products: response.data?.products || [],
      total: response.data?.paging?.total || 0,
      query,
    }
  } catch {
    return { products: [], total: 0, query }
  }
}
