<template>
  <div>
    <label v-if="label" class="mb-1.5 block text-sm text-gray-700 dark:text-white/80">
      {{ label }}
    </label>
    <input
      :id="id"
      :name="name"
      :inputmode="allowDecimals ? 'decimal' : 'numeric'"
      :placeholder="placeholder"
      :value="displayValue"
      @input="onInput"
      @blur="onBlur"
      type="text"
      class="h-11 w-full rounded-lg border bg-transparent px-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-white/3 dark:text-white/90"
      :class="[
        error
          ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10 dark:border-red-500'
          : 'border-gray-200 dark:border-gray-800',
      ]"
      autocomplete="off"
    />
    <p v-if="hint && !error" class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ hint }}</p>
    <p v-if="error" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [Number, String, null], default: null },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  allowDecimals: { type: Boolean, default: true },
  maxDecimals: { type: Number, default: 2 },
  required: { type: Boolean, default: false },
  min: { type: Number, default: undefined },
  max: { type: Number, default: undefined },
  name: { type: String, default: undefined },
  id: { type: String, default: undefined },
  hint: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'valid'])

const raw = ref('')
const error = ref('')

const displayValue = computed(() => {
  if (raw.value !== '') return raw.value
  if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '')
    return ''
  return String(props.modelValue)
})

watch(
  () => props.modelValue,
  (v) => {
    if (v === null || v === undefined || v === '') raw.value = ''
  },
)

function sanitize(value) {
  let v = value.replace(/,/g, '.')
  v = v.replace(/[^0-9.\-]/g, '')
  if (v.includes('-')) v = (v.startsWith('-') ? '-' : '') + v.replace(/-/g, '')
  if (!props.allowDecimals) {
    v = v.replace(/\..*/, '')
  } else {
    const parts = v.split('.')
    if (parts.length > 2) v = parts.shift() + '.' + parts.join('')
    if (parts.length >= 2 && props.maxDecimals >= 0) {
      parts[1] = (parts[1] || '').slice(0, props.maxDecimals)
      v = parts[0] + (parts[1] !== undefined ? '.' + parts[1] : '')
    }
  }
  v = v.replace(/^(-?)0+(\d)/, '$1$2')
  return v
}

function toNumber(v) {
  if (v === '' || v === '-' || v === '.' || v === '-.') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

function validate(n, vStr) {
  error.value = ''
  if (props.required && (n === null || n === undefined)) error.value = 'Campo requerido'
  if (error.value === '' && typeof props.min === 'number' && n !== null && n < props.min) {
    error.value = `Debe ser mayor o igual a ${props.min}`
  }
  if (error.value === '' && typeof props.max === 'number' && n !== null && n > props.max) {
    error.value = `Debe ser menor o igual a ${props.max}`
  }
  if (
    error.value === '' &&
    props.allowDecimals &&
    typeof props.maxDecimals === 'number' &&
    props.maxDecimals >= 0 &&
    vStr.includes('.')
  ) {
    const dec = vStr.split('.')[1] || ''
    if (dec.length > props.maxDecimals) error.value = `Máximo ${props.maxDecimals} decimales`
  }
  emit('valid', error.value === '')
}

function onInput(e) {
  const cleaned = sanitize(e.target.value)
  raw.value = cleaned
  const n = toNumber(cleaned)
  validate(n, cleaned)
  emit('update:modelValue', n)
}

function onBlur() {
  const n = toNumber(raw.value)
  validate(n, raw.value)
}
</script>

<style scoped></style>
