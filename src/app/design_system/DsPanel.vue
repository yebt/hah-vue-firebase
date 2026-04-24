<script setup lang="ts">
defineProps<{
  description?: string
  eyebrow?: string
  title?: string
}>()
</script>

<template>
  <section class="rounded-[4px] border [border-color:var(--border)] [background:var(--bg2)]">
    <div v-if="eyebrow || title || description || $slots.header" class="border-b px-5 py-4 [border-color:var(--border)]">
      <slot name="header">
        <p
          v-if="eyebrow"
          class="[font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.14em] [color:var(--ink3)]"
        >
          {{ eyebrow }}
        </p>
        <h2
          v-if="title"
          class="mt-1 [font-family:var(--mono)] [font-size:var(--text-xl)] [line-height:var(--lh-xl)] font-semibold tracking-[-0.02em] [color:var(--ink)]"
        >
          {{ title }}
        </h2>
        <p v-if="description" class="mt-2 [font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
          {{ description }}
        </p>
      </slot>
    </div>

    <div class="p-5">
      <slot />
    </div>
  </section>
</template>
