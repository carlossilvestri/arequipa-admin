<template>
  <div
    class="rounded-xl shadow-lg overflow-hidden border transition-all duration-300 transform hover:-translate-y-1"
    :class="[
      themeClasses.card,
      {
        'opacity-70': !indicador.activo,
        'border-blue-400/30 dark:border-blue-500/30': indicador.permitecomparacion,
        'ring-2 ring-blue-500/20 dark:ring-blue-400/20': indicador.permitecomparacion,
      },
    ]"
  >
    <!-- Header con información principal -->
    <div class="px-6 py-4 border-b" :class="themeClasses.border">
      <div class="flex justify-between items-start mb-3">
        <!-- Código y nombre -->
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-1"></div>
          <h3
            class="text-lg font-bold leading-tight transition-colors mt-2 h-[50px] overflow-hidden"
            :class="themeClasses.text.primary"
          >
            {{ truncateTextWithEllipsis(indicador.nombreindicador, 80) }}
          </h3>
        </div>
        <!-- Botón para deseleccionar -->
        <button
          @click="$emit('deseleccionar', indicador)"
          class="ml-3 p-1.5 rounded-md transition-colors"
          :class="
            isDark
              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          "
          aria-label="Deseleccionar indicador"
          title="Quitar"
        >
          <TrashIcon />
        </button>
      </div>

      <!-- Jerarquía grupo/subgrupo -->
      <div
        class="flex items-center text-sm transition-colors min-h-[40px]"
        :class="themeClasses.text.secondary"
      >
        <div class="flex items-center space-x-2">
          <svg
            class="w-4 h-4 transition-colors"
            :class="themeClasses.icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2" />
            <!-- Barras verticales desde abajo: larga, corta, larga -->
            <path d="M8 17V8" stroke-width="2" stroke-linecap="round" />
            <path d="M12 17V12" stroke-width="2" stroke-linecap="round" />
            <path d="M16 17V8" stroke-width="2" stroke-linecap="round" />
          </svg>

          <span :class="themeClasses.text.accent">{{
            truncateTextWithEllipsis(indicador.nombreunidadmedida, 80)
          }}</span>
        </div>
      </div>

      <!-- Botón para abrir detalles -->
      <div class="mt-1">
        <button
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="themeClasses.button.primary"
          @click="showDetails = true"
        >
          Ver más detalles
        </button>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="p-6">
      <!-- Elegir tipo de gráfica -->
      <SelectInput
        :options="[
          { value: 'line', label: 'Línea' },
          { value: 'bar', label: 'Barras' },
          { value: 'pie', label: 'Pie' },
          { value: 'scatter', label: 'Dispersión' },
          { value: 'radar', label: 'Radar' },
        ]"
        label="Tipo de gráfico"
        id="GRAFICO"
        placeholder="Seleccione un tipo de gráfico"
      />
      <!-- Elegir tipo de territorio -->
      <div class="mt-3">
        <SelectInput
          v-model="selectedTerritoryType"
          :options="
            territoryTypeStore.territoryTypes.map((pt) => ({
              value: pt.idtipoterritorio,
              label: pt.nombretipoterritorio,
            }))
          "
          label="Tipo de territorio"
          id="IDTIPOTERREITORIO"
          placeholder="Seleccione un tipo de territorio"
        />
      </div>
      <!-- Elegir periodo -->
      <div class="mt-3">
        <label
          for="IDTIPOPERIODO"
          class="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >Tipo de periodo</label
        >
        <div class="flex items-center space-x-2">
          <SelectInput
            v-model="selectedPeriodType"
            :options="
              periodTypeStore.periodTypes.map((pt) => ({
                value: pt.idtipoperiodo,
                label: pt.nombretipoperiodo,
              }))
            "
            label=""
            id="IDTIPOPERIODO"
            placeholder="Seleccione un tipo de período"
          />
          <SelectInput
            v-model="selectedPeriodTypeUntil"
            :options="
              periodTypeStore.periodTypes.map((pt) => ({
                value: pt.idtipoperiodo,
                label: pt.nombretipoperiodo,
              }))
            "
            id="IDTIPOPERIODO"
            label=""
            placeholder="Seleccione un tipo de período"
          />
        </div>
      </div>

      <div class="mt-3">
        <Checkbox
          :name="`ENLAGRAFICA-${props.indicador.idindicador}`"
          :modelValue="checkboxValue"
          @update:modelValue="checkboxValue = $event"
          label="Incluir este indicador en la gráfica"
        />
      </div>
    </div>
  </div>

  <!-- Modal de detalles -->
  <ModalIndicatorDetail v-model:open="showDetails" :indicador="indicador" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BOIndicadorDto } from '@/interfaces/index'
