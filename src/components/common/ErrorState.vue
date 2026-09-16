<template>
  <div class="flex flex-col items-center justify-center py-8 px-4 text-center" role="alert">
    <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
    <p class="text-sm text-gray-500 mb-3">{{ message || 'در بارگذاری این بخش مشکلی پیش آمد.' }}</p>
    <button
      v-if="showRetry"
      @click="$emit('retry')"
      class="text-sm text-[#ed1b2f] hover:text-[#c41620] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#ed1b2f] focus:ring-offset-2 rounded px-3 py-1"
    >
      تلاش مجدد
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
    showRetry?: boolean
  }>(),
  {
    message: '',
    showRetry: true,
  }
)

defineEmits<{
  retry: []
}>()
</script>
