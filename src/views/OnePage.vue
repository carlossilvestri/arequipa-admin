<template>
  <div class="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
    <!-- Top Sidebar (sticky) -->
    <HeaderOnePage />

    <!-- Sección Opción 1 (con gráfico) -->
    <section
      id="opcion-1"
      class="scroll-mt-24 mx-auto max-w-(--breakpoint-2xl) px-4 md:px-6 py-12 md:py-16"
    >
      <h3 class="text-3xl font-semibold mb-6 pl-6">Indicadores</h3>
      <div class="m-3">
        <div class="gap-6 border border-gray-300 rounded-md p-4 m-3">
          <div>
            <div class="flex text-3xl">
              <NumberBadge :number="1" />
              <p class="pl-2 font-bold">Selecciona uno o más indicadores</p>
            </div>
            <div class="mt-3 ml-2">
              <p class="text-gray-900/50 text-[14px] italic my-5 ml-2 dark:text-gray-100/50">
                Haz clic en el botón para buscar indicadores por grupo, subgrupo o nombre
              </p>
              <hr class="border-gray-300" />
              <Button
                type="submit"
                variant="primary"
                class="flex items-center justify-center mt-3 ml-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                @click="isSearchModalOpen = true"
              >
                <SearchIcon />
                BUSCAR INDICADORES
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div class="border border-gray-300 rounded-md p-4 m-3">
            <div class="flex mb-3 text-3xl">
              <NumberBadge :number="2" />
              <p class="pl-2 font-bold">Configura los indicadores seleccionados</p>
            </div>
            <div class="pt-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <IndicatorCard
                v-for="indicator in displayIndicators"
                :key="indicator.idindicador"
                :indicador="indicator"
                @editar="handleEditar"
                @toggle-activo="handleToggleActivo"
                @ver-detalle="handleVerDetalle"
                @deseleccionar="handleDeseleccionar"
                @update:checkbox="handleCheckboxChange"
                @update:config="handleConfigChange"
              />
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center my-5">
          <Button
            size="md"
            class="inline-flex items-center"
            @click="handleClickGenerateGraphic"
            :loading="loadingGenerateGraphics"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3v18h18M6 15l4-4 4 4 6-6"
              />
            </svg>
            GENERAR GRÁFICO
          </Button>
        </div>
        <div v-if="chartData">
          <div class="border border-gray-300 rounded-md p-4 m-3 text-3xl">
            <div class="flex mt-2 mb-4">
              <NumberBadge :number="3" />
              <p class="pl-2 font-bold">Resultados del análisis</p>
            </div>
            <div class="grid">
              <MultiChartDashboard
                :chart-data="chartData"
                :loading="loadingGenerateGraphics"
                :chart-type="selectedChartType"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de detalles -->
    <ModalIndicatorDetail
      v-if="indicatorDetail"
      v-model:open="showModalDetails"
      :indicador="indicatorDetail"
    />

    <!-- Modal Buscar Indicadores -->
    <Modal v-if="isSearchModalOpen" :full-screen-backdrop="true" @close="isSearchModalOpen = false">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8"
        >
          <!-- close btn -->
          <button
            @click="isSearchModalOpen = false"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
          >
            <svg
              class="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill=""
              />
            </svg>
          </button>

          <div class="px-2 pr-14">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Buscar y seleccionar indicadores
            </h4>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Seleccionados: {{ form.selectedItems.length }}
            </p>
          </div>

          <!-- Loading -->
          <div v-if="loadingIndicators" class="mt-6 flex items-center justify-center px-2 py-14">
            <div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <svg
                class="animate-spin h-5 w-5 text-brand-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span class="text-sm">Cargando indicadores...</span>
            </div>
          </div>

          <!-- Layout árbol izquierda + resultados derecha -->
          <div v-else class="mt-4 grid grid-cols-1 gap-6 px-2 lg:grid-cols-12">
            <!-- Panel izquierdo: Árbol de grupos/subgrupos -->
            <aside class="lg:col-span-4 xl:col-span-3">
              <h5 class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                Grupos
              </h5>
              <div
                class="rounded-xl border border-gray-200 dark:border-gray-800 overflow-y-auto max-h-[calc(100vh-20rem)] relative"
              >
                <ul class="divide-y divide-gray-200 dark:divide-gray-800">
                  <li v-for="g in treeData" :key="g.id" class="px-3 py-2">
                    <div class="flex items-center gap-2">
                      <button
                        class="h-6 w-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        @click="toggleGroupExpand(g.id)"
                        :aria-expanded="expandedGroups.has(g.id)"
                      >
                        <svg
                          v-if="expandedGroups.has(g.id)"
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.79175 12.6045L10.0001 7.39624L15.2084 12.6045"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <svg
                          v-else
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        class="text-left grow text-sm"
                        :class="{
                          'text-brand-600 font-medium':
                            filters.groupId === g.id && !filters.subgroupId,
                        }"
                        @click="selectGroup(g.id)"
                      >
                        {{ g.name }}
                      </button>
                    </div>
                    <ul v-if="expandedGroups.has(g.id)" class="mt-1 pl-8">
                      <li v-for="sg in g.subgroups" :key="sg.id" class="py-1">
                        <button
                          class="text-left text-sm hover:underline"
                          :class="{ 'text-brand-600 font-medium': filters.subgroupId === sg.id }"
                          @click="selectSubgroup(g.id, sg.id)"
                        >
                          {{ sg.name }}
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="mt-3 flex gap-2">
                <Button type="button" variant="outline" class="w-full" @click="clearGroupFilters">
                  Limpiar
                </Button>
              </div>
            </aside>

            <!-- Panel derecho: filtro por nombre, lista y paginación -->
            <section class="lg:col-span-8 xl:col-span-9">
              <div class="mb-4">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre
                </label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="filters.name"
                    type="text"
                    placeholder="Buscar por nombre"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                  <Button type="button" variant="outline" class="shrink-0" @click="clearFilters">
                    Limpiar filtros
                  </Button>
                </div>
              </div>

              <!-- Lista filtrada -->
              <div>
                <div class="overflow-hidden border border-gray-200 rounded-xl dark:border-gray-800">
                  <ul
                    class="divide-y divide-gray-200 dark:divide-gray-800 overflow-y-auto relative max-h-[calc(100vh-25rem)]"
                  >
                    <li
                      v-for="item in paginatedIndicators"
                      :key="item.idindicador"
                      class="flex items-center justify-between gap-4 p-4"
                    >
                      <div class="min-w-0">
                        <div class="flex items-center gap-2">
                          <InfoCircleIcon
                            class="w-5 h-5 text-gray-500 cursor-pointer"
                            @click="handleShowDetails(item)"
                          />
                          <p class="truncate text-sm font-medium text-gray-800 dark:text-white/90">
                            {{ item.nombreindicador }}
                          </p>
                        </div>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Grupo: {{ item.nombregrupo }} • Subgrupo: {{ item.nombresubgrupo }}
                        </p>
                      </div>
                      <Button
                        :variant="isSelected(String(item.idindicador)) ? 'primary' : 'outline'"
                        class="shrink-0"
                        @click="toggleSelection(item)"
                        className="px-4! py-1!"
                      >
                        {{ isSelected(String(item.idindicador)) ? 'Seleccionado' : 'Seleccionar' }}
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Controles de paginación -->
              <div class="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Mostrando</span>
                  <select
                    v-model.number="pageSize"
                    class="dark:bg-dark-900 appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-3 py-0.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                  >
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                  </select>
                  <span>de {{ filteredIndicators.length }} indicadores</span>
                </div>
                <div class="flex items-center gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    size="sm"
                    @click="prevPage"
                    :disabled="page === 1"
                    className="px-3! py-1!"
                    >Anterior</Button
                  >
                  <span class="text-sm text-gray-600 dark:text-gray-400"
                    >Página {{ page }} de {{ totalPages }}</span
                  >
                  <Button
                    variant="outline"
                    type="button"
                    size="sm"
                    @click="nextPage"
                    :disabled="page === totalPages"
                    className="px-3! py-1!"
                    >Siguiente</Button
                  >
                </div>
              </div>

              <div class="flex justify-end gap-2 mt-3">
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  @click="isSearchModalOpen = false"
                >
                  Cancelar
                </Button>
                <Button variant="primary" type="button" size="sm" @click="applySelected">
                  Agregar indicadores seleccionados
                </Button>
              </div>
            </section>
          </div>
        </div>
      </template>
    </Modal>

    <!-- Footer simple -->
    <footer
      class="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm dark:text-gray-400 bg-[#29307feb] text-white"
    >
      © {{ year }} IPE Arequipa
    </footer>
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
// Reutilizamos el componente existente
import MultiChartDashboard from '@/components/charts/MultiChartDashboard.vue'
import { ref, onMounted, computed, watch } from 'vue'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import HeaderOnePage from '@/components/common/custom/HeaderOnePage.vue'
import { classicFormatDate } from '@/utilities'
import type { BOIndicadorDto, GenerateIndicatorRequest, IndicatorRequest } from '@/interfaces'
import { generateGraphic, getIndicators } from '@/services/indicator'
import IndicatorCard from '@/components/common/custom/IndicatorCard.vue'
import NumberBadge from '@/components/common/custom/NumberBadge.vue'
import SearchIcon from '@/icons/SearchIcon.vue'
import InfoCircleIcon from '@/icons/InfoCircleIcon.vue'
import ModalIndicatorDetail from '@/components/common/custom/ModalIndicatorDetail.vue'
import { useNotificationStore } from '@/stores/notification'
import NotificationContainer from '@/components/common/custom/NotificationContainer.vue'

