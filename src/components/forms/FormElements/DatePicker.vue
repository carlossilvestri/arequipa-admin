<template>
  <div>
    <label class="text-gray-700 dark:text-gray-400">{{ label }}</label>

    <div class="mt-2">
      <VueDatePicker
        :model-value="modelValue"
        @update:model-value="(v) => emit('update:modelValue', v)"
        :placeholder="placeholder"
        :enable-time="enableTime"
        :auto-apply="autoApply"
        :format="format"
        :model-type="format"
        :dark="isDarkMode"
        :input-class-name="inputClass"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/components/layout/ThemeProvider.vue'
const theme = useTheme() as { isDarkMode: boolean }
const isDarkMode = theme.isDarkMode
const props = withDefaults(
  defineProps<{
    modelValue: string | Date | null
    placeholder?: string
    enableTime?: boolean
    autoApply?: boolean
    format?: any
    modelType?: 'date' | 'string' | 'timestamp'
    inputClass?: string
    label?: string
  }>(),
  {
    placeholder: 'Selecciona una fecha',
    enableTime: false,
    autoApply: true,
    format: 'yyyy-MM-dd',
    modelType: 'string',
    inputClass: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | Date | null): void
}>()
</script>
