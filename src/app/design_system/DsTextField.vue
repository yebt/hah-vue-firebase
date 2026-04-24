<script setup lang="ts">
const model = defineModel<string>({ default: '' })

withDefaults(
  defineProps<{
    autocomplete?: string
    label: string
    minLength?: number
    name: string
    placeholder?: string
    required?: boolean
    type?: 'email' | 'password' | 'text'
  }>(),
  {
    autocomplete: undefined,
    minLength: undefined,
    placeholder: undefined,
    required: false,
    type: 'text',
  }
)
</script>

<template>
  <label class="grid gap-2">
    <span
      class="[font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-medium [color:var(--ink2)]"
    >
      {{ label }}
    </span>

    <input
      v-model="model"
      :autocomplete="autocomplete"
      class="h-10 border px-3 outline-none transition-[border-color] duration-150 [border-color:var(--border)] [background:var(--bg2)] [color:var(--ink)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [font-family:var(--sans)] focus:[border-color:var(--blue-mid)]"
      :minlength="minLength"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :type="type"
    />
  </label>
</template>
