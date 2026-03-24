<template>
  <div class="bg-gray-50 p-0 md:p-6">
    <!-- Gráfico principal (para otros tipos) -->
    <div
      class="flex justify-center md:justify-between items-start mt-4 bg-white shadow-sm rounded-t-lg border-t border-l border-r"
    >
      <h2 class="text-lg font-semibold text-gray-800 pl-5 pt-2 hidden md:block"></h2>
      <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        <!-- Leyenda -->
        <div class="flex-1">
          <div class="m-2 sm:m-3 p-2 sm:p-3 flex flex-col border border-gray-100 rounded-2xl">
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pb-3"
            >
              <h3 class="text-sm font-medium text-gray-700 sm:pr-5">Leyenda</h3>
              <Button
                :variant="showLegend ? 'outline' : 'primary'"
                class="shrink-0 w-full sm:w-auto"
                @click="toggleLegend"
                className="px-4! py-1!"
              >
                {{ showLegend ? 'Ocultar' : 'Mostrar' }}
              </Button>
            </div>
          </div>
        </div>
        <!-- Valores -->
        <div class="flex-1 sm:flex-none">
          <div class="m-2 sm:m-3 p-2 sm:p-3 flex flex-col border border-gray-100 rounded-2xl">
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pb-3"
            >
              <h3 class="text-sm font-medium text-gray-700">Valores</h3>
              <Button
                :variant="showDataLabels ? 'outline' : 'primary'"
                class="shrink-0 w-full sm:w-auto"
                @click="toggleDataLabels"
                className="px-4! py-1!"
              >
                {{ showDataLabels ? 'Ocultar' : 'Mostrar' }}
              </Button>
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Tamaño:</label>
              <input v-model="dataLabelsSize" type="range" min="8" max="20" class="w-20" />
              <span class="text-sm text-gray-600 w-8">{{ dataLabelsSize }}px</span>
            </div>
          </div>
        </div>
        <!-- Tooltip -->
        <div class="flex-1">
          <div class="m-2 sm:m-3 p-2 sm:p-3 flex flex-col border border-gray-100 rounded-2xl">
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pb-3"
            >
              <h3 class="text-sm font-medium text-gray-700 sm:pr-5">Tooltip</h3>
              <Button
                :variant="showTooltip ? 'outline' : 'primary'"
                class="shrink-0 w-full sm:w-auto"
                @click="toggleTooltip"
                className="px-4! py-1!"
              >
                {{ showTooltip ? 'Ocultar' : 'Mostrar' }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-b-xl shadow-sm pb-4 pr-2 md:p-4 mb-6 flex flex-col">
      <div class="flex-1 w-full" style="min-height: 400px">
        <VueApexCharts
          :key="chartKey"
          :options="chartOptions"
          :series="series"
          :type="currentChartType === 'pie' ? 'pie' : 'line'"
          height="100%"
          width="100%"
          ref="mainChart"
        />
      </div>
    </div>

    <!-- Botones de exportación -->
    <div class="bg-white rounded-xl shadow-sm p-4">
      <div class="flex flex-wrap gap-3 justify-left">
        <div class="flex flex-col space-y-2">
          <span class="text-sm font-medium text-gray-700">Exportar Datos:</span>
          <div class="flex items-center space-x-3">
            <button
              @click="exportToCSV"
              :disabled="
                !props.chartData || !props.chartData.series || props.chartData.series.length === 0
              "
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 text-xl"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>CSV</span>
            </button>
            <button
              @click="exportToPNG"
              :disabled="
                !props.chartData || !props.chartData.series || props.chartData.series.length === 0
              "
              class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2 text-xl"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/composables/useTheme'
import Button from '@/components/ui/Button.vue'

// Props para recibir datos del componente padre
const props = defineProps({
  chartData: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  chartType: {
    type: String,
    default: 'line',
  },
})

// Configuración inicial
const currentChartType = computed(() => props.chartType || 'line')
//const visibleSeries = ref(props.chartData?.series?.map(() => true) || [])
const lastUpdate = ref(new Date().toLocaleString())
const chartKey = ref(0)
const showLegend = ref(true)
const showDataLabels = ref(true)
const showTooltip = ref(true)
const dataLabelsSize = ref(9)
const { isDark } = useTheme()
const mainChart = ref(null)

// Window width reactive
const windowWidth = ref(window.innerWidth)
const percentage = 'Porcentaje'
// Handle window resize
const handleResize = () => {
  windowWidth.value = window.innerWidth
  chartKey.value++ // Force chart re-render
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Categorías del eje X computadas desde los datos reales de TODAS las series
const xaxisCategories = computed(() => {
  if (props.chartData && props.chartData.series && props.chartData.series.length > 0) {
    // Recolectar todos los nombres de períodos de TODAS las series
    const allPeriodNames = props.chartData.series.flatMap((serie) =>
      serie.valores.map((valor) => valor.nombreperiodo),
    )

    // Obtener valores únicos y ordenarlos
    const uniquePeriods = [
      ...new Set(allPeriodNames.filter((name) => name !== null && name !== undefined)),
    ]
    return uniquePeriods
  }
  // Categorías por defecto
  return []
})

// Series computadas que usan datos reales si están disponibles
const series = computed(() => {
  if (props.chartData && props.chartData.series) {
    // Transformar los datos de la API al formato esperado por ApexCharts
    return props.chartData.series.map((serie) => {
      return {
        name: serie.nombreindicador,
        type: serie.tipografica, // Usar el tipo de gráfico específico de cada serie
        data: serie.valores.map((valor) => valor.valor),
      }
    })
  }
  return []
})

// Colores para las series
const seriesColor = (index) => {
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#000000', '#10ff00', '#00ffed']
  return colors[index % colors.length]
}

// Opciones del gráfico principal (no pie)
const chartOptions = computed(() => ({
  chart: {
    type: 'line', // Usar 'line' como base para permitir tipos mixtos
    height: '100%',
    width: '100%',
    zoom: {
      enabled: currentChartType.value !== 'radar',
    },
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: currentChartType.value !== 'radar',
        zoom: currentChartType.value !== 'radar',
        zoomin: currentChartType.value !== 'radar',
        zoomout: currentChartType.value !== 'radar',
        pan: currentChartType.value !== 'radar',
        reset: true,
      },
    },
    animations: {
      enabled: true,
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
    },
  },
  plotOptions: {
    line: {
      dataLabels: {
        position: 'top',
      },
    },
    area: {
      dataLabels: {
        position: 'top',
      },
    },
    bar: {
      dataLabels: {
        position: 'center',
        orientation: 'horizontal',
      },
      horizontal: false,
      columnWidth: '70%',
      endingShape: 'rounded',
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        dataLabels: {
          enabled: showDataLabels.value && xaxisCategories.value.length <= 8,
          style: {
            fontSize: `${Math.max(dataLabelsSize.value - 2, 6)}px`,
          },
          offsetY: -8,
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
          },
        },
      },
    },
    {
      breakpoint: 480,
      options: {
        dataLabels: {
          enabled: showDataLabels.value && xaxisCategories.value.length <= 6,
          style: {
            fontSize: `${Math.max(dataLabelsSize.value - 3, 5)}px`,
          },
          offsetY: -6,
        },
        plotOptions: {
          bar: {
            columnWidth: '90%',
          },
        },
      },
    },
  ],
  colors: series.value.map((_, index) => seriesColor(index)),
  dataLabels: {
    enabled: showDataLabels.value,
    style: {
      fontSize: `${dataLabelsSize.value}px`,
      colors: series.value.map((_, index) => seriesColor(index)),
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      opacity: 0.5,
    },
    background: {
      enabled: true,
      foreColor: '#fff',
      padding: 4,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: series.value.map((_, index) => seriesColor(index)),
      opacity: 0.9,
    },
    offsetX: 0,
    offsetY: -10,
    position: 'top',
    textAnchor: 'middle',
    distributed: false,
    hideOverflowingLabels: true,
    formatter: function (value, opts) {
      const seriesIndex = opts.seriesIndex
      if (props.chartData && props.chartData.series && props.chartData.series[seriesIndex]) {
        const serie = props.chartData.series[seriesIndex]
        if (serie.unidadmedida.includes(percentage) || serie.unidadmedida.includes('%')) {
          return `${value}%`
        } else if (serie.unidadmedida.includes('Soles') || serie.unidadmedida.includes('S/.')) {
          return `S/ ${value.toLocaleString('es-PE')}`
        }
      }
      return value.toString()
    },
  },
  stroke: {
    curve: currentChartType.value === 'line' ? 'smooth' : 'straight',
    width: currentChartType.value === 'radar' ? 2 : 3,
    dashArray: currentChartType.value === 'radar' ? [0, 0] : undefined,
  },
  xaxis: {
    categories: xaxisCategories.value,
    labels: {
      style: {
        colors: isDark.value ? '#9CA3AF' : '#6B7280',
      },
    },
  },
  yaxis: (() => {
    if (props.chartData && props.chartData.series) {
      // Obtener unidades de medida únicas manteniendo el orden de aparición
      const uniqueUnits = []
      const unitOrder = new Map()

      props.chartData.series.forEach((serie, index) => {
        if (!unitOrder.has(serie.unidadmedida)) {
          unitOrder.set(serie.unidadmedida, serie.nombreindicador)
          uniqueUnits.push(serie)
        }
      })

      // Crear un eje Y para cada unidad de medida única
      return props.chartData.series.map((serie, index) => ({
        seriesName: unitOrder.get(serie.unidadmedida),
        opposite: uniqueUnits.findIndex((u) => u.unidadmedida === serie.unidadmedida) % 2 === 1,
        min: serie.unidadmedida.includes(percentage) ? 0 : undefined,
        max: serie.unidadmedida.includes(percentage) ? 100 : undefined,
        labels: {
          style: {
            colors: seriesColor(index),
            fontWeight: 600,
            fontSize: '10px',
          },
          formatter: (value) => {
            if (serie.unidadmedida.includes(percentage) || serie.unidadmedida.includes('%')) {
              return `${value}%`
            } else if (serie.unidadmedida.includes('Soles') || serie.unidadmedida.includes('S/.')) {
              return `S/ ${value.toLocaleString('es-PE')}`
            }
            return value.toString()
          },
        },
        title: {
          text: serie.unidadmedida,
          style: {
            color: seriesColor(index),
            fontWeight: 'bold',
            fontSize: '11px',
          },
        },
      }))
    }
    return {
      labels: {
        style: {
          colors: isDark.value ? '#9CA3AF' : '#6B7280',
        },
      },
    }
  })(),

  grid: {
    borderColor: isDark.value ? '#374151' : '#E5E7EB',
    row: {
      colors: isDark.value ? ['#1F2937', 'transparent'] : ['#F9FAFB', 'transparent'],
    },
  },
  legend: {
    show: showLegend.value,
    showForSingleSeries: true,
    position: windowWidth.value < 768 ? 'bottom' : 'top',
    horizontalAlign: 'left',
    orientation: 'vertical',
    labels: {
      colors: isDark.value ? '#E5E7EB' : '#374151',
    },
  },
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      // Obtener el nombre del período desde los datos originales
      // Si la primera serie no tiene valores, buscar en las siguientes series
      let categoryName = ''
      if (props.chartData && props.chartData.series && props.chartData.series.length > 0) {
        // Buscar en todas las series hasta encontrar una con valores en este punto
        let foundCategory = false
        for (let seriesIndex = 0; seriesIndex < props.chartData.series.length; seriesIndex++) {
          const currentSeries = props.chartData.series[seriesIndex]
          if (
            currentSeries &&
            currentSeries.valores &&
            currentSeries.valores[dataPointIndex] &&
            currentSeries.valores[dataPointIndex].nombreperiodo
          ) {
            categoryName = currentSeries.valores[dataPointIndex].nombreperiodo
            foundCategory = true
            break
          }
        }

        // Si ninguna serie tiene el nombre del período, usar el label del gráfico
        if (!foundCategory) {
          categoryName = w.globals.labels[dataPointIndex]
        }
      } else {
        categoryName = w.globals.labels[dataPointIndex]
      }

      // Construir el tooltip con todas las series para este punto de datos
      const tooltipMinWidth = windowWidth.value < 768 ? '150px' : '200px'
      const titleFontSize = windowWidth.value < 768 ? 'text-[11px]' : 'text-sm'
      const seriesNameFontSize = windowWidth.value < 768 ? 'text-[9px]' : 'text-xs'
      const valueFontSize = windowWidth.value < 768 ? 'text-[10px]' : 'text-sm'
      const unitFontSize = windowWidth.value < 768 ? 'text-[8px]' : 'text-[10px]'

      let tooltipContent =
        '<div class="custom-tooltip p-2 md:p-3 rounded-lg shadow-lg border" style="min-width: ' +
        tooltipMinWidth +
        '" ' +
        (isDark.value
          ? 'bg-gray-800 text-gray-200 border-gray-600'
          : 'bg-white text-gray-700 border-gray-200') +
        '">' +
        '<div class="font-bold text-center mb-2 md:mb-3 pb-1 md:pb-2 border-b ' +
        titleFontSize +
        ' ' +
        (isDark.value ? 'border-gray-600' : 'border-gray-200') +
        '">' +
        categoryName +
        '</div>'

      // Iterar sobre todas las series para mostrar sus valores en este punto
      series.forEach((serieData, index) => {
        if (
          w.globals.seriesNames[index] &&
          serieData[dataPointIndex] !== null &&
          serieData[dataPointIndex] !== undefined
        ) {
          const seriesName = w.globals.seriesNames[index]
          const value = serieData[dataPointIndex]
          const originalSeries = props.chartData.series[index]
          const unidadMedida = originalSeries?.unidadmedida || ''
          const color = w.globals.colors[index]

          // Formatear el valor según la unidad de medida
          let formattedValue = value
          if (unidadMedida.includes(percentage) || unidadMedida.includes('%')) {
            formattedValue = `${value}%`
          } else if (unidadMedida.includes('Soles') || unidadMedida.includes('S/.')) {
            formattedValue = `S/ ${value.toLocaleString('es-PE')}`
          }

          tooltipContent +=
            '<div class="mb-1 md:mb-2 flex items-center justify-between">' +
            '<div class="flex items-center">' +
            '<div class="w-2 md:w-3 h-2 md:h-3 rounded-sm mr-1 md:mr-2" style="background: ' +
            color +
            '"></div>' +
            '<div>' +
            '<div class="font-medium ' +
            seriesNameFontSize +
            '">' +
            seriesName +
            '</div>' +
            '<div class="' +
            unitFontSize +
            ' ' +
            (isDark.value ? 'text-gray-400' : 'text-gray-500') +
            '">' +
            unidadMedida +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="pl-2 md:pl-5 font-bold ' +
            valueFontSize +
            '" style="color: ' +
            color +
            ';">' +
            formattedValue +
            '</div>' +
            '</div>'
        }
      })

      tooltipContent += '</div>'
      return tooltipContent
    },
    enabled: showTooltip.value,
  },
  markers: {
    size: currentChartType.value === 'scatter' ? 6 : 4,
    hover: {
      sizeOffset: 1,
    },
  },
  fill: {
    opacity: currentChartType.value === 'area' ? 0.6 : 1,
    type: currentChartType.value === 'radar' ? 'gradient' : 'solid',
    gradient:
      currentChartType.value === 'radar'
        ? {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.8,
            opacityTo: 0.2,
            stops: [0, 90, 100],
          }
        : undefined,
  },
}))