const notificationStore = useNotificationStore()
const indicators = ref<BOIndicadorDto[]>([])
const loadingIndicators = ref(false)
const loadingGenerateGraphics = ref(false)
const isSearchModalOpen = ref(false)
const showModalDetails = ref(false)
const indicatorDetail = ref<BOIndicadorDto | null>(null)
const chartData = ref<any>(null) // Almacenará los datos del gráfico
const selectedChartType = ref('line') // Tipo de gráfico seleccionado

const form = ref<{ selectedItems: { value: string; label: string }[] }>({
  selectedItems: [],
})

// Estado para almacenar configuración y checkbox por indicador
const indicatorsConfig = ref<Map<number, { checked: boolean; config: IndicatorRequest }>>(new Map())

// Selección temporal dentro del modal; solo se aplica al confirmar
const modalSelectedItems = ref<{ value: string; label: string }[]>([])

const year = ref(classicFormatDate(new Date(), 'YYYY'))

onMounted(async () => {
  await loadIndicators()
})

const loadIndicators = async () => {
  try {
    loadingIndicators.value = true
    indicators.value = await getIndicators({ ACTIVO: true })
    //await getPeriodTypes({})
  } finally {
    loadingIndicators.value = false
  }
}

const handleClickGenerateGraphic = async () => {
  try {
    loadingGenerateGraphics.value = true
    // Filtrar solo los indicadores marcados y construir el payload
    const checkedIndicators = Array.from(indicatorsConfig.value.entries())
      .filter(([, { checked }]) => checked)
      .map(([, { config }]) => config)

    // Validar que todos los idperiododesde sean iguales
    if (checkedIndicators.length > 1) {
      const periodFromValues = checkedIndicators.map((config) => config.idperiododesde)
      const uniquePeriodFromValues = [...new Set(periodFromValues)]

      if (uniquePeriodFromValues.length > 1) {
        notificationStore.error(
          'Todos los indicadores deben tener el mismo período "Desde" seleccionado',
        )
        chartData.value = null
        return
      }
    }

    const params: GenerateIndicatorRequest = {
      indicadores: checkedIndicators,
    }
    const response = await generateGraphic(params)

    if (!response.exito) {
      const errorMsg = response.errores.replace('grfica', 'gráfica')
      notificationStore.error(errorMsg)
      chartData.value = null
    }

    // Aquí puedes manejar la respuesta, por ejemplo mostrar un gráfico o mensaje
    if (response.exito) {
      // Guardar los datos del gráfico si la respuesta es exitosa
      chartData.value = JSON.parse(JSON.stringify(response.objeto))
      notificationStore.success('Gráfico generado exitosamente')
    }
  } finally {
    loadingGenerateGraphics.value = false // si usas loading
  }
}

