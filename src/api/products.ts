import apiClient from './client'
import type { Product, ProductListResponse } from '../types/product'
import { getImageUrl, PLACEHOLDER } from '../utils/constants'

interface SearchParams {
  q?: string
  page?: number
  size?: number
  sort?: 'most_popular' | 'best_selling' | 'most_visited' | 'newest' | 'cheapest' | 'expensive'
  category?: number
  brand?: number
  min_price?: number
  max_price?: number
  has_discount?: boolean
}

/**
 * Search products
 */
export async function searchProducts(params: SearchParams = {}): Promise<Product[]> {
  try {
    const response = await apiClient<ProductListResponse>('/v1/search/', {
      params: {
        page: 1,
        size: 20,
        ...params,
      } as Record<string, string | number | boolean>,
      cache: true,
    })
    return response.data?.products || []
  } catch {
    return []
  }
}

/**
 * Fetch products by category
 */
export async function fetchCategoryProducts(
  categoryId: number,
  sort: SearchParams['sort'] = 'most_popular',
  page = 1
): Promise<Product[]> {
  try {
    const response = await apiClient<ProductListResponse>('/v1/search/', {
      params: {
        page,
        size: 20,
        category: categoryId,
        sort,
      } as Record<string, string | number | boolean>,
      cache: true,
    })
    return response.data?.products || []
  } catch {
    return []
  }
}

/**
 * Fetch product details
 */
export async function fetchProductDetail(productId: number): Promise<Product | null> {
  try {
    const response = await apiClient<{ data: Product }>(`/v1/product/${productId}/`, { cache: true })
    return response.data
  } catch {
    return null
  }
}

/**
 * Fetch best sellers
 */
export async function fetchBestSellers(): Promise<Product[]> {
  try {
    const response = await apiClient<ProductListResponse>('/v1/search/', {
      params: {
        page: 1,
        size: 20,
        sort: 'best_selling',
      } as Record<string, string | number | boolean>,
      cache: true,
    })
    return response.data?.products || []
  } catch {
    return []
  }
}

/**
 * Fetch newest products
 */
export async function fetchNewestProducts(): Promise<Product[]> {
  try {
    const response = await apiClient<ProductListResponse>('/v1/search/', {
      params: {
        page: 1,
        size: 20,
        sort: 'newest',
      } as Record<string, string | number | boolean>,
      cache: true,
    })
    return response.data?.products || []
  } catch {
    return []
  }
}

/**
 * Fetch products with discount
 */
export async function fetchDiscountedProducts(): Promise<Product[]> {
  try {
    const response = await apiClient<ProductListResponse>('/v1/search/', {
      params: {
        page: 1,
        size: 20,
        sort: 'best_selling',
        has_discount: true,
      } as Record<string, string | number | boolean>,
      cache: true,
    })
    return response.data?.products || []
  } catch {
    return []
  }
}

/**
 * Build product image URL from product data
 */
export function getProductImage(product: Product): string {
  if (product.images?.[0]?.path) {
    const path = product.images[0].path
    if (path.startsWith('data:')) return path
    return getImageUrl(path)
  }
  return PLACEHOLDER
}
