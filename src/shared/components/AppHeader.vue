<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DsButton from '@/app/design_system/DsButton.vue'
</script>

<template>
  <header class="sticky top-0 z-50 border-b [border-color:var(--border)] [background:var(--bg2)]">
    <div class="mx-auto flex h-11 max-w-[var(--max)] items-stretch">
      <RouterLink
        to="/"
        class="flex shrink-0 items-center gap-2 border-r px-[18px] [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-semibold tracking-[0.12em] [color:var(--ink)]"
      >
        <i class="i-lucide-zap [font-size:var(--text-base)] [color:var(--blue)]" />
        <span>HAH</span>
      </RouterLink>

      <nav class="flex flex-1 items-stretch max-sm:hidden" aria-label="Main navigation">
        <a
          href="#overview"
          class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
        >
          Overview
        </a>
        <a
          href="#habits"
          class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
        >
          Features
        </a>
        <a
          href="#analytics"
          class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
        >
          Activity
        </a>
      </nav>

      <div class="ml-auto flex shrink-0 items-center gap-2 border-l px-4 [border-color:var(--border)] max-sm:px-3">
        <slot name="actions">
          <DsButton class="max-sm:hidden" size="sm" to="/login" variant="secondary">Sign in</DsButton>
          <DsButton size="sm" to="/signup">Create account</DsButton>
        </slot>
      </div>
    </div>
  </header>
</template>
