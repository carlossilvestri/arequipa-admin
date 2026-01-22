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
            class="text-lg font-bold leading-tight transition-colors mt-2"
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
  <div
    v-if="showDetails"
    class="fixed inset-0 z-50 flex items-center justify-center"
    aria-modal="true"
    role="dialog"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50" @click="showDetails = false"></div>

    <!-- Content -->
    <div
      class="relative w-full max-w-lg mx-4 rounded-lg shadow-lg border transition-colors"
      :class="
        isDark
          ? 'bg-gray-800 border-gray-700 text-gray-100'
          : 'bg-white border-gray-200 text-gray-900'
      "
    >
      <div class="px-5 py-4 border-b" :class="themeClasses.border">
        <div class="flex items-start justify-between">
          <div>
            <h4 class="text-base font-semibold">
              {{ indicador.nombreindicador }}
            </h4>
            <div class="text-xs mt-1" :class="themeClasses.text.muted">
              Código: {{ indicador.codigoindicador }}
            </div>
          </div>
          <button
            class="p-1.5 rounded-md transition-colors"
            :class="
              isDark
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            "
            aria-label="Cerrar"
            @click="showDetails = false"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- Descripción -->
      <div>
        <template v-if="hasLongDescription && !showFullDescription">
          <QuillEditor
            :content="truncatedHtml || ''"
            content-type="html"
            :read-only="true"
            theme="bubble"
            class="prose prose-sm max-w-none transition-colors"
            :class="themeClasses.text.paragraph"
          />
          <button
            class="mt-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ml-2"
            :class="themeClasses.button.ghost"
            @click="showFullDescription = true"
          >
            Mostrar más
          </button>
        </template>
        <template v-else>
          <QuillEditor
            :content="indicador.descripcionindicador || ''"
            content-type="html"
            :read-only="true"
            theme="bubble"
            class="prose prose-sm max-w-none transition-colors"
            :class="themeClasses.text.paragraph"
          />
          <button
            v-if="hasLongDescription"
            class="mt-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
            :class="themeClasses.button.ghost"
            @click="showFullDescription = false"
          >
            Mostrar menos
          </button>
        </template>
      </div>

      <div class="px-5 py-4 space-y-4">
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
      </div>

      <div class="px-5 py-3 border-t flex justify-end gap-2" :class="themeClasses.border">
        <button
          class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
          :class="themeClasses.button.ghost"
          @click="showDetails = false"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BOIndicadorDto } from '@/interfaces/index'
import { useTheme } from '@/composables/useTheme'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { truncateTextWithEllipsis } from '@/utilities'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import { usePeriodTypeStore } from '@/stores/periodType'
import { useTerritoryTypeStore } from '@/stores/territoryType'
import TrashIcon from '@/icons/TrashIcon.vue'
import Checkbox from '@/components/common/custom/Checkbox.vue'

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
// Descripción: mostrar más/menos en el modal
const descriptionText = computed(() => {
  const html = props.indicador.descripcionindicador || ''
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || div.innerText || '').trim()
})
const hasLongDescription = computed(() => descriptionText.value.length > 365)
// Truncado preservando estructura HTML y cerrando etiquetas correctamente
function truncateHtmlPreservingTags(html: string, maxChars: number): string {
  const container = document.createElement('div')
  container.innerHTML = html

  let remaining = maxChars

  const cloneWithLimit = (node: Node): Node | null => {
    if (remaining <= 0) return null
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.nodeValue as string) || ''
      if (text.length <= remaining) {
        remaining -= text.length
        return document.createTextNode(text)
      } else {
        const slice = text.slice(0, remaining) + '...'
        remaining = 0
        return document.createTextNode(slice)
      }
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = (node as Element).cloneNode(false) as Element
      const children = Array.from(node.childNodes) as ChildNode[]
      for (const child of children) {
        const childClone = cloneWithLimit(child)
        if (childClone) el.appendChild(childClone)
        if (remaining <= 0) break
      }
      return el
    }
    return null
  }

  const out = document.createElement('div')
  for (const child of Array.from(container.childNodes)) {
    const cloned = cloneWithLimit(child)
    if (cloned) out.appendChild(cloned)
    if (remaining <= 0) break
  }
  // Si no hubo truncado, devolver HTML original para evitar cambios innecesarios
  return remaining === maxChars ? html : out.innerHTML
}

const truncatedHtml = computed(() => {
  const original = props.indicador.descripcionindicador || ''
  if (!hasLongDescription.value) return original
  return truncateHtmlPreservingTags(original, 365)
})
const showFullDescription = ref(false)

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
