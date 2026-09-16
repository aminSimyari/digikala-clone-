/**
 * Format price in Persian/IR format
 */
export const formatPrice = (price: number): string => {
  if (!price && price !== 0) return ''
  return new Intl.NumberFormat('fa-IR').format(price)
}

/**
 * Format price with currency suffix
 */
export const formatPriceWithCurrency = (price: number): string => {
  if (!price && price !== 0) return ''
  return `${formatPrice(price)} تومان`
}

/**
 * Format large numbers (e.g., 1.2K, 5M)
 */
export const formatCompactNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace('.0', '') + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace('.0', '') + 'K'
  }
  return num.toString()
}

/**
 * Calculate discount percentage
 */
export const calcDiscount = (original: number, current: number): number => {
  if (!original || original <= 0) return 0
  return Math.round(((original - current) / original) * 100)
}

/**
 * Format discount percentage
 */
export const formatDiscount = (discount: number): string => {
  return `${discount}%`
}

/**
 * Truncate text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 1) + '…'
}

/**
 * Build product URL
 */
export const buildProductUrl = (id: number, title?: string): string => {
  const slug = title
    ? title
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w\u0600-\u06FF-]/g, '')
        .toLowerCase()
    : ''
  return `/product/dkp-${id}/${slug ? slug + '/' : ''}`
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Simple in-memory cache for API responses
 */
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export const getCached = <T>(key: string): T | null => {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  return entry.data as T
}

export const setCache = (key: string, data: unknown): void => {
  cache.set(key, { data, timestamp: Date.now() })
}

export const clearCache = (): void => {
  cache.clear()
}
