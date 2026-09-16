<template>
  <div class="flex items-center justify-center" :class="containerClass" role="status" aria-label="در حال بارگذاری">
    <div
      class="animate-spin rounded-full border-2 border-gray-200 border-t-[#ed1b2f]"
      :class="sizeClass"
    />
    <span v-if="text" class="mr-2 text-sm text-gray-500">{{ text }}</span>
    <span class="sr-only">در حال بارگذاری...</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    text?: string
    fullscreen?: boolean
  }>(),
  { size: 'md', text: '', fullscreen: false }
)

const sizeClass = computed(() => ({
  'w-4 h-4': props.size === 'sm',
  'w-8 h-8': props.size === 'md',
  'w-12 h-12': props.size === 'lg',
}))

const containerClass = computed(() => ({
  'min-h-screen': props.fullscreen,
  'py-8': !props.fullscreen,
}))
</script>
