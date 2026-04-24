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
  @apply sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm;
}

.app-header__inner {
  @apply max-w-5xl mx-auto px-4 h-14 flex items-center gap-6;
}

.app-header__brand {
  @apply flex items-center gap-2 font-semibold text-base text-slate-900 no-underline shrink-0;
}

.app-header__logo {
  @apply flex h-7 w-7 items-center justify-center rounded-sm border border-indigo-300 bg-indigo-50 text-indigo-700 text-sm leading-none;
}

.app-header__name {
  @apply font-mono text-sm tracking-[0.2em];
}

.app-header__nav {
  @apply flex items-center gap-4 flex-1;
}

.app-header__actions {
  @apply flex items-center gap-2 shrink-0;
}
</style>
