import type { Product } from '../types/product'
import type { Banner, Story } from '../types/banner'
import type { HomepageCategory } from '../types/category'
import { PLACEHOLDER } from '../utils/constants'

export interface HomepageSection {
  id: number
  title: string
  type: string
  products?: Product[]
  banners?: Banner[]
  categories?: HomepageCategory[]
  url?: string
}

export interface HomepageData {
  sections: HomepageSection[]
  banners: Banner[]
  stories: Story[]
  categories: HomepageCategory[]
}

function generateHomepageData(): HomepageData {
  const catNames = ['موبایل', 'لپتاپ', 'تلویزیون', 'اسپیکر', 'هندزفری', 'ساعت هوشمند', 'تبلت', 'کنسول بازی', 'پاوربانک', 'دوربین', 'لوازم خانگی', 'پوشاک']
  const catUrls = ['/category/mobile-phone/', '/category/laptop/', '/category/tv/', '/category/speaker/', '/category/headphone/', '/category/smart-watch/', '/category/tablet/', '/category/gaming-console/', '/category/power-bank/', '/category/camera/', '/category/home-appliance/', '/category/apparel/']

  const categories: HomepageCategory[] = catNames.map((title, i) => ({
    id: i + 1, title, url: catUrls[i],
    image: { id: i + 1, path: PLACEHOLDER, alt: title, title },
    icon: { id: i + 1, path: PLACEHOLDER, alt: title, title },
  }))

  const mkP = (id: number, title: string, price: number, rrp: number, discount: number, rating: number, reviewCount: number): Product => ({
    id, title, lead_product_variants_counter: 1,
    images: [{ id, path: PLACEHOLDER, alt: title, title }],
    price: { selling_price: price, rrp, discount, currency: 'IRR' },
    brand: { id: 1, title: title.split(' ')[0] },
    rating: { rating, count: reviewCount },
    status: 'marketable',
  })

  const mkBanner = (id: number, alt: string, link: string): Banner => ({
    id, image: { id, path: PLACEHOLDER, alt, title: alt }, link, title: alt,
  })

  return {
    banners: [
      mkBanner(1, 'فروش ویژه موبایل', '/category/mobile-phone/'),
      mkBanner(2, 'فروش ویژه لپتاپ', '/category/laptop/'),
      mkBanner(3, 'پیشنهادات سوپرمارکتی', '/supermarket/'),
    ],
    stories: [],
    categories,
    sections: [
      { id: 1, title: 'پیشنهادات شگفت‌انگیز', type: 'amazing_offers', products: [
        mkP(21600058, 'ادوپرفیوم زنانه هارلینگن', 6290000, 17000000, 63, 80, 125),
        mkP(22078235, 'گوشی سامسونگ Galaxy A54 5G', 15999000, 18999000, 16, 85, 342),
        mkP(6850997, 'گوشی اپل iPhone 15 Pro Max', 89999000, 99999000, 10, 95, 892),
        mkP(8558413, 'لپتاپ اپل MacBook Air M2', 52999000, 59999000, 12, 92, 156),
        mkP(19162461, 'تلویزیون سامسونگ 55 اینچ QLED', 42999000, 52999000, 19, 88, 67),
      ]},
      { id: 2, title: 'بنرهای تبلیغاتی', type: 'promo_banners', banners: [
        mkBanner(101, 'فروش ویژه موبایل', '/category/mobile-phone/'),
        mkBanner(102, 'فروش ویژه لپتاپ', '/category/laptop/'),
        mkBanner(103, 'سوپرمارکت دیجی‌کالا', '/supermarket/'),
      ]},
      { id: 3, title: 'پرفروش‌ترین‌ها', type: 'best_sellers', products: [
        mkP(11111111, 'گوشی سامسونگ Galaxy S24 Ultra', 72999000, 79999000, 9, 93, 1234),
        mkP(22222222, 'گوشی اپل iPhone 15 Pro', 75999000, 82999000, 8, 94, 987),
        mkP(33333333, 'لپتاپ لنوو ThinkPad X1 Carbon', 62999000, 69999000, 10, 89, 234),
        mkP(44444444, 'تلویزیون ال جی 55 اینچ OLED', 55999000, 64999000, 14, 91, 156),
        mkP(55555555, 'هدفون سونی WH-1000XM5', 14999000, 18999000, 21, 96, 678),
      ]},
      { id: 4, title: 'پیشنهادات سوپرمارکتی', type: 'supermarket', products: [
        mkP(66666661, 'روغن زیتون توسکانی', 459000, 589000, 22, 78, 345),
        mkP(66666662, 'چای ایرانی گلستان', 289000, 349000, 17, 82, 567),
        mkP(66666663, 'شکر سفید کارخانه', 189000, 229000, 17, 75, 123),
        mkP(66666664, 'برنج ایرانی هاشمی', 1299000, 1599000, 19, 85, 234),
        mkP(66666665, 'ماکارونی زر', 49000, 65000, 25, 80, 456),
      ]},
      { id: 5, title: 'پربازدیدترین‌ها', type: 'most_visited', products: [
        mkP(77777771, 'گوشی شیائومی Redmi Note 13', 8999000, 10999000, 18, 86, 2345),
        mkP(77777772, 'ساعت شیائومی Watch S3', 4999000, 6499000, 23, 83, 567),
        mkP(77777773, 'هندزفری شیائومی Buds 4 Pro', 3499000, 4999000, 30, 88, 890),
        mkP(77777774, 'پاوربانک شیائومی ۲۰۰۰۰', 1299000, 1799000, 28, 84, 1234),
        mkP(77777775, 'اسپیکر شیائومی Sound Pocket', 899000, 1199000, 25, 81, 678),
      ]},
      { id: 6, title: 'بیشترین تخفیف', type: 'discounted', products: [
        mkP(88888881, 'گوشی سامسونگ Galaxy A14', 5499000, 7499000, 27, 79, 456),
        mkP(88888882, 'لپتاپ ایسوس VivoBook 15', 22999000, 29999000, 23, 82, 123),
        mkP(88888883, 'تلویزیون سامسونگ ۴۳ اینچ', 16999000, 21999000, 23, 80, 89),
        mkP(88888884, 'هدفون JBL Tune 510BT', 1499000, 2499000, 40, 85, 345),
        mkP(88888885, 'تبلت سامسونگ Galaxy Tab A9', 7999000, 10999000, 27, 83, 234),
      ]},
    ],
  }
}

export async function fetchHomepageData(): Promise<HomepageData> {
  return generateHomepageData()
}

export async function fetchBanners(): Promise<Banner[]> {
  return generateHomepageData().banners
}

export async function fetchStories(): Promise<Story[]> {
  return []
}
