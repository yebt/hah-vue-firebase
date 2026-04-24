<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    block?: boolean
    disabled?: boolean
    href?: string
    size?: 'sm' | 'md'
    to?: RouteLocationRaw
    type?: 'button' | 'submit' | 'reset'
    variant?: 'google' | 'light' | 'primary' | 'secondary'
  }>(),
  {
    block: false,
    disabled: false,
    size: 'md',
    type: 'button',
    variant: 'primary',
  }
)

const componentTag = computed(() => {
  if (props.to) {
    return RouterLink
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-[2px] border no-underline transition-[opacity,color,border-color,background-color] duration-150 [font-family:var(--mono)] font-medium'

const sizeClass = computed(() =>
  props.size === 'sm'
    ? 'h-7 px-3 [font-size:var(--text-xs)] [line-height:var(--lh-xs)]'
    : 'h-9 px-4 [font-size:var(--text-sm)] [line-height:var(--lh-sm)]'
)

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return '[background:transparent] [border-color:var(--border2)] [color:var(--ink2)] hover:[color:var(--ink)] hover:[border-color:var(--ink3)]'
    case 'light':
      return 'bg-white border-white [color:var(--ink)] hover:opacity-90'
    case 'google':
      return '[background:var(--bg2)] [border-color:var(--border2)] [color:var(--ink)] hover:[border-color:var(--ink3)]'
    default:
      return '[background:var(--ink)] [border-color:var(--ink)] text-white hover:opacity-90'
  }
})

const classes = computed(() => [
  baseClass,
  sizeClass.value,
  variantClass.value,
  props.block ? 'w-full' : '',
  props.disabled ? 'pointer-events-none opacity-40' : '',
])

const componentProps = computed(() => {
  if (props.to) {
    return {
      'aria-disabled': props.disabled ? 'true' : undefined,
      tabindex: props.disabled ? -1 : undefined,
      to: props.to,
    }
  }

  if (props.href) {
    return {
      'aria-disabled': props.disabled ? 'true' : undefined,
      href: props.href,
      tabindex: props.disabled ? -1 : undefined,
    }
  }

  return {
    disabled: props.disabled,
    type: props.type,
  }
})
</script>

<template>
  <component :is="componentTag" v-bind="componentProps" :class="classes">
    <slot />
  </component>
</template>