const handleShowDetails = (indicator: BOIndicadorDto) => {
  showModalDetails.value = true
  indicatorDetail.value = indicator
}

const displayIndicators = computed(() => {
  const selectedItems: string[] = form.value.selectedItems.map((i) => String(i.value))
  const selectedSet = new Set(selectedItems)
  return indicators.value.filter((i) => selectedSet.has(String(i.idindicador)))
})

// Handlers
const handleEditar = (indicador: BOIndicadorDto) => {
  console.log('Editar indicador:', indicador)
  // Lógica de edición
}

const handleToggleActivo = (indicador: BOIndicadorDto) => {
  console.log('Cambiar estado del indicador:', indicador)
  indicador.activo = !indicador.activo
}

const handleVerDetalle = (indicador: BOIndicadorDto) => {
  console.log('Ver detalle del indicador:', indicador)
  // Navegación o modal de detalle
}

const handleDeseleccionar = (indicador: BOIndicadorDto) => {
  const id: string = String(indicador.idindicador)

  form.value.selectedItems = form.value.selectedItems.filter((item) => item.value !== id)
  indicatorsConfig.value.delete(Number(id))

  //chartData.value = form.value.selectedItems.filter((item) => item.value !== id)
}

// Handlers para checkbox y configuración
const handleCheckboxChange = (id: number, checked: boolean) => {
  const current = indicatorsConfig.value.get(id) || {
    checked: false,
    config: {} as IndicatorRequest,
  }
  indicatorsConfig.value.set(id, { ...current, checked })
}

