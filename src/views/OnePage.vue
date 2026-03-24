<template>
  <div class="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
    <!-- Top Sidebar (sticky) -->
    <HeaderOnePage />

    <!-- Sección Opción 1 (con gráfico) -->
    <section class="pt-20 bg-gradient-to-b from-blue-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-blue-900 mb-4">Explorador de indicadores</h2>
          <p class="text-xl text-gray-600">
            Busca, selecciona y compara indicadores de la gestión pública regional.
          </p>
        </div>
      </div>
      <div id="opcion-1" class="scroll-mt-24 mx-auto max-w-(--breakpoint-2xl) px-4 md:px-6">
        <div class="md:m-3">
          <div class="bg-white rounded-xl p-8 shadow-md mb-8">
            <div
              class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              data-fg-brcf10="1.18:9.14074:/src/app/components/IndicatorExplorer.tsx:63:13:1988:673:e:div:ete"
              data-fgid-brcf10=":r2q:"
            >
              <div
                class="flex-1"
                data-fg-brcf11="1.18:9.14074:/src/app/components/IndicatorExplorer.tsx:64:15:2096:356:e:div:ete"
                data-fgid-brcf11=":r2r:"
              >
                <h3
                  class="text-xl font-semibold text-blue-900 mb-2"
                  data-fg-brcf12="1.18:9.14074:/src/app/components/IndicatorExplorer.tsx:65:17:2137:130:e:h3:t"
                  data-fgid-brcf12=":r2s:"
                >
                  Selecciona uno o más indicadores
                </h3>
                <p
                  class="text-gray-600"
                  data-fg-brcf14="1.18:9.14074:/src/app/components/IndicatorExplorer.tsx:68:17:2284:147:e:p:t"
                  data-fgid-brcf14=":r2t:"
                >
                  Haz clic en "Buscar indicadores" para encontrarlos por sector, sector o nombre.
                </p>
              </div>
              <button
                class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-white rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground h-9 px-4 py-2 has-[&gt;svg]:px-3 bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                @click="isSearchModalOpen = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-search w-4 h-4 mr-2"
                  data-fg-brcf17="1.18:9.14074:/src/app/components/IndicatorExplorer.tsx:73:17:2548:35:e:Search::::::B9rK"
                  data-fgid-brcf17=":r30:"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path></svg
                >Buscar indicadores
              </button>
            </div>
          </div>

          <div>
            <div class="bg-white rounded-xl p-8 shadow-md mb-8">
              <div class="flex mb-3 text-3xl">
                <p class="text-xl font-semibold text-blue-900 mb-2">
                  Configura los indicadores seleccionados
                </p>
              </div>
              <div class="pt-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
                <IndicatorCard
                  v-for="indicator in displayIndicators"
                  :key="indicator.idindicador"
                  :indicador="indicator"
                  :config="
                    indicatorsConfig.get(indicator.idindicador) || {
                      idindicador: indicator.idindicador,
                      tipoterritorio: null,
                      territorio: null,
                      tipoperiodo: null,
                      elementos: [],
                      desde: '',
                      hasta: '',
                    }
                  "
                  @deseleccionar="handleDeseleccionar"
                  @update:config="handleConfigChange"
                  @apply-to-all="handleApplyToAll"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center my-5">
            <Button
              size="lg"
              class="inline-flex items-center"
              @click="handleClickGenerateGraphic"
              :loading="loadingGenerateGraphics"
            >
              Generar gráfico
            </Button>
          </div>
          <div v-if="chartData">
            <div id="step-3" class="bg-white rounded-xl p-8 shadow-md mb-8">
              <div class="flex mt-2 mb-4">
                <p class="text-xl font-semibold text-blue-900 mb-2">Resultados del análisis</p>
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
      </div>
      <button
        class="fixed bottom-8 right-8 z-50 inline-flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-200"
        aria-label="Consejos de uso"
        @click="openTips = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-lightbulb w-6 h-6"
        >
          <path
            d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
          ></path>
          <path d="M9 18h6"></path>
          <path d="M10 22h4"></path>
        </svg>
      </button>
      <div
        class="fixed inset-0 bg-black/20 z-50 transition-opacity"
        :class="{ hidden: !openTips }"
      ></div>
      <div
        :class="{ hidden: !openTips }"
        class="fixed bottom-8 right-8 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border-2 border-blue-200 animate-in slide-in-from-bottom-4"
      >
        <div class="bg-blue-50 border-b-2 border-blue-200 p-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-lightbulb w-6 h-6 text-white"
              >
                <path
                  d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
                ></path>
                <path d="M9 18h6"></path>
                <path d="M10 22h4"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-blue-900">Consejos de uso</h3>
          </div>
          <button
            @click="openTips = false"
            data-slot="button"
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md gap-1.5 has-[&gt;svg]:px-2.5 h-8 w-8 p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x w-5 h-5"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p class="text-sm text-gray-700 leading-relaxed">
              Puedes seleccionar varios indicadores para compararlos.
            </p>
          </div>
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p class="text-sm text-gray-700 leading-relaxed">
              Agrega múltiples territorios a cada indicador.
            </p>
          </div>
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p class="text-sm text-gray-700 leading-relaxed">
              Cada indicador puede tener su propio rango de fechas.
            </p>
          </div>
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p class="text-sm text-gray-700 leading-relaxed">
              Utiliza diferentes tipos de gráfico para visualizar mejor los datos.
            </p>
          </div>
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p class="text-sm text-gray-700 leading-relaxed">
              Ordena los territorios usando las flechas para controlar el orden en la gráfica.
            </p>
          </div>
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p class="text-sm text-gray-700 leading-relaxed">
              Usa el checkbox para incluir o excluir territorios en la gráfica sin tener que
              eliminar el indicador.
            </p>
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
          class="no-scrollbar relative w-full max-w-[900px] mx-4 max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-gray-900 lg:p-4"
        >
          <!-- Header fijo con close btn y título -->
          <div
            class="flex-shrink-0 sticky top-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl p-4 pb-2"
          >
            <!-- close btn -->
            <button
              @click="isSearchModalOpen = false"
              class="transition-color absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300 lg:right-5 lg:top-5 lg:h-11 lg:w-11"
            >
              <svg
                class="fill-current h-5 w-5 lg:h-6 lg:w-6"
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

            <div class="px-2 pr-12 lg:pr-14">
              <h4 class="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90 lg:text-2xl">
                Buscar y seleccionar indicadores
                <span class="block text-sm text-gray-500 dark:text-gray-400 lg:inline">
                  (Seleccionados: {{ form.selectedItems.length }})</span
                >
              </h4>
            </div>
          </div>

          <!-- Contenido scrollable -->
          <div class="flex-1 overflow-y-auto px-2 pb-2">
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
            <div v-else class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <!-- Panel izquierdo: Árbol de grupos/subgrupos -->
              <aside class="lg:col-span-4 xl:col-span-3">
                <div class="flex items-center justify-between mb-3 mx-2 md:mx-0 md:mb-2">
                  <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Sectores</h5>
                  <Button type="button" variant="outline" size="sm" @click="clearGroupFilters">
                    Limpiar
                  </Button>
                </div>
                <div
                  class="rounded-xl border border-gray-200 dark:border-gray-800 overflow-y-auto max-h-[300px] lg:max-h-[440px] relative"
                >
                  <ul class="divide-y divide-gray-200 dark:divide-gray-800 bg-gray-50">
                    <li v-for="g in treeData" :key="g.id" class="py-2">
                      <div class="flex items-center gap-2 pl-2">
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
                          class="text-left grow text-[13px]"
                          :class="{
                            'text-brand-600 font-medium':
                              filters.groupId === g.id && !filters.subgroupId,
                          }"
                          @click="selectGroup(g.id)"
                        >
                          {{ g.name }}
                        </button>
                      </div>
                      <ul v-if="expandedGroups.has(g.id)" class="mt-1 pl-11 bg-gray-100">
                        <li v-for="sg in g.subgroups" :key="sg.id" class="py-1">
                          <button
                            class="text-left text-[12px] hover:underline"
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
              </aside>

              <!-- Panel derecho: filtro por nombre, lista y paginación -->
              <section class="lg:col-span-8 xl:col-span-9 flex flex-col">
                <div class="mb-2">
                  <div class="mb-3">
                    <div class="flex flex-col sm:flex-row gap-2">
                      <input
                        v-model="filters.name"
                        type="text"
                        placeholder="Buscar por nombre"
                        class="dark:bg-dark-900 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        class="shrink-0"
                        @click="clearFilters"
                      >
                        Limpiar filtros
                      </Button>
                    </div>
                  </div>

                  <!-- Lista filtrada -->
                  <div>
                    <div
                      class="overflow-hidden border border-gray-200 rounded-xl dark:border-gray-800"
                    >
                      <ul
                        class="divide-y divide-gray-200 dark:divide-gray-800 overflow-y-auto relative h-[300px] lg:h-[420px]"
                      >
                        <li
                          v-for="item in paginatedIndicators"
                          :key="item.idindicador"
                          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4"
                        >
                          <div class="min-w-0 flex-1">
                            <div class="flex items-start gap-2">
                              <InfoCircleIcon
                                class="w-5 h-5 text-gray-500 cursor-pointer mt-0.5 flex-shrink-0"
                                @click="handleShowDetails(item)"
                              />
                              <div class="min-w-0 flex-1">
                                <p
                                  class="text-sm font-medium text-gray-800 dark:text-white/90 break-words"
                                >
                                  {{ item.nombreindicador }}
                                </p>
                                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  Sector: {{ item.nombregrupo }} • Subsector:
                                  {{ item.nombresubgrupo }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button
                            :variant="isSelected(String(item.idindicador)) ? 'primary' : 'outline'"
                            class="shrink-0 w-full sm:w-auto"
                            @click="toggleSelection(item)"
                            className="px-4! py-1!"
                          >
                            {{
                              isSelected(String(item.idindicador)) ? 'Seleccionado' : 'Seleccionar'
                            }}
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Pie de página fijo con paginación y botones -->
                <div
                  class="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3"
                >
                  <!-- Controles de paginación -->
                  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div
                      class="flex items-center gap-2 text-[13px] text-gray-600 dark:text-gray-400"
                    >
                      <span>Mostrar</span>
                      <select
                        v-model.number="pageSize"
                        class="dark:bg-dark-900 appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-3 py-0.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                      >
                        <option :value="5">5</option>
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="50">50</option>
                      </select>
                      <span> por página. Total de registros: {{ filteredIndicators.length }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        @click="page = 1"
                        :disabled="page === 1"
                        className="px-2! py-1!"
                        title="Primera página"
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
                          <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        @click="prevPage"
                        :disabled="page === 1"
                        className="px-2! py-1!"
                        title="Página anterior"
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
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </Button>
                      <span class="text-sm text-gray-600 dark:text-gray-400 px-2"
                        >Página {{ page }} de {{ totalPages }}</span
                      >
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        @click="nextPage"
                        :disabled="page === totalPages"
                        className="px-2! py-1!"
                        title="Página siguiente"
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
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        @click="page = totalPages"
                        :disabled="page === totalPages"
                        className="px-2! py-1!"
                        title="Última página"
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
                          <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row justify-end gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      size="sm"
                      @click="isSearchModalOpen = false"
                      class="w-full sm:w-auto"
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      type="button"
                      size="sm"
                      @click="applySelected"
                      class="w-full sm:w-auto"
                    >
                      Agregar indicadores seleccionados
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </template>
    </Modal>

    <!-- Footer simple -->
    <FooterOnePage />
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
// Reutilizamos el componente existente
import MultiChartDashboard from '@/components/charts/MultiChartDashboard.vue'
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import HeaderOnePage from '@/components/common/custom/HeaderOnePage.vue'
import type {
  BOCardIndicadorDto,
  BOIndicadorDto,
  GenerateIndicatorRequest,
  IndicatorRequest,
  Serie,
} from '@/interfaces'
import { generateGraphic, getIndicators } from '@/services/indicator'
import IndicatorCard from '@/components/common/custom/IndicatorCard.vue'
import InfoCircleIcon from '@/icons/InfoCircleIcon.vue'
import ModalIndicatorDetail from '@/components/common/custom/ModalIndicatorDetail.vue'
import { useNotificationStore } from '@/stores/notification'
import { useIndicatorConfigStore } from '@/stores/indicatorConfig'
import NotificationContainer from '@/components/common/custom/NotificationContainer.vue'
import FooterOnePage from '@/components/common/custom/FooterOnePage.vue'

const notificationStore = useNotificationStore()
const indicatorConfigStore = useIndicatorConfigStore()
const indicators = ref<BOIndicadorDto[]>([])
const loadingIndicators = ref(false)
const loadingGenerateGraphics = ref(false)
const isSearchModalOpen = ref(false)
const showModalDetails = ref(false)
const indicatorDetail = ref<BOIndicadorDto | null>(null)
const chartData = ref<any>(null) // Almacenará los datos del gráfico
const selectedChartType = ref('line') // Tipo de gráfico seleccionado
const openTips = ref<boolean>(false)
const form = ref<{ selectedItems: { value: string; label: string }[] }>({
  selectedItems: [],
})

// Estado para almacenar configuración y checkbox por indicador
const indicatorsConfig = ref<Map<number, BOCardIndicadorDto>>(new Map())

// Selección temporal dentro del modal; solo se aplica al confirmar
const modalSelectedItems = ref<{ value: string; label: string }[]>([])

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
    const transformedIndicators: IndicatorRequest[] = []
    let error = false
    if (indicatorsConfig.value.size === 0) {
      notificationStore.error('Debe seleccionar al menos un indicador')
      loadingGenerateGraphics.value = false
      return
    }

    const thereAreCheckedElements = Array.from(indicatorsConfig.value.values()).some((indicator) =>
      indicator.elementos.some((element) => element.checked),
    )
    if (!thereAreCheckedElements) {
      notificationStore.error(`Debe seleccionar al menos un territorio`)
      error = true
    }
    for (const [, indicator] of indicatorsConfig.value) {
      // Validaciones:
      const checkedElements = indicator.elementos.filter((element) => element.checked)

      for (const element of checkedElements) {
        if (!indicator.tipoperiodo) {
          notificationStore.error('Debe seleccionar un tipo de periodo')
          error = true
        }
        if (!indicator.desde) {
          notificationStore.error('Debe completar desde')
          error = true
        }
        if (!indicator.hasta) {
          notificationStore.error('Debe completar hasta')
          error = true
        }
        if (error) {
          loadingGenerateGraphics.value = false
          return
        }

        transformedIndicators.push({
          idindicador: indicator.idindicador,
          tipografica: element.chartseleccionado,
          idtipoterritorio: +element.tipoterritorio.value,
          idterritorio: +element.territorio.value,
          idtipoperiodo: indicator.tipoperiodo!,
          idperiododesde: +indicator.desde,
          idperiodohasta: +indicator.hasta,
        })
      }
    }

    if (error) {
      loadingGenerateGraphics.value = false
      return
    }

    const params: GenerateIndicatorRequest = {
      indicadores: transformedIndicators,
    }
    const response = await generateGraphic(params)
    const responseTransformed = JSON.parse(JSON.stringify(response))
    if (!responseTransformed.exito) {
      const errorMsg = responseTransformed.errores
        .replace('gr�fica', 'gráfica')
        .replace('per�odo', 'período')
      notificationStore.error(errorMsg)
      chartData.value = null
      loadingGenerateGraphics.value = false
      return
    }
    responseTransformed.objeto.series = responseTransformed.objeto.series.map((serie: Serie) => {
      return {
        ...serie,
        nombreindicador: `${serie.nombreindicador} - ${serie.nombretipoterritorio} - ${serie.nombreterritorio}`,
      }
    })

    // Aquí puedes manejar la respuesta, por ejemplo mostrar un gráfico o mensaje
    if (responseTransformed.exito) {
      // Guardar los datos del gráfico si la respuesta es exitosa
      const copyResponseObject = JSON.parse(JSON.stringify(responseTransformed.objeto))
      chartData.value = copyResponseObject
      const hasAtLeastOneWithNoValues = copyResponseObject.series.some(
        (serie: Serie) => serie.valores.length === 0,
      )
      if (hasAtLeastOneWithNoValues) {
        const indicatorsWithNoValues = copyResponseObject.series.filter(
          (serie: Serie) => serie.valores.length === 0,
        )
        notificationStore.error(
          `Los siguientes indicadores no tienen datos para el tipo de período y territorio seleccionado: ${indicatorsWithNoValues.map((serie: Serie) => serie.nombreindicador).join(', ')}`,
        )
      } else {
        notificationStore.success('Gráfico generado exitosamente')
      }
      // Esperar a que el DOM se actualice y luego hacer scroll al div con id step-3
      nextTick(() => {
        document.getElementById('step-3')?.scrollIntoView({ behavior: 'smooth' })
        /*
        setTimeout(() => {
          document.querySelector('.apexcharts-legend')?.classList.add('block!')
        }, 500)
        */
      })
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
  const result = indicators.value.filter((i) => selectedSet.has(String(i.idindicador)))
  return result
})

const handleDeseleccionar = (indicador: BOIndicadorDto) => {
  const id: string = String(indicador.idindicador)

  form.value.selectedItems = form.value.selectedItems.filter((item) => item.value !== id)
  indicatorsConfig.value.delete(Number(id))

  //chartData.value = form.value.selectedItems.filter((item) => item.value !== id)
}

const handleConfigChange = (indicatorCard: BOCardIndicadorDto) => {
  const id = indicatorCard.idindicador
  const indicatorCardCopy = JSON.parse(JSON.stringify(indicatorCard))
  indicatorsConfig.value.set(id, indicatorCardCopy)
}

const handleApplyToAll = (config: Partial<BOCardIndicadorDto>) => {
  // Apply the configuration to all displayed indicators
  displayIndicators.value.forEach((indicator) => {
    const existingConfig = indicatorsConfig.value.get(indicator.idindicador) || {
      idindicador: indicator.idindicador,
      tipoterritorio: null,
      territorio: null,
      tipoperiodo: null,
      elementos: [],
      desde: '',
      hasta: '',
    }

    // Update the configuration
    const updatedConfig = {
      ...existingConfig,
      elementos: config.elementos || [],
      tipoperiodo: config.tipoperiodo || null,
      desde: config.desde || '',
      hasta: config.hasta || '',
    }

    indicatorsConfig.value.set(indicator.idindicador, updatedConfig)
    // Call function pasteConfiguration of child component IndicatorCard
  })
  notificationStore.success('Configuración aplicada a todos los indicadores')
}

const handleCopyConfig = (indicatorId: number, config: Partial<BOCardIndicadorDto>) => {
  // Store the copied configuration globally
  const copiedConfig = {
    elementos: config.elementos || [],
    tipoperiodo: config.tipoperiodo,
    desde: config.desde,
    hasta: config.hasta,
  }
  indicatorConfigStore.copyIndicatorConfig(copiedConfig)
  notificationStore.success(`Configuración copiada del indicador ${indicatorId}`)
}

const handlePasteConfig = (indicatorId: number) => {
  notificationStore.success(`Configuración pegada en el indicador ${indicatorId}`)
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
