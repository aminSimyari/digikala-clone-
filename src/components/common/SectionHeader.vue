<template>
  <div class="flex items-center justify-between mb-2.5">
    <div class="flex items-center gap-2">
      <h2 class="text-sm md:text-base font-bold text-gray-800">{{ title }}</h2>
      <span v-if="badge" class="text-xs text-white px-1.5 py-0.5 rounded font-bold" :class="badgeClass">{{ badge }}</span>
    </div>
    <a
      v-if="showLink"
      :href="linkUrl"
      class="text-xs text-[#0f0c8c] hover:text-[#ed1b2f] flex items-center gap-0.5 transition-colors"
      :aria-label="linkLabel || 'مشاهده همه ' + title"
    >
      {{ linkText || 'مشاهده همه' }}
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    badge?: string
    badgeClass?: string
    showLink?: boolean
    linkUrl?: string
    linkText?: string
    linkLabel?: string
  }>(),
  {
    badge: '',
    badgeClass: 'bg-[#ff6f00]',
    showLink: false,
    linkUrl: '#',
    linkText: '',
    linkLabel: '',
  }
)
</script>
