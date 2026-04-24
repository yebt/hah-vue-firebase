<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <RouterLink to="/" class="app-header__brand">
        <span class="app-header__logo" aria-hidden="true">
          <i class="i-lucide-zap" />
        </span>
        <span class="app-header__name">HAH</span>
      </RouterLink>

      <nav class="app-header__nav" aria-label="Main navigation">
        <slot name="nav" />
      </nav>

      <div class="app-header__actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  @apply border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50;
}

.app-header__inner {
  @apply max-w-5xl mx-auto px-4 h-14 flex items-center gap-6;
}

.app-header__brand {
  @apply flex items-center gap-2 font-bold text-lg text-gray-900 no-underline shrink-0;
}

.app-header__logo {
  @apply text-indigo-600 text-xl leading-none;
}

.app-header__name {
  @apply tracking-wide;
}

.app-header__nav {
  @apply flex items-center gap-4 flex-1;
}

.app-header__actions {
  @apply flex items-center gap-2 shrink-0;
}
</style>