const exportToCSV = () => {
  if (!props.chartData || !props.chartData.series || props.chartData.series.length === 0) {
    alert('No hay datos disponibles para exportar')
    return
  }

  let csvContent = ''

  // Usar las categorías reales del eje X
  const categories = xaxisCategories.value
  const headers = ['Período', ...series.value.map((s) => s.name)]

  csvContent = headers.map((h) => `"${h}"`).join(';') + '\n'

  // Iterar sobre cada período/ categoría
  for (let i = 0; i < categories.length; i++) {
    const row = [
      `"${categories[i]}"`,
      ...series.value.map((s) => {
        const value = s.data[i]
        if (value !== null && value !== undefined && value !== '') {
          return `"${value}"`
        }
        return `""`
      }),
    ]
    csvContent += row.join(';') + '\n'
  }

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  const fileName = `datos_${currentChartType.value}_${new Date().toISOString().split('T')[0]}.csv`
  link.download = fileName
  link.click()

  alert('Archivo CSV generado con éxito')
}

const exportToPNG = () => {
  if (
    !mainChart.value ||
    !props.chartData ||
    !props.chartData.series ||
    props.chartData.series.length === 0
  ) {
    alert('No hay datos disponibles para exportar')
    return
  }

  try {
    // Usar el método dataURI de ApexCharts para exportar a PNG
    const chart = mainChart.value.chart
    chart.dataURI().then(({ imgURI }) => {
      const link = document.createElement('a')
      link.href = imgURI
      link.download = `grafico_${currentChartType.value}_${new Date().toISOString().split('T')[0]}.png`
      link.click()
    })
  } catch (error) {
    console.error('Error al exportar PNG:', error)
    alert('Error al exportar el gráfico como PNG')
  }
}

