import type { ProductImage } from './product'

export interface Banner {
  id: number
  title?: string
  alt?: string
  link?: string
  url?: string
  image?: ProductImage
  images?: ProductImage[]
  type?: string
}

export interface Story {
  id: number
  title: string
  image?: ProductImage
  url?: string
  type?: string
}

export interface HomepageBannersResponse {
  data: {
    banners: Banner[]
    stories?: Story[]
  }
  status: string
}

export interface SliderBanner {
  id: number
  image: string
  link: string
  alt: string
}