import { useTheme } from '@/composables/useTheme'
import { truncateTextWithEllipsis } from '@/utilities'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import { usePeriodTypeStore } from '@/stores/periodType'
import { useTerritoryTypeStore } from '@/stores/territoryType'
import TrashIcon from '@/icons/TrashIcon.vue'
import Checkbox from '@/components/common/custom/Checkbox.vue'
import ModalIndicatorDetail from '@/components/common/custom/ModalIndicatorDetail.vue'

// Props
interface Props {
  indicador: BOIndicadorDto
}

const props = defineProps<Props>()
const periodTypeStore = usePeriodTypeStore()
const territoryTypeStore = useTerritoryTypeStore()
// Emits
const emit = defineEmits<{
  editar: [indicator: BOIndicadorDto]
  'toggle-activo': [indicator: BOIndicadorDto]
  'ver-detalle': [indicator: BOIndicadorDto]
  deseleccionar: [indicator: BOIndicadorDto]
}>()

// Tema actual (puede venir de un store, prop o composable)
// En una app real, esto vendría de un composable useTheme o store
const { isDark } = useTheme()

// Tipo de gráfico seleccionado para este indicador
const chartType = ref<'line' | 'bar' | 'area' | 'pie' | 'scatter' | 'radar'>('line')
const selectedPeriodType = ref<string | number | null>(null)
const selectedPeriodTypeUntil = ref<string | number | null>(null)
const selectedTerritoryType = ref<string | number | null>(null)
const showDetails = ref(false)
const checkboxValue = ref(false)

// Clases dinámicas según el tema
const themeClasses = computed(() => ({
  // Fondo del card
  card: isDark.value
    ? 'bg-gray-800 border-gray-700 shadow-gray-900/30 hover:shadow-gray-900/50'
    : 'bg-white border-gray-200 hover:shadow-xl',

  // Bordes
  border: isDark.value ? 'border-gray-700' : 'border-gray-100',

  // Footer
  footer: isDark.value ? 'bg-gray-800/50' : 'bg-gray-50',

  // Textos
  text: {
    primary: isDark.value ? 'text-gray-100' : 'text-gray-900',
    secondary: isDark.value ? 'text-gray-400' : 'text-gray-600',
    accent: isDark.value ? 'text-gray-300' : 'text-gray-700',
    muted: isDark.value ? 'text-gray-500' : 'text-gray-400',
    label: isDark.value ? 'text-gray-500' : 'text-gray-500',
    paragraph: isDark.value ? 'text-gray-300' : 'text-gray-600',
    mono: isDark.value ? 'text-gray-300' : 'text-gray-700',
    highlight: isDark.value ? 'text-blue-400' : 'text-blue-600',
  },

  // Iconos
  icon: isDark.value ? 'text-gray-400' : 'text-gray-500',
  iconContainer: isDark.value ? 'bg-gray-700' : 'bg-white',
  iconPrimary: isDark.value ? 'text-blue-400' : 'text-blue-600',
  iconSecondary: isDark.value ? 'text-gray-400' : 'text-gray-600',
  iconSuccess: isDark.value ? 'text-green-400' : 'text-green-500',

  // Paneles
  panel: {
    primary: isDark.value ? 'bg-gray-700/50' : 'bg-blue-50',
    secondary: isDark.value ? 'bg-gray-700/30' : 'bg-gray-50',
    iconContainer: isDark.value ? 'bg-gray-600' : 'bg-white',
  },

  // Badges
  badge: {
    primary: isDark.value
      ? 'bg-blue-900/50 text-blue-300 border border-blue-800/50'
      : 'bg-blue-100 text-blue-800',
    secondary: isDark.value ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700',
    comparacion: isDark.value
      ? 'bg-purple-900/30 text-purple-300 border border-purple-800/50'
      : 'bg-purple-50 text-purple-700 border border-purple-100',
  },

  // Estados
  status: {
    active: isDark.value
      ? 'bg-green-900/30 text-green-300 border-green-800/50'
      : 'bg-green-100 text-green-800 border-green-200',
    inactive: isDark.value
      ? 'bg-red-900/30 text-red-300 border-red-800/50'
      : 'bg-red-100 text-red-800 border-red-200',
  },

  // Botones
  button: {
    primary: isDark.value
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: isDark.value
      ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30'
      : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50',
    danger: isDark.value
      ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30'
      : 'text-red-600 hover:text-red-800 hover:bg-red-50',
    success: isDark.value
      ? 'text-green-400 hover:text-green-300 hover:bg-green-900/30'
      : 'text-green-600 hover:text-green-800 hover:bg-green-50',
    ghost: isDark.value
      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
  },

  // Enlaces
  link: isDark.value ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800',

  // Errores
  error: {
    container: isDark.value ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50 border-red-100',
    text: isDark.value ? 'text-red-300' : 'text-red-700',
    icon: isDark.value ? 'text-red-400' : 'text-red-500',
  },
}))

// Métodos (no se requieren utilidades del modal aquí)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transiciones suaves para modo oscuro */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.ql-tooltip.ql-hidden {
  display: none;
}
</style>