const toggleLegend = () => {
  showLegend.value = !showLegend.value
}

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value
}

const toggleDataLabels = () => {
  showDataLabels.value = !showDataLabels.value
}

// Watch para actualizar el gráfico cuando lleguen nuevos datos
watch(
  () => props.chartData,
  (newData) => {
    if (newData) {
      lastUpdate.value = new Date().toLocaleString()
      chartKey.value++ // Forzar re-render del gráfico
    }
  },
  { deep: true },
)
</script>

<style scoped>
/* Estilos adicionales */
input[type='date'] {
  font-family: inherit;
}

.apexcharts-tooltip {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Transiciones suaves */
.transition-colors {
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.transition-shadow {
  transition: box-shadow 0.2s ease;
}

/* Estilos para modo oscuro */
:deep(.dark) .bg-white {
  background-color: #1f2937 !important;
}

:deep(.dark) .text-gray-800 {
  color: #e5e7eb !important;
}

:deep(.dark) .text-gray-600 {
  color: #9ca3af !important;
}

:deep(.dark) .text-gray-700 {
  color: #d1d5db !important;
}

:deep(.dark) .bg-gray-50 {
  background-color: #111827 !important;
}

:deep(.dark) .border-gray-200 {
  border-color: #374151 !important;
}
</style>
