<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="chartType in chartTypes"
      :key="chartType.value"
      :class="[
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2',
        isActive(chartType.value)
          ? 'bg-blue-600 text-white'
          : isDark
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      ]"
      @click="select(chartType.value)"
    >
      <span>{{ chartType.icon }}</span>
      <span>{{ chartType.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const { isDark } = useTheme()
const chartTypes = [
  { label: 'Línea', value: 'line', icon: '📈' },
  { label: 'Barras', value: 'bar', icon: '📊' },
  { label: 'Área', value: 'area', icon: '🔽' },
  { label: 'Pie', value: 'pie', icon: '🥧' },
  { label: 'Dispersión', value: 'scatter', icon: '⚫' },
  { label: 'Radar', value: 'radar', icon: '🔄' },
]

const current = computed(() => props.modelValue ?? 'line')
const isActive = (val: string) => current.value === val
const select = (val: string) => emit('update:modelValue', val)
</script>

<style></style>
