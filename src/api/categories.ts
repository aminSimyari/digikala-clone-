import apiClient from './client'
import type { Category, CategoryTreeResponse } from '../types/category'
import { getImageUrl, PLACEHOLDER } from '../utils/constants'

/**
 * Fetch category tree
 */
export async function fetchCategoryTree(): Promise<Category[]> {
  try {
    const response = await apiClient<CategoryTreeResponse>('/v1/category-tree/', { cache: true })
    return response.data || []
  } catch {
    return getFallbackCategories()
  }
}

/**
 * Fetch category details
 */
export async function fetchCategoryDetail(categoryId: number): Promise<Category | null> {
  try {
    const response = await apiClient<{ data: Category }>(`/v1/category/${categoryId}/`, { cache: true })
    return response.data
  } catch {
    return null
  }
}

/**
 * Build category image URL
 */
export function getCategoryImage(category: Category): string {
  if (category.icon?.path) return getImageUrl(category.icon.path)
  if (category.image?.path) return getImageUrl(category.image.path)
  return ''
}

/**
 * Fallback categories when API is not accessible
 */
function getFallbackCategories(): Category[] {
  const catImg = (id: number) => `https://dkstatics-public.digikala.com/digikala/categories/${id}.png`

  return [
    { id: 1, title: 'موبایل', icon: { id: 1, path: PLACEHOLDER, alt: 'موبایل', title: 'موبایل' } },
    { id: 2, title: 'لپتاپ', icon: { id: 2, path: PLACEHOLDER, alt: 'لپتاپ', title: 'لپتاپ' } },
    { id: 3, title: 'تلویزیون', icon: { id: 3, path: PLACEHOLDER, alt: 'تلویزیون', title: 'تلویزیون' } },
    { id: 4, title: 'اسپیکر', icon: { id: 4, path: PLACEHOLDER, alt: 'اسپیکر', title: 'اسپیکر' } },
    { id: 5, title: 'هندزفری', icon: { id: 5, path: PLACEHOLDER, alt: 'هندزفری', title: 'هندزفری' } },
    { id: 6, title: 'ساعت هوشمند', icon: { id: 6, path: PLACEHOLDER, alt: 'ساعت هوشمند', title: 'ساعت هوشمند' } },
    { id: 7, title: 'تبلت', icon: { id: 7, path: PLACEHOLDER, alt: 'تبلت', title: 'تبلت' } },
    { id: 8, title: 'کنسول بازی', icon: { id: 8, path: PLACEHOLDER, alt: 'کنسول بازی', title: 'کنسول بازی' } },
    { id: 9, title: 'پاوربانک', icon: { id: 9, path: PLACEHOLDER, alt: 'پاوربانک', title: 'پاوربانک' } },
    { id: 10, title: 'دوربین', icon: { id: 10, path: PLACEHOLDER, alt: 'دوربین', title: 'دوربین' } },
    { id: 11, title: 'لوازم خانگی', icon: { id: 11, path: PLACEHOLDER, alt: 'لوازم خانگی', title: 'لوازم خانگی' } },
    { id: 12, title: 'پوشاک', icon: { id: 12, path: PLACEHOLDER, alt: 'پوشاک', title: 'پوشاک' } },
  ]
}
