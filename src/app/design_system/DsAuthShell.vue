<script setup lang="ts">
import { RouterLink } from 'vue-router'

type HighlightTone = 'success' | 'warning'

defineProps<{
  description: string
  eyebrow: string
  highlights: ReadonlyArray<{
    icon: string
    text: string
    tone?: HighlightTone
  }>
  title: string
}>()

const toneClasses: Record<HighlightTone, string> = {
  success: '[color:var(--green)]',
  warning: '[color:var(--amber)]',
}
</script>

<template>
  <section class="flex min-h-[calc(100vh-36px)] items-center justify-center px-6 py-12 max-sm:px-4">
    <div class="w-full max-w-[1080px]">
      <RouterLink
        to="/"
        class="mb-7 inline-flex items-center gap-2 [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:var(--ink2)]"
      >
        <i class="i-lucide-arrow-left" />
        Back to landing
      </RouterLink>

      <div
        class="grid grid-cols-[minmax(0,1fr)_420px] border [border-color:var(--border)] [background:var(--bg2)] max-[860px]:grid-cols-1"
      >
        <div
          class="border-r p-10 [border-color:var(--border)] [background:var(--bg)] max-[860px]:border-r-0 max-[860px]:border-b max-sm:p-6"
        >
          <p
            class="mb-4 [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.14em] [color:var(--ink3)]"
          >
            {{ eyebrow }}
          </p>

          <h1
            class="mb-4 [font-family:var(--mono)] [font-size:var(--text-5xl)] [line-height:var(--lh-5xl)] font-semibold tracking-[-0.03em] [color:var(--ink)] max-sm:[font-size:var(--text-3xl)] max-sm:[line-height:var(--lh-3xl)]"
          >
            {{ title }}
          </h1>

          <p
            class="[font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]"
          >
            {{ description }}
          </p>

          <ul class="mt-6 grid list-none gap-3 p-0">
            <li
              v-for="item in highlights"
              :key="item.text"
              class="flex items-center gap-3 [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:var(--ink2)]"
            >
              <i :class="[item.icon, toneClasses[item.tone ?? 'success']]" class="shrink-0" />
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>

        <div class="p-10 max-sm:p-6">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
