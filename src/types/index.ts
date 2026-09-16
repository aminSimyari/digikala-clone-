export * from './product'
export * from './category'
export * from './banner'

export interface ApiResponse<T> {
  data: T
  status: string
  message?: string
}

export interface SearchSuggestion {
  id: number
  title: string
  url: string
  type?: string
}

export interface SearchResult {
  data: {
    products: import('./product').Product[]
    query: string
    paging: import('./product').PagingInfo
    suggestions?: SearchSuggestion[]
  }
  status: string
}

export interface CartItem {
  id: number
  productId: number
  title: string
  image: string
  price: number
  quantity: number
  color?: string
  maxQuantity?: number
}

export interface FavoriteItem {
  id: number
  productId: number
  title: string
  image: string
  price: number
  addedAt: number
}
