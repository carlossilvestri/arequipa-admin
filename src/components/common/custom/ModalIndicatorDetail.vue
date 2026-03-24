<template>
  <div
    v-if="open"
    class="fixed inset-0 z-100000 flex items-center justify-center"
    aria-modal="true"
    role="dialog"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50" @click="$emit('update:open', false)"></div>

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
            @click="$emit('update:open', false)"
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
          <div
            class="prose prose-xs max-w-none transition-colors relative p-3 text-sm"
            :class="themeClasses.text.paragraph"
          >
            <div v-html="truncatedHtml" class="inline"></div>
            <button
              class="inline px-2 py-0.5 text-xs font-medium rounded transition-colors align-baseline"
              :class="themeClasses.button.ghost"
              @click="showFullDescription = true"
            >
              Mostrar más
            </button>
          </div>
        </template>
        <template v-else>
          <div
            class="prose prose-xs max-w-none transition-colors p-3 text-sm"
            :class="themeClasses.text.paragraph"
          >
            <div v-html="indicador.descripcionindicador || ''"></div>
          </div>
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
                :class="themeClasses.iconPrimary"
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
                :class="themeClasses.iconSecondary"
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
              <span class="text-sm transition-colors" :class="themeClasses.text.secondary"
                >Fuente de datos:</span
              >
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
            <span v-else class="text-sm italic transition-colors" :class="themeClasses.text.muted"
              >No especificada</span
            >
          </div>
        </div>
      </div>

      <div class="px-5 py-3 border-t flex justify-end gap-2" :class="themeClasses.border">
        <button
          class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
          :class="themeClasses.button.ghost"
          @click="$emit('update:open', false)"
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

interface Props {
  open: boolean
  indicador: BOIndicadorDto
}
const props = defineProps<Props>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const { isDark } = useTheme()
const showFullDescription = ref(false)

const descriptionText = computed(() => {
  const html = props.indicador.descripcionindicador || ''
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || div.innerText || '').trim()
})
const hasLongDescription = computed(() => descriptionText.value.length > 365)

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
  return remaining === maxChars ? html : out.innerHTML
}

const truncatedHtml = computed(() => {
  const original = props.indicador.descripcionindicador || ''
  if (!hasLongDescription.value) return original
  return truncateHtmlPreservingTags(original, 365)
})

const themeClasses = computed(() => ({
  border: isDark.value ? 'border-gray-700' : 'border-gray-100',
  text: {
    primary: isDark.value ? 'text-gray-100' : 'text-gray-900',
    secondary: isDark.value ? 'text-gray-400' : 'text-gray-600',
    muted: isDark.value ? 'text-gray-500' : 'text-gray-400',
    paragraph: isDark.value ? 'text-gray-300' : 'text-gray-600',
    label: isDark.value ? 'text-gray-500' : 'text-gray-500',
    highlight: isDark.value ? 'text-blue-400' : 'text-blue-600',
  },
  icon: isDark.value ? 'text-gray-400' : 'text-gray-500',
  iconPrimary: isDark.value ? 'text-blue-400' : 'text-blue-600',
  iconSecondary: isDark.value ? 'text-gray-400' : 'text-gray-600',
  panel: {
    primary: isDark.value ? 'bg-gray-700/50' : 'bg-blue-50',
    secondary: isDark.value ? 'bg-gray-700/30' : 'bg-gray-50',
    iconContainer: isDark.value ? 'bg-gray-600' : 'bg-white',
  },
  button: {
    ghost: isDark.value
      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
  },
  link: isDark.value ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800',
}))

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
