/**
 * Type-safe localStorage wrapper
 */
export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage write failed */
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // silent
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch {
      // silent
    }
  },
}

// Storage keys
export const STORAGE_KEYS = {
  CART: 'digikala_cart',
  FAVORITES: 'digikala_favorites',
  SEARCH_HISTORY: 'digikala_search_history',
  USER_PREFERENCES: 'digikala_user_prefs',
} as const
