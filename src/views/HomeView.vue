<template>
  <div>
    <!-- Content (loads immediately, no loading state needed) -->
    <div class="space-y-3">
      <BannerSlider
        v-if="homepageData.banners.length > 0"
        :banners="homepageData.banners"
      />

      <CategoryNav :categories="homepageData.categories" />

      <template v-for="section in homepageData.sections" :key="section.id">
        <ProductCarousel
          v-if="section.products && section.products.length > 0"
          :title="section.title"
          :products="section.products"
          :badge="section.type === 'amazing_offers' ? 'ویژه' : ''"
          :badge-class="section.type === 'amazing_offers' ? 'bg-[#ff6f00]' : ''"
          :show-link="true"
          :link-url="'/' + section.type + '/'"
        />

        <PromoBanners
          v-if="section.banners && section.banners.length > 0"
          :banners="section.banners"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Banner } from '../types/banner'
import type { HomepageCategory } from '../types/category'
import type { HomepageSection } from '../api/homepage'
import { fetchHomepageData } from '../api/homepage'
import BannerSlider from '../components/HeroBanner/BannerSlider.vue'
import CategoryNav from '../components/Navigation/CategoryNav.vue'
import ProductCarousel from '../components/ProductCarousel/ProductCarousel.vue'
import PromoBanners from '../components/Advertisement/PromoBanners.vue'

interface HomepageData {
  banners: Banner[]
  categories: HomepageCategory[]
  sections: HomepageSection[]
  stories: unknown[]
}

// Load data synchronously (fallback data is instant)
const homepageData = reactive<HomepageData>({
  banners: [],
  categories: [],
  sections: [],
  stories: [],
})

// Populate immediately (no async needed for fallback data)
fetchHomepageData().then((data) => {
  homepageData.banners = data.banners || []
  homepageData.categories = data.categories || []
  homepageData.sections = data.sections || []
  homepageData.stories = data.stories || []
})
</script>
