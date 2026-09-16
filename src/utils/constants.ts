export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.digikala.com'
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'https://dkstatics-public.digikala.com'
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.digikala.com'

// Placeholder SVG data URI for images
const PLACEHOLDER_SVG = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#f3f4f6" width="200" height="200"/><text fill="#9ca3af" font-family="Arial,sans-serif" font-size="14" text-anchor="middle" x="100" y="105">تصویر</text></svg>')

// Logo SVG
const LOGO_SVG = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="110" height="28" viewBox="0 0 110 28"><rect width="110" height="28" rx="4" fill="#ed1b2f"/><text x="55" y="19" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">دیجی‌کالا</text></svg>')

export const ENDPOINTS = {
  HOMEPAGE: '/v1/homepage/',
  PRODUCTS: '/v1/search/',
  PRODUCT_DETAIL: (id: number) => `/v1/product/${id}/`,
  CATEGORIES: '/v1/category/',
  CATEGORY_TREE: '/v1/category-tree/',
  BANNERS: '/v1/banner/',
  SEARCH: '/v1/search/',
  SEARCH_SUGGEST: '/v1/search-suggestion/',
} as const

export const getImageUrl = (path: string): string => {
  if (!path) return PLACEHOLDER_SVG
  if (path.startsWith('http')) return path
  if (path.startsWith('//')) return `https:${path}`
  if (path.startsWith('data:')) return path
  return `${IMAGE_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

export const getProductImageUrl = (id: number, variant?: number): string => {
  const v = variant || id
  return `${IMAGE_BASE_URL}/digikala/products/${v}/${v}_1.jpg`
}

export const getCategoryImageUrl = (id: number): string => {
  return `${IMAGE_BASE_URL}/digikala/categories/${id}.png`
}

export const getBannerImageUrl = (id: number): string => {
  return `${IMAGE_BASE_URL}/digikala/banners/${id}/${id}.jpg`
}

export const LOGO_URL = LOGO_SVG
export const PLACEHOLDER = PLACEHOLDER_SVG
