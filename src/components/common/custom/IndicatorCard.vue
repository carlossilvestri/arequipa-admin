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
        class="flex items-center justify-between text-sm transition-colors min-h-[40px]"
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
        <!-- Botón para abrir detalles -->
        <div class="mt-1">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors hidden sm:flex"
            :class="themeClasses.button.primary"
            @click="showDetails = true"
          >
            Ver detalles
          </button>
          <!-- Icono de ojo para mobile -->
          <button
            class="p-2 rounded-lg transition-colors sm:hidden"
            :class="themeClasses.button.primary"
            @click="showDetails = true"
            aria-label="Ver detalles"
            title="Ver detalles"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div>
      <div class="px-6 pt-3 pb-2">
        <p class="text-sm">Agregue territorios y seleccione cuáles desea mostrar en la gráfica</p>
        <div class="mt-3">
          <div class="md:grid grid-cols-12 gap-2 flex">
            <div class="col-span-5">
              <SelectInput
                v-model="indicatorCard.tipoterritorio"
                :options="territoryTypeOptions"
                @update:modelValue="handleTerritoryTypeChange"
                label="Tipo de territorio"
                :id="`Tipo de territorio${indicador.codigoindicador}`"
                placeholder="Seleccione un tipo de territorio"
              />
            </div>
            <div class="col-span-5">
              <SelectInput
                v-model="indicatorCard.territorio"
                :options="territoryOptions2"
                label="Territorio"
                :id="`territorio${indicador.codigoindicador}`"
                placeholder="Seleccione un territorio"
              />
            </div>
            <div class="col-span-2 flex items-center pt-6">
              <button
                class="p-2 text-[11px] font-medium rounded-lg transition-colors hidden sm:flex"
                :class="themeClasses.button.primary"
                @click="handleAdd"
                title="Agregar a la lista"
              >
                Agregar
              </button>
              <!-- Icono de más para mobile -->
              <button
                class="p-2 rounded-lg transition-colors sm:hidden"
                :class="themeClasses.button.primary"
                @click="handleAdd"
                aria-label="Agregar"
                title="Agregar a la lista"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div>
            <ul
              class="h-34 overflow-auto border border-gray-300 dark:border-gray-600 rounded-lg my-2"
            >
              <li
                v-for="(elemento, index) in indicatorCard.elementos"
                :key="`${elemento.tipoterritorio.value}-${elemento.territorio.value}`"
                class="grid grid-cols-12 sm:grid-cols-12 p-2 gap-1 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-b border-gray-200 dark:border-gray-600"
                :class="{
                  'opacity-50 bg-gray-100 dark:bg-gray-800': !elemento.checked,
                  'hover:bg-gray-100 dark:hover:bg-gray-600': elemento.checked,
                }"
              >
                <div class="col-span-12 sm:col-span-6 flex items-center">
                  <Checkbox
                    :name="`check-${elemento.tipoterritorio.value}-${elemento.territorio.value}-${props.indicador.idindicador}`"
                    :modelValue="elemento.checked"
                    @update:modelValue="
                      (val: boolean) => {
                        elemento.checked = val
                      }
                    "
                    label-class="text-[12px]"
                    :label="elemento.tipoterritorio.label + ' - ' + elemento.territorio.label"
                  />
                </div>
                <div class="col-span-12 sm:col-span-4 mt-2 sm:mt-0 pr-2">
                  <div>
                    <SelectInput
                      :options="[
                        { value: 'line', label: 'Línea' },
                        { value: 'bar', label: 'Barras' },
                        { value: 'scatter', label: 'Dispersión' },
                        { value: 'area', label: 'Área' },
                      ]"
                      v-model="elemento.chartseleccionado"
                      placeholder="Tipo"
                      label=""
                      select-class="text-[12px]"
                    />
                  </div>
                </div>
                <div
                  class="col-span-12 sm:col-span-2 flex items-center justify-center mt-2 sm:mt-0"
                >
                  <button
                    @click="moveElementUp(index)"
                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors mr-1"
                    title="Subir"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                  <button
                    @click="moveElementDown(index)"
                    class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors mr-1"
                    title="Bajar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <button
                    @click="removeElement(index)"
                    class="rounded-md transition-colors text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    title="Eliminar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-red-500 hover:text-red-700"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
            <div class="flex justify-end pr-2">
              <p class="text-gray-300 font-light text-sm">
                Total: {{ indicatorCard.elementos.length }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-gray-100" />
      <div class="px-6 pt-3 pb-6">
        <!-- Elegir periodo -->
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <SelectInput
              v-model="indicatorCard.tipoperiodo"
              :options="
                indicador.tiposperiodo.map((pt) => ({
                  value: pt.idtipoperiodo,
                  label: pt.nombretipoperiodo,
                }))
              "
              @change="handleOnPeriodTypeChange(indicatorCard.tipoperiodo)"
              label="Tipo de período"
              label-position="left"
              :id="`Tipo de periodo${indicador.codigoindicador}`"
              placeholder="Seleccione"
            />
          </div>
          <div class="col-span-6 pl-2">
            <SelectInput
              v-model="indicatorCard.desde"
              :options="periodOptions"
              :id="`idperiododesde${indicador.codigoindicador}`"
              label="Desde"
              placeholder="Seleccione"
            />
          </div>
          <div class="col-span-6 pr-2">
            <SelectInput
              v-model="indicatorCard.hasta"
              :options="periodOptions"
              :id="`idperiodohasta${indicador.codigoindicador}`"
              label="Hasta"
              placeholder="Seleccione"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de detalles -->
  <ModalIndicatorDetail v-model:open="showDetails" :indicador="indicador" />
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import type {
  BOIndicadorDto,
  BOTerritorio,
  OptionType,
  BOCardIndicadorDto,
} from '@/interfaces/index'
import { useTheme } from '@/composables/useTheme'
import { getPeriodByIdTipoAndIdIndicador } from '@/services/period'
import { getTerritoryByIdTipoAndIdIndicador } from '@/services/territories'
import { truncateTextWithEllipsis } from '@/utilities'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import Checkbox from '@/components/common/custom/Checkbox.vue'
import ModalIndicatorDetail from '@/components/common/custom/ModalIndicatorDetail.vue'
import { useNotificationStore } from '@/stores/notification'
import TrashIcon from '@/icons/TrashIcon.vue'
// Props
interface Props {
  indicador: BOIndicadorDto
}
const notificationStore = useNotificationStore()

const props = defineProps<Props>()
const indicatorCard = ref<BOCardIndicadorDto>({
  idindicador: props.indicador.idindicador,
  tipoterritorio: null,
  territorio: null,
  tipoperiodo: null,
  elementos: [],
  desde: '',
  hasta: '',
})
// Emits
const emit = defineEmits<{
  editar: [indicator: BOIndicadorDto]
  'ver-detalle': [indicator: BOIndicadorDto]
  deseleccionar: [indicator: BOIndicadorDto]
  'update:config': [indicatorCard: BOCardIndicadorDto]
}>()

// Tema actual (puede venir de un store, prop o composable)
// En una app real, esto vendría de un composable useTheme o store
const { isDark } = useTheme()

// Tipo de gráfico seleccionado para este indicador
const showDetails = ref(false)
const periodOptions = ref<OptionType[]>([])
const territoryOptions2 = ref<OptionType[]>([])
const territoryTypeOptions = ref<OptionType[]>(
  props.indicador.tiposterritorio.map((tt) => ({
    value: tt.idtipoterritorio,
    label: tt.nombretipoterritorio,
  })),
)

// Watcher para emitir cambios en la configuración
watch(
  [indicatorCard],
  () => {
    emit('update:config', indicatorCard.value)
  },
  { deep: true },
)
onMounted(() => {
  emit('update:config', indicatorCard.value)
})
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

const handleTerritoryTypeChange = async (territoryTypeId: number) => {
  // Load territories for the selected type

  const territories: BOTerritorio[] = await getTerritoryByIdTipoAndIdIndicador(
    territoryTypeId,
    props.indicador.idindicador,
  )
  territoryOptions2.value = territories.map((t: BOTerritorio) => ({
    value: t.idterritorio,
    label: t.nombreterritorio,
  }))
}

const handleAdd = () => {
  // Find the selected territory type and territory
  const selectedTerritoryType = territoryTypeOptions.value.find(
    (option) => option.value === indicatorCard.value.tipoterritorio,
  )
  const selectedTerritory = territoryOptions2.value.find(
    (option) => option.value === indicatorCard.value.territorio,
  )

  // Check if both selections are made
  if (!selectedTerritoryType || !selectedTerritory) {
    notificationStore.error('Por favor seleccione tipo de territorio y territorio')
    return
  }

  // Check if the element already exists
  const exists = indicatorCard.value.elementos.some(
    (elemento) =>
      elemento.tipoterritorio.value === selectedTerritoryType.value &&
      elemento.territorio.value === selectedTerritory.value,
  )

  if (exists) {
    notificationStore.error('Este elemento ya ha sido agregado')
    return
  }

  // Add the new element
  indicatorCard.value.elementos.push({
    tipoterritorio: selectedTerritoryType,
    territorio: selectedTerritory,
    chartseleccionado: 'bar',
    fontSize: 'sm',
    checked: true,
  })

  // Reset selections
  indicatorCard.value.tipoterritorio = null
  indicatorCard.value.territorio = null
}

const moveElementUp = (index: number) => {
  const elementos = indicatorCard.value.elementos
  if (index > 0) {
    const element = elementos.splice(index, 1)[0]
    elementos.splice(index - 1, 0, element)
  } else if (index === 0 && elementos.length > 1) {
    // Si está en la primera posición, moverlo al final
    const element = elementos.splice(index, 1)[0]
    elementos.push(element)
  }
}

const moveElementDown = (index: number) => {
  const elementos = indicatorCard.value.elementos
  if (index < elementos.length - 1) {
    const element = elementos.splice(index, 1)[0]
    elementos.splice(index + 1, 0, element)
  } else if (index === elementos.length - 1 && elementos.length > 1) {
    // Si está en la última posición, moverlo al principio
    const element = elementos.splice(index, 1)[0]
    elementos.unshift(element)
  }
}

const removeElement = (index: number) => {
  indicatorCard.value.elementos.splice(index, 1)
}

const handleOnPeriodTypeChange = async (periodType: number | null) => {
  if (!periodType) return
  const periods = await getPeriodByIdTipoAndIdIndicador(periodType, props.indicador.idindicador)

  periodOptions.value = periods.map((period) => ({
    value: period.idperiodo,
    label: period.etiquetalarga,
  }))
}

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
