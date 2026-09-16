export interface ProductImage {
  id: number
  path: string
  alt: string
  title: string
}

export interface ProductRating {
  rating: number
  count: number
}

export interface ProductPrice {
  selling_price: number
  rrp: number
  discount: number
  currency: string
}

export interface Product {
  id: number
  title: string
  title_en?: string
  lead_product_variants_counter: number
  rating?: ProductRating
  images: ProductImage[]
  category?: ProductCategory
  price?: ProductPrice
  brand?: ProductBrand
  status?: string
  seller?: ProductSeller
  colors?: ProductColor[]
  default_variant_id?: number
  order_limit?: number
}

export interface ProductCategory {
  id: number
  title: string
  title_en?: string
  url?: string
}

export interface ProductBrand {
  id: number
  title: string
  title_en?: string
  logo?: ProductImage
}

export interface ProductSeller {
  id: number
  title: string
  rating?: ProductRating
}

export interface ProductColor {
  id: number
  color: string
  title: string
}

export interface ProductListResponse {
  data: {
    products: Product[]
    paging: PagingInfo
    facets?: Facet[]
  }
  status: string
}

export interface ProductDetailResponse {
  data: Product
  status: string
}

export interface PagingInfo {
  total: number
  start: number
  end: number
}

export interface Facet {
  id: string
  title: string
  type: string
  options: FacetOption[]
}

export interface FacetOption {
  id: string | number
  title: string
  count: number
  url: string
  value?: string
}
