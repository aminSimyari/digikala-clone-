import type { ProductImage } from './product'

export interface Category {
  id: number
  title: string
  title_en?: string
  url?: string
  icon?: ProductImage
  image?: ProductImage
  children?: Category[]
  level?: number
  order?: number
}

export interface CategoryTreeResponse {
  data: Category[]
  status: string
}

export interface HomepageCategory {
  id: number
  title: string
  title_en?: string
  url: string
  image?: ProductImage
  icon?: ProductImage
}
