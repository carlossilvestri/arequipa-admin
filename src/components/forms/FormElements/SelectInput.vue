<template>
  <div class="space-y-6">
    <!-- Single Select Input -->
    <div
      :class="labelPosition === 'left' ? 'flex flex-col sm:flex-row sm:items-center sm:gap-4' : ''"
    >
      <label
        v-if="label"
        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
        :for="id"
        :class="labelPosition === 'left' ? 'mb-2 sm:mb-0 flex-shrink-0 w-32' : ''"
      >
        {{ label }}
      </label>
      <div class="relative z-20 bg-transparent" :class="labelPosition === 'left' ? 'flex-1' : ''">
        <select
          v-model="internalValue"
          :disabled="disabled"
          :id="id"
          class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          :class="[{ 'text-gray-800 dark:text-white/90': internalValue }, selectClass]"
        >
          <option v-if="placeholder" :value="''" disabled>{{ placeholder }}</option>
          <option
            v-for="(opt, idx) in options"
            :key="idx + '-' + String(opt?.[optionValue])"
            :value="opt?.[optionValue]"
            class="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {{ opt?.[optionLabel] }}
          </option>
        </select>
        <span
          class="absolute z-30 text-gray-700 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400"
        >
          <svg
            class="stroke-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
              stroke=""
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'

type Primitive = string | number | boolean | null | undefined
type OptionType = Record<string, any>

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object, null] as PropType<Primitive | object>,
    default: '',
  },
  options: {
    type: Array as PropType<OptionType[]>,
    default: () => [],
  },
  label: { type: String, default: 'Seleccionar' },
  placeholder: { type: String, default: '' },
  optionValue: { type: String, default: 'value' },
  optionLabel: { type: String, default: 'label' },
  disabled: { type: Boolean, default: false },
  id: { type: String, default: '' },
  labelPosition: {
    type: String as PropType<'top' | 'left'>,
    default: 'top',
    validator: (value: string) => ['top', 'left'].includes(value),
  },
  selectClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}>()

const internalValue = ref<any>(props.modelValue)

watch(
  () => props.modelValue,
  (v) => {
    internalValue.value = v
  },
)

watch(
  () => internalValue.value,
  (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
)
</script>
