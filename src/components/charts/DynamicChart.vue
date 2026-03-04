<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <!-- Header con información del indicador -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">
          {{ chartData?.objeto?.series?.[0]?.nombreindicador || 'Gráfico Dinámico' }}
        </h2>
        <p class="text-sm text-gray-500 mt-1">
          {{ chartData?.objeto?.series?.[0]?.unidadmedida || '' }}
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="text-sm text-gray-500">Actualizado: {{ lastUpdate }}</div>
        <div class="flex space-x-2">
          <button
            v-for="type in availableChartTypes"
            :key="type.value"
            @click="changeChartType(type.value)"
            :class="[
              'px-3 py-2 text-sm rounded-lg transition-colors',
              currentChartType === type.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ type.icon }} {{ type.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Gráfico principal -->
    <div class="mb-6">
      <VueApexCharts
        :key="chartKey"
        :options="chartOptions"
        :series="chartSeries"
        :type="currentChartType"
        height="400"
        ref="chartRef"
      />
    </div>

    <!-- Panel de control -->
    <div class="border-t pt-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <!-- Controles de series -->
        <div class="flex items-center space-x-4">
          <span class="text-sm font-medium text-gray-700">Series:</span>
          <div class="flex space-x-2">
            <label
              v-for="(serie, index) in chartData?.objeto?.series || []"
              :key="serie.idindicador"
              class="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                :checked="visibleSeries[index]"
                @change="toggleSeries(index)"
                class="rounded text-blue-500 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-600">{{ serie.nombreindicador }}</span>
            </label>
          </div>
        </div>

        <!-- Exportación -->
        <div class="flex items-center space-x-3">
          <span class="text-sm font-medium text-gray-700">Exportar:</span>
          <button
            @click="exportToCSV"
            class="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 text-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            @click="exportToJSON"
            class="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2 text-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span>JSON</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Estadísticas -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="(serie, index) in visibleChartData"
        :key="serie.idindicador"
        class="bg-gray-50 rounded-lg p-4"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">{{ serie.nombreindicador }}</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatValue(getSeriesStats(serie).latest) }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Total</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ formatValue(getSeriesStats(serie).total) }}
            </p>
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span
            :class="[
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
              getSeriesStats(serie).trend >= 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800',
            ]"
          >
            {{ getSeriesStats(serie).trend >= 0 ? '↑' : '↓' }}
            {{ Math.abs(getSeriesStats(serie).trend).toFixed(1) }}%
          </span>
          <span class="ml-2 text-gray-500">vs período anterior</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Interfaces TypeScript para la estructura de datos
export interface Valor {
  idperiodo: number
  nombreperiodo: string
  valor: number
}

export interface Serie {
  idindicador: number
  nombreindicador: string
  unidadmedida: string
  simbolounidadmedida: string
  tipografica: string
  valores: Valor[]
}

export interface Objeto {
  idtipoperiodo: number
  idtipoterritorio: number
  series: Serie[]
}

export interface ChartData {
  objeto: Objeto
  exito: boolean
  listaErrores: string[]
  errores: string
  listaMensajes: string[]
  mensajes: string
}

// Props
interface Props {
  chartData: ChartData | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

// Estado reactivo
const currentChartType = ref<'line' | 'bar' | 'area' | 'pie'>('line')
const visibleSeries = ref<boolean[]>([])
const chartKey = ref(0)
const lastUpdate = ref<string>(new Date().toLocaleString())
const chartRef = ref()

// Tipos de gráficos disponibles basados en tipografica
const availableChartTypes = computed(() => {
  const types: Array<{ label: string; value: 'line' | 'bar' | 'area' | 'pie'; icon: string }> = [
    { label: 'Línea', value: 'line', icon: '📈' },
    { label: 'Barras', value: 'bar', icon: '📊' },
    { label: 'Área', value: 'area', icon: '🔽' },
  ]

  // Agregar tipos específicos según los datos
  if (props.chartData?.objeto?.series) {
    const uniqueTypes = new Set(props.chartData.objeto.series.map((s) => s.tipografica))
    if (uniqueTypes.has('pie')) {
      types.push({ label: 'Circular', value: 'pie', icon: '🥧' })
    }
  }

  return types
})

// Datos del gráfico transformados para ApexCharts
const chartSeries = computed(() => {
  if (!props.chartData?.objeto?.series) return []

  return props.chartData.objeto.series
    .map((serie, index) => {
      if (!visibleSeries.value[index]) return null

      return {
        name: serie.nombreindicador,
        data: serie.valores.map((valor) => valor.valor),
        type: currentChartType.value,
      }
    })
    .filter(Boolean)
})

// Categorías del eje X
const xaxisCategories = computed(() => {
  if (!props.chartData?.objeto?.series?.[0]?.valores) return []

  return props.chartData.objeto.series[0].valores.map((valor) => valor.nombreperiodo)
})

// Series visibles para estadísticas
const visibleChartData = computed(() => {
  if (!props.chartData?.objeto?.series) return []

  return props.chartData.objeto.series.filter((_, index) => visibleSeries.value[index])
})

// Opciones del gráfico
const chartOptions = computed(() => ({
  chart: {
    type: currentChartType.value,
    height: 400,
    zoom: {
      enabled: ['line', 'area'].includes(currentChartType.value),
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: ['line', 'area'].includes(currentChartType.value),
        zoom: ['line', 'area'].includes(currentChartType.value),
        zoomin: ['line', 'area'].includes(currentChartType.value),
        zoomout: ['line', 'area'].includes(currentChartType.value),
        pan: ['line', 'area'].includes(currentChartType.value),
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
  colors: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'],
  dataLabels: {
    enabled: currentChartType.value === 'bar',
  },
  stroke: {
    curve: currentChartType.value === 'line' ? ('smooth' as const) : ('straight' as const),
    width: currentChartType.value === 'area' ? 2 : 3,
  },
  title: {
    text: props.chartData?.objeto?.series?.[0]?.nombreindicador || 'Análisis de Datos',
    align: 'left' as const,
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#111827',
    },
  },
  xaxis: {
    categories: xaxisCategories.value,
    labels: {
      style: {
        colors: '#6B7280',
        fontSize: '12px',
      },
      rotate: -45,
      rotateAlways: xaxisCategories.value.length > 6,
    },
    title: {
      text: 'Período',
      style: {
        color: '#6B7280',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6B7280',
        fontSize: '12px',
      },
      formatter: (value: number) => formatValue(value),
    },
    title: {
      text: props.chartData?.objeto?.series?.[0]?.simbolounidadmedida || 'Valor',
      style: {
        color: '#6B7280',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
  },
  grid: {
    borderColor: '#E5E7EB',
    row: {
      colors: ['#F9FAFB', 'transparent'],
    },
  },
  legend: {
    position: 'top' as const,
    horizontalAlign: 'right' as const,
    labels: {
      colors: '#374151',
    },
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: (value: number, { seriesIndex }: { seriesIndex: number }) => {
        const serie = props.chartData?.objeto?.series?.[seriesIndex]
        const symbol = serie?.simbolounidadmedida || ''
        return `${symbol} ${formatValue(value)}`
      },
    },
    x: {
      formatter: (value: number) => {
        return xaxisCategories.value[value] || `Período ${value + 1}`
      },
    },
  },
  markers: {
    size: 4,
    hover: {
      sizeOffset: 2,
    },
  },
  fill: {
    opacity: currentChartType.value === 'area' ? 0.6 : 1,
    type: currentChartType.value === 'area' ? 'gradient' : 'solid',
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: {
        position: 'top',
      },
    },
  },
}))

// Funciones de utilidad
const formatValue = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toFixed(2)
}

const getSeriesStats = (serie: Serie) => {
  const valores = serie.valores
  const latest = valores[valores.length - 1]?.valor || 0
  const previous = valores[valores.length - 2]?.valor || 0
  const total = valores.reduce((sum, val) => sum + val.valor, 0)
  const trend = previous > 0 ? ((latest - previous) / previous) * 100 : 0

  return { latest, previous, total, trend }
}

// Funciones de interacción
const changeChartType = (type: 'line' | 'bar' | 'area' | 'pie') => {
  currentChartType.value = type
  chartKey.value++
}

const toggleSeries = (index: number) => {
  visibleSeries.value[index] = !visibleSeries.value[index]
  chartKey.value++
}

const exportToCSV = () => {
  if (!props.chartData?.objeto?.series) return

  let csvContent =
    'Período,' +
    props.chartData.objeto.series
      .filter((_, index) => visibleSeries.value[index])
      .map((s) => s.nombreindicador)
      .join(',') +
    '\n'

  const maxLength = Math.max(
    ...props.chartData.objeto.series
      .filter((_, index) => visibleSeries.value[index])
      .map((s) => s.valores.length),
  )

  for (let i = 0; i < maxLength; i++) {
    const row = [xaxisCategories.value[i] || '']

    props.chartData.objeto.series
      .filter((_, index) => visibleSeries.value[index])
      .forEach((serie) => {
        row.push(serie.valores[i]?.valor?.toString() || '')
      })

    csvContent += row.join(',') + '\n'
  }

  downloadFile(csvContent, 'text/csv', `chart_data_${new Date().toISOString().split('T')[0]}.csv`)
}

const exportToJSON = () => {
  if (!props.chartData) return

  const jsonData = {
    ...props.chartData,
    exportDate: new Date().toISOString(),
    visibleSeries: props.chartData.objeto.series.filter((_, index) => visibleSeries.value[index]),
  }

  downloadFile(
    JSON.stringify(jsonData, null, 2),
    'application/json',
    `chart_data_${new Date().toISOString().split('T')[0]}.json`,
  )
}

const downloadFile = (content: string, mimeType: string, filename: string) => {
  const blob = new Blob([content], { type: mimeType })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

// Watchers
watch(
  () => props.chartData,
  (newData) => {
    if (newData?.objeto?.series) {
      visibleSeries.value = newData.objeto.series.map(() => true)
      lastUpdate.value = new Date().toLocaleString()
      chartKey.value++
    }
  },
  { immediate: true, deep: true },
)

watch(
  () => props.loading,
  (isLoading) => {
    if (isLoading) {
      console.log('Cargando datos del gráfico...')
    }
  },
)

onMounted(() => {
  console.log('DynamicChart component mounted')
})
</script>

<style scoped>
.transition-colors {
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

input[type='checkbox'] {
  cursor: pointer;
}

:deep(.apexcharts-tooltip) {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
