<template>
  <div class="bg-gray-50 p-4 md:p-6">
    <!-- Gráfico principal (para otros tipos) -->
    <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div class="flex justify-between items-center mb-4">
        <span></span>
        <div class="flex items-center space-x-4">
          <button
            @click="toggleLegend"
            class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            {{ showLegend ? 'Ocultar Leyenda' : 'Mostrar Leyenda' }}
          </button>
        </div>
      </div>
      <VueApexCharts
        :key="chartKey"
        :options="chartOptions"
        :series="filteredSeries"
        :type="currentChartType === 'pie' ? 'pie' : 'line'"
        height="400"
        ref="mainChart"
      />
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
import { ref, computed, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/composables/useTheme'

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
const visibleSeries = ref([true, true, true])
const lastUpdate = ref(new Date().toLocaleString())
const chartKey = ref(0)
const showLegend = ref(true)
const { isDark, toggleTheme, enableDarkMode, enableLightMode } = useTheme()
const mainChart = ref(null)

// Tipos de gráficos disponibles (incluyendo pie)
const chartTypes = [
  { label: 'Línea', value: 'line', icon: '📈' },
  { label: 'Barras', value: 'bar', icon: '📊' },
  { label: 'Área', value: 'area', icon: '🔽' },
  { label: 'Pie', value: 'pie', icon: '🥧' },
  { label: 'Dispersión', value: 'scatter', icon: '⚫' },
  { label: 'Radar', value: 'radar', icon: '🔄' },
]

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
    return uniquePeriods.sort((a, b) => a.localeCompare(b))
  }
  // Categorías por defecto
  return []
  //return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
})

// Etiqueta del gráfico actual
const currentChartTypeLabel = computed(() => {
  const type = chartTypes.find((t) => t.value === currentChartType.value)
  return type ? type.label : 'Gráfico'
})

// Series computadas que usan datos reales si están disponibles
const series = computed(() => {
  if (props.chartData && props.chartData.series) {
    // Obtener unidades de medida únicas
    const uniqueUnits = [...new Set(props.chartData.series.map((serie) => serie.unidadmedida))]

    // Transformar los datos de la API al formato esperado por ApexCharts
    return props.chartData.series.map((serie) => {
      // Encontrar el índice del eje Y para esta unidad de medida
      const yAxisIndex = uniqueUnits.indexOf(serie.unidadmedida)

      return {
        name: serie.nombreindicador,
        type: serie.tipografica, // Usar el tipo de gráfico específico de cada serie
        data: serie.valores.map((valor) => valor.valor),
        // Asignar al eje Y correspondiente a su unidad de medida
        yAxisIndex: yAxisIndex,
      }
    })
  }
  return []
})

// Series filtradas según visibilidad
const filteredSeries = computed(() => {
  return series.value.filter((_, index) => visibleSeries.value[index])
})

// Colores para las series
const seriesColor = (index) => {
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']
  return colors[index % colors.length]
}

// Opciones del gráfico principal (no pie)
const chartOptions = computed(() => ({
  chart: {
    type: 'line', // Usar 'line' como base para permitir tipos mixtos
    height: 400,
    zoom: {
      enabled: currentChartType.value !== 'radar',
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
  colors: series.value.map((_, index) => seriesColor(index)),
  dataLabels: {
    enabled: currentChartType.value === 'radar',
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
      // Obtener unidades de medida únicas
      const uniqueUnits = [...new Set(props.chartData.series.map((serie) => serie.unidadmedida))]

      // Crear un eje Y para cada unidad de medida única
      return uniqueUnits.map((unidad, index) => ({
        seriesName: unidad,
        opposite: index % 2 === 1,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: seriesColor(index),
        },
        labels: {
          style: {
            colors: seriesColor(index),
            fontWeight: 600,
          },
          formatter: (value) => {
            if (unidad.includes('Porcentaje') || unidad.includes('%')) {
              return `${value}%`
            } else if (unidad.includes('Soles') || unidad.includes('S/.')) {
              return `S/ ${value.toLocaleString('es-PE')}`
            }
            return value.toString()
          },
        },
        title: {
          text: unidad,
          style: {
            color: seriesColor(index),
            fontWeight: 'bold',
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
    position: 'top',
    horizontalAlign: 'center',
    labels: {
      colors: isDark.value ? '#E5E7EB' : '#374151',
    },
  },
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
    y: {
      formatter: (value, { seriesIndex }) => {
        if (props.chartData && props.chartData.series && props.chartData.series[seriesIndex]) {
          const unidad = props.chartData.series[seriesIndex].unidadmedida
          if (unidad.includes('Porcentaje') || unidad.includes('%')) {
            return `${value}%`
          } else if (unidad.includes('Soles') || unidad.includes('S/.')) {
            return `S/ ${Number(value).toLocaleString('es-PE')}`
          }
        }
        return value.toString()
      },
    },
  },
  markers: {
    size: currentChartType.value === 'scatter' ? 6 : 4,
    hover: {
      sizeOffset: 2,
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

  csvContent = headers.join(',') + '\n'

  // Iterar sobre cada período/ categoría
  for (let i = 0; i < categories.length; i++) {
    const row = [categories[i], ...series.value.map((s) => s.data[i] || '')]
    csvContent += row.join(',') + '\n'
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
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

// Watch para mostrar loading
watch(
  () => props.loading,
  (isLoading) => {
    if (isLoading) {
      // Opcional: mostrar indicador de carga
      console.log('Cargando datos del gráfico...')
    }
  },
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
