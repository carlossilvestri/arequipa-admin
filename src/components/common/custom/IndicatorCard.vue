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
          <div class="flex items-center space-x-3 mb-1">
            <span
              class="px-3 py-1 text-sm font-bold rounded-lg transition-colors"
              :class="themeClasses.badge.primary"
            >
              {{ indicador.codigoindicador }}
            </span>
            <span
              class="text-xs font-medium px-2 py-1 rounded transition-colors"
              :class="themeClasses.badge.secondary"
            >
              ID: {{ indicador.idindicador }}
            </span>
          </div>
          <h3
            class="text-lg font-bold leading-tight transition-colors"
            :class="themeClasses.text.primary"
          >
            {{ indicador.nombreindicador }}
          </h3>
        </div>

        <!-- Estado activo/inactivo -->
        <div class="flex flex-col items-end">
          <span
            class="px-3 py-1 text-xs font-semibold rounded-full mb-2 border transition-colors"
            :class="indicador.activo ? themeClasses.status.active : themeClasses.status.inactive"
          >
            {{ indicador.activo ? 'ACTIVO' : 'INACTIVO' }}
          </span>
          <span
            v-if="indicador.permitecomparacion"
            class="px-2 py-1 text-xs font-medium rounded border transition-colors"
            :class="themeClasses.badge.comparacion"
          >
            Permite comparación
          </span>
        </div>
      </div>

      <!-- Jerarquía grupo/subgrupo -->
      <div class="flex items-center text-sm transition-colors" :class="themeClasses.text.secondary">
        <div class="flex items-center space-x-2">
          <svg
            class="w-4 h-4 transition-colors"
            :class="themeClasses.icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span class="font-medium transition-colors" :class="themeClasses.text.accent">
            {{ indicador.nombregrupo }}
          </span>
          <span :class="themeClasses.text.muted">/</span>
          <span :class="themeClasses.text.accent">{{ indicador.nombresubgrupo }}</span>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="p-6">
      <!-- Descripción -->
      <div class="mb-5">
        <QuillEditor
          :content="indicador.descripcionindicador || ''"
          content-type="html"
          :read-only="true"
          theme="bubble"
          class="prose prose-sm max-w-none transition-colors"
          :class="themeClasses.text.paragraph"
        />
      </div>

      <!-- Detalles del indicador -->
      <div class="space-y-4">
        <!-- Unidad de medida -->
        <div
          class="flex items-center justify-between p-3 rounded-lg transition-colors"
          :class="themeClasses.panel.primary"
        >
          <div class="flex items-center space-x-3">
            <div
              class="p-2 rounded-lg shadow-sm transition-colors"
              :class="themeClasses.panel.iconContainer"
            >
              <svg
                class="w-5 h-5 transition-colors"
                :class="themeClasses.icon.primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01m12-.01a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div class="text-xs transition-colors" :class="themeClasses.text.label">
                Unidad de medida
              </div>
              <div class="font-medium transition-colors" :class="themeClasses.text.primary">
                {{ indicador.nombreunidadmedida }}
                <span
                  v-if="indicador.simbolounidadmedida"
                  class="ml-1 transition-colors"
                  :class="themeClasses.text.highlight"
                >
                  ({{ indicador.simbolounidadmedida }})
                </span>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs transition-colors" :class="themeClasses.text.label">ID</div>
            <div class="font-mono text-sm transition-colors" :class="themeClasses.text.mono">
              {{ indicador.idunidadmedida }}
            </div>
          </div>
        </div>

        <!-- Disponibilidad referencial -->
        <div
          class="flex items-center justify-between p-3 rounded-lg transition-colors"
          :class="themeClasses.panel.secondary"
        >
          <div class="flex items-center space-x-3">
            <div
              class="p-2 rounded-lg shadow-sm transition-colors"
              :class="themeClasses.panel.iconContainer"
            >
              <svg
                class="w-5 h-5 transition-colors"
                :class="themeClasses.icon.secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div class="text-xs transition-colors" :class="themeClasses.text.label">
                Disponibilidad referencial
              </div>
              <div class="font-medium transition-colors" :class="themeClasses.text.primary">
                {{ indicador.disponibilidadreferencial }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between p-3 rounded-lg transition-colors"
          :class="themeClasses.panel.secondary"
        >
          <div class="flex items-center space-x-3">
            <div
              class="p-2 rounded-lg shadow-sm transition-colors"
              :class="themeClasses.panel.iconContainer"
            >
              <svg
                class="w-5 h-5 transition-colors"
                :class="themeClasses.icon.secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 19h16"
                />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 15v4" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11v8"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8v11"
                />
              </svg>
            </div>
            <div>
              <div class="text-xs transition-colors pb-3" :class="themeClasses.text.label">
                Tipo de gráfico
              </div>
              <div class="font-medium transition-colors" :class="themeClasses.text.primary">
                <GraphicButtons v-model="chartType" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- URL de la fuente -->
      <div class="mt-6 pt-5 border-t transition-colors" :class="themeClasses.border">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div :class="themeClasses.icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <span class="text-sm transition-colors" :class="themeClasses.text.secondary">
              Fuente de datos:
            </span>
          </div>
          <a
            v-if="indicador.urlfuente"
            :href="indicador.urlfuente"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium truncate max-w-xs flex items-center transition-colors hover:underline"
            :class="themeClasses.link"
            :title="indicador.urlfuente"
          >
            {{ formatUrl(indicador.urlfuente) }}
            <svg
              class="w-4 h-4 ml-1 transition-colors"
              :class="themeClasses.icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <span v-else class="text-sm italic transition-colors" :class="themeClasses.text.muted">
            No especificada
          </span>
        </div>
      </div>

      <!-- Errores (si existen) -->
      <div
        v-if="indicador.errores || (indicador.listaErrores && indicador.listaErrores.length > 0)"
        class="mt-4 p-3 rounded-lg border transition-colors"
        :class="themeClasses.error.container"
      >
        <div class="flex items-start space-x-2">
          <svg
            class="w-5 h-5 mt-0.5 flex-shrink-0 transition-colors"
            :class="themeClasses.error.icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="text-sm transition-colors" :class="themeClasses.error.text">
            <div v-if="indicador.errores" class="font-medium">{{ indicador.errores }}</div>
            <ul
              v-if="indicador.listaErrores && indicador.listaErrores.length > 0"
              class="mt-1 space-y-1"
            >
              <li v-for="(error, index) in indicador.listaErrores" :key="index" class="text-xs">
                • {{ error }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BOIndicadorDto } from '@/interfaces/index'
import { useTheme } from '@/composables/useTheme'
import { QuillEditor } from '@vueup/vue-quill'
import GraphicButtons from './GraphicButtons.vue'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

// Props
interface Props {
  indicador: BOIndicadorDto
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  editar: [indicator: BOIndicadorDto]
  'toggle-activo': [indicator: BOIndicadorDto]
  'ver-detalle': [indicator: BOIndicadorDto]
}>()

// Tema actual (puede venir de un store, prop o composable)
// En una app real, esto vendría de un composable useTheme o store
const { isDark } = useTheme()

// Tipo de gráfico seleccionado para este indicador
const chartType = ref<'line' | 'bar' | 'area' | 'pie' | 'scatter' | 'radar'>('line')

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

// Métodos
const formatUrl = (url: string): string => {
  if (!url) return ''
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url.length > 25 ? url.substring(0, 25) + '...' : url
  }
}
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
