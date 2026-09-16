<template>
  <div class="relative overflow-hidden" :class="containerClass">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :class="imgClass"
      loading="lazy"
      decoding="async"
      @load="loaded = true"
      @error="error = true"
    />
    <div v-if="!loaded && !error" class="absolute inset-0 bg-gray-100 animate-pulse" />
    <div v-if="error" class="absolute inset-0 bg-gray-100 flex items-center justify-center">
      <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    src: string
    alt: string
    width?: number
    height?: number
    imgClass?: string
    containerClass?: string
  }>(),
  {
    width: 200,
    height: 200,
    imgClass: 'w-full h-full object-contain',
    containerClass: '',
  }
)

const loaded = ref(false)
const error = ref(false)
</script>
