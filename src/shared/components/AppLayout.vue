<script setup lang="ts">
import AppHeader from './AppHeader.vue'

defineProps<{
  bare?: boolean
}>()
</script>

<template>
  <div class="flex min-h-screen flex-col [background:var(--bg)]">
    <div
      class="flex min-h-9 items-center justify-center gap-2 border-b px-4 py-2 text-center [border-color:var(--amber-mid)] [background:var(--amber-bg)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--amber)]"
    >
      <i class="i-lucide-triangle-alert" />
      <span>HAH is work in progress — some features may be unavailable while the app is still being built.</span>
    </div>

    <AppHeader v-if="!bare">
      <template #actions>
        <slot name="header-actions" />
      </template>
    </AppHeader>

    <main class="flex-1">
      <slot />
    </main>

    <footer v-if="!bare" class="border-t [border-color:var(--border)] [background:var(--bg2)]">
      <div
        class="mx-auto flex min-h-11 max-w-[var(--max)] items-center gap-y-2 px-[var(--gutter)] max-sm:flex-wrap max-sm:py-2"
      >
        <span
          class="mr-4 border-r pr-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-semibold tracking-[0.15em] [color:var(--ink)]"
        >
          HAH
        </span>
        <span class="flex-1 [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:var(--ink3)] max-sm:basis-full max-sm:order-3">
          Habit and health tracker · {{ new Date().getFullYear() }}
        </span>
        <div class="flex max-sm:w-full">
          <a
            href="#privacy"
            class="border-l px-[14px] [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:44px] [color:var(--ink3)] transition-colors duration-150 hover:[color:var(--ink)]"
          >
            Privacy
          </a>
          <a
            href="#terms"
            class="border-l px-[14px] [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:44px] [color:var(--ink3)] transition-colors duration-150 hover:[color:var(--ink)]"
          >
            Terms
          </a>
          <a
            href="https://github.com/yebt/hah-vue-firebase"
            rel="noopener"
            target="_blank"
            class="border-l px-[14px] [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:44px] [color:var(--ink3)] transition-colors duration-150 hover:[color:var(--ink)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
