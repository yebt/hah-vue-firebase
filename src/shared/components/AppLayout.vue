<script setup lang="ts">
import AppHeader from './AppHeader.vue'

defineProps<{
  /** Hides the header for pages that manage their own chrome (e.g. full-screen auth) */
  bare?: boolean
}>()
</script>

<template>
  <div class="app-layout">
    <AppHeader v-if="!bare">
      <template #actions>
        <slot name="header-actions" />
      </template>
    </AppHeader>

    <main class="app-layout__main">
      <slot />
    </main>

    <footer v-if="!bare" class="app-layout__footer">
      <div class="app-layout__footer-inner">
        <span class="text-sm text-gray-400">HAH &copy; {{ new Date().getFullYear() }}</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  @apply min-h-screen flex flex-col bg-slate-50;
}

.app-layout__main {
  @apply flex-1;
}

.app-layout__footer {
  @apply border-t border-slate-200 bg-white;
}

.app-layout__footer-inner {
  @apply max-w-5xl mx-auto px-4 py-4 flex items-center justify-center;
}
</style>