const handleConfigChange = (
  id: number,
  config: {
    tipografica: string
    idtipoterritorio: number | null
    idterritorio: number | null
    idtipoperiodo: number | null
    idperiododesde: number | null
    idperiodohasta: number | null
  },
) => {
  const current = indicatorsConfig.value.get(id) || {
    checked: false,
    config: {} as IndicatorRequest,
  }

  // Actualizar el tipo de gráfico seleccionado si este indicador está seleccionado
  /*
  const isSelected = form.value.selectedItems.some((item) => item.value === String(id))

  if (isSelected && config.tipografica) {
    selectedChartType.value = config.tipografica
  }
    */

  indicatorsConfig.value.set(id, {
    ...current,
    config: { ...config, idindicador: id } as IndicatorRequest,
  })
}

// Filtros modal
const filters = ref<{ name: string; groupId?: number; subgroupId?: number }>({ name: '' })

// Datos del árbol (grupos y subgrupos) derivados de indicadores
const treeData = computed(() => {
  const groupsMap = new Map<number, { id: number; name: string; subgroups: Map<number, string> }>()
  indicators.value.forEach((i) => {
    if (!groupsMap.has(i.idgrupo)) {
      groupsMap.set(i.idgrupo, { id: i.idgrupo, name: i.nombregrupo, subgroups: new Map() })
    }
    groupsMap.get(i.idgrupo)!.subgroups.set(i.idsubgrupo, i.nombresubgrupo)
  })
  return Array.from(groupsMap.values()).map((g) => ({
    id: g.id,
    name: g.name,
    subgroups: Array.from(g.subgroups.entries()).map(([id, name]) => ({ id, name })),
  }))
})

// Estado de expansión del árbol y selección
const expandedGroups = ref<Set<number>>(new Set())
const toggleGroupExpand = (groupId: number) => {
  const next = new Set(expandedGroups.value)
  if (next.has(groupId)) next.delete(groupId)
  else next.add(groupId)
  expandedGroups.value = next
}
const selectGroup = (groupId: number) => {
  filters.value.groupId = groupId
  filters.value.subgroupId = undefined
  if (!expandedGroups.value.has(groupId)) toggleGroupExpand(groupId)
}
const selectSubgroup = (groupId: number, subgroupId: number) => {
  filters.value.groupId = groupId
  filters.value.subgroupId = subgroupId
}
const clearGroupFilters = () => {
  filters.value.groupId = undefined
  filters.value.subgroupId = undefined
}

const filteredIndicators = computed(() => {
  const name = filters.value.name.trim().toLowerCase()
  const g = filters.value.groupId
  const sg = filters.value.subgroupId
  return indicators.value.filter((i) => {
    const byName = name ? i.nombreindicador.toLowerCase().includes(name) : true
    const byGroup = g ? i.idgrupo === g : true
    const bySubgroup = sg ? i.idsubgrupo === sg : true
    return byName && byGroup && bySubgroup
  })
})

// En el modal usamos la selección temporal
const isSelected = (id: string) => modalSelectedItems.value.some((s) => s.value === id)

const toggleSelection = (item: BOIndicadorDto) => {
  const id = String(item.idindicador)
  if (isSelected(id)) {
    modalSelectedItems.value = modalSelectedItems.value.filter((s) => s.value !== id)
  } else {
    modalSelectedItems.value = [
      ...modalSelectedItems.value,
      { value: id, label: item.nombreindicador },
    ]
  }
}

// Confirmar selección del modal y aplicar a las cards
const applySelected = () => {
  form.value.selectedItems = [...modalSelectedItems.value]
  isSearchModalOpen.value = false
}

const clearFilters = () => {
  filters.value = { name: '', groupId: undefined, subgroupId: undefined }
}

// Paginación (front)
const page = ref(1)
const pageSize = ref(5)
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredIndicators.value.length / pageSize.value)),
)
const paginatedIndicators = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredIndicators.value.slice(start, start + pageSize.value)
})
const prevPage = () => {
  if (page.value > 1) page.value -= 1
}
const nextPage = () => {
  if (page.value < totalPages.value) page.value += 1
}

// Resetear página cuando cambian los filtros o el tamaño de página
watch(
  () => [filters.value.name, filters.value.groupId, filters.value.subgroupId, pageSize.value],
  () => {
    page.value = 1
  },
)

// Al abrir el modal, sincronizar selección temporal con la actual
watch(
  () => isSearchModalOpen.value,
  (open) => {
    if (open) {
      modalSelectedItems.value = [...form.value.selectedItems]
    }
  },
)
</script>

<style>
/* Suaviza el scroll a las anclas del “sidebar” superior */
html {
  scroll-behavior: smooth;
}
</style>
