<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Dashboard de Gráficos Interactivo</h1>
      <p class="text-gray-600 mt-2">Visualiza y analiza tus datos en tiempo real</p>
    </div>

    <!-- Controles -->
    <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <!-- Selector de tipo de gráfico -->
        <div class="flex flex-col space-y-2 w-full md:w-auto">
          <span class="text-sm font-medium text-gray-700">Tipo de Gráfico Principal:</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="chartType in chartTypes"
              :key="chartType.value"
              @click="changeChartType(chartType.value)"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2',
                currentChartType === chartType.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              <span>{{ chartType.icon }}</span>
              <span>{{ chartType.label }}</span>
            </button>
          </div>
        </div>

        <!-- Controles de exportación -->
        <div class="flex flex-col space-y-2">
          <span class="text-sm font-medium text-gray-700">Exportar Datos:</span>
          <div class="flex items-center space-x-3">
            <button
              @click="exportToCSV"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
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
              class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
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

    <!-- Vista principal condicional -->
    <div v-if="currentChartType === 'pie'" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Gráfico de Pie principal -->
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Distribución por Categoría</h2>
          <div class="text-sm text-gray-500">Total: ${{ totalPieValue.toLocaleString() }}</div>
        </div>
        <VueApexCharts
          :key="'pie-main'"
          :options="mainPieOptions"
          :series="mainPieSeries"
          type="pie"
          height="400"
        />
      </div>

      <!-- Detalles del Pie Chart -->
      <div class="bg-white rounded-xl shadow-sm p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Detalles por Categoría</h3>
        <div class="space-y-3">
          <div
            v-for="(item, index) in pieCategories"
            :key="item.name"
            class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            :style="{ borderLeft: `4px solid ${pieColors[index]}` }"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :style="{ backgroundColor: `${pieColors[index]}20` }"
              >
                <span class="text-sm font-medium" :style="{ color: pieColors[index] }">
                  {{ item.percentage }}%
                </span>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ item.name }}</p>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-gray-900">${{ item.value.toLocaleString() }}</p>
              <p class="text-sm" :class="item.trend >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ item.trend >= 0 ? '+' : '' }}{{ item.trend }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráfico principal (para otros tipos) -->
    <div v-else class="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">
          Vista Principal - {{ currentChartTypeLabel }}
        </h2>
        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-500">Actualizado: {{ lastUpdate }}</div>
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
        :type="currentChartType"
        height="400"
        ref="mainChart"
      />
    </div>

    <!-- Filtro de fecha y controles adicionales -->
    <div class="bg-white rounded-xl shadow-sm p-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-col space-y-2">
          <span class="text-sm font-medium text-gray-700">Filtro de Fechas:</span>
          <div class="flex flex-wrap gap-2 items-center">
            <input
              type="date"
              v-model="dateRange.start"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span class="text-gray-400">hasta</span>
            <input
              type="date"
              v-model="dateRange.end"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              @click="applyDateFilter"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <span class="text-sm font-medium text-gray-700">Acciones:</span>
          <div class="flex gap-2">
            <button
              @click="resetFilters"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Restablecer</span>
            </button>

            <button
              @click="toggleDarkMode"
              class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <span>Modo Oscuro</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Configuración inicial
const currentChartType = ref('line')
const visibleSeries = ref([true, true, true])
const lastUpdate = ref(new Date().toLocaleString())
const chartKey = ref(0)
const dateRange = ref({
  start: '2024-01-01',
  end: '2024-12-31',
})
const showLegend = ref(true)
const highlightedMetric = ref(null)
const isDarkMode = ref(false)

// Tipos de gráficos disponibles (incluyendo pie)
const chartTypes = [
  { label: 'Línea', value: 'line', icon: '📈' },
  { label: 'Barras', value: 'bar', icon: '📊' },
  { label: 'Área', value: 'area', icon: '🔽' },
  { label: 'Pie', value: 'pie', icon: '🥧' },
  { label: 'Dispersión', value: 'scatter', icon: '⚫' },
  { label: 'Radar', value: 'radar', icon: '🔄' },
]

// Etiqueta del gráfico actual
const currentChartTypeLabel = computed(() => {
  const type = chartTypes.find((t) => t.value === currentChartType.value)
  return type ? type.label : 'Gráfico'
})

// Datos de ejemplo
const series = ref([
  {
    name: 'Ventas',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 95, 120],
  },
  {
    name: 'Gastos',
    data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
  },
  {
    name: 'Beneficios',
    data: [10, 15, 5, 15, 9, 15, 20, 36, 65, 45, 25, 45],
  },
])

// Datos para gráfico de pie principal
const mainPieSeries = ref([44, 55, 13, 43, 22])
const pieColors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']
const pieCategories = ref([
  {
    name: 'Marketing',
    value: 44000,
    percentage: 25,
    description: 'Campañas publicitarias',
    trend: 12,
  },
  {
    name: 'Desarrollo',
    value: 55000,
    percentage: 31,
    description: 'Producto y tecnología',
    trend: 8,
  },
  {
    name: 'Ventas',
    value: 13000,
    percentage: 7,
    description: 'Equipo comercial',
    trend: 15,
  },
  {
    name: 'Soporte',
    value: 43000,
    percentage: 24,
    description: 'Atención al cliente',
    trend: 5,
  },
  {
    name: 'Administración',
    value: 22000,
    percentage: 13,
    description: 'Gestión y operaciones',
    trend: -3,
  },
])

const totalPieValue = computed(() => {
  return mainPieSeries.value.reduce((a, b) => a + b, 0) * 1000
})

// Opciones del gráfico de pie principal
const mainPieOptions = computed(() => ({
  chart: {
    type: 'pie',
    height: 400,
    animations: {
      enabled: true,
      speed: 800,
    },
  },
  labels: pieCategories.value.map((cat) => cat.name),
  colors: pieColors,
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '14px',
    fontFamily: 'inherit',
    labels: {
      colors: isDarkMode.value ? '#E5E7EB' : '#374151',
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#fff'],
    },
    dropShadow: {
      enabled: true,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '45%',
      },
      customScale: 0.9,
      expandOnClick: true,
      dataLabels: {
        offset: 30,
        minAngleToShowLabel: 10,
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (value) {
        return `$${(value * 1000).toLocaleString()} (${((value / totalPieValue.value) * 100000).toFixed(1)}%)`
      },
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}))

// Series filtradas según visibilidad
const filteredSeries = computed(() => {
  return series.value.filter((_, index) => visibleSeries.value[index])
})

// Colores para las series
const seriesColor = (index) => {
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']
  return colors[index % colors.length]
}

// Función para calcular total de una serie
const seriesTotal = (data) => {
  return data.reduce((a, b) => a + b, 0) * 1000
}

// Opciones del gráfico principal (no pie)
const chartOptions = computed(() => ({
  chart: {
    type: currentChartType.value,
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
  title: {
    text: `Análisis de Datos 2024 - ${currentChartTypeLabel.value}`,
    align: 'left',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: isDarkMode.value ? '#E5E7EB' : '#111827',
    },
  },
  xaxis: {
    categories: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    labels: {
      style: {
        colors: isDarkMode.value ? '#9CA3AF' : '#6B7280',
      },
    },
  },
  yaxis: {
    labels: {
      formatter: (value) => `$${value}K`,
      style: {
        colors: isDarkMode.value ? '#9CA3AF' : '#6B7280',
      },
    },
  },
  grid: {
    borderColor: isDarkMode.value ? '#374151' : '#E5E7EB',
    row: {
      colors: isDarkMode.value ? ['#1F2937', 'transparent'] : ['#F9FAFB', 'transparent'],
    },
  },
  legend: {
    show: showLegend.value,
    position: 'top',
    horizontalAlign: 'right',
    labels: {
      colors: isDarkMode.value ? '#E5E7EB' : '#374151',
    },
  },
  tooltip: {
    theme: isDarkMode.value ? 'dark' : 'light',
    y: {
      formatter: (value) => `$${value}K`,
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

// Funciones
const changeChartType = (type) => {
  currentChartType.value = type
  if (type === 'bar') {
    series.value = [
      {
        name: 'Ventas',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 95, 120],
      },
      {
        name: 'Gastos',
        type: 'line',
        data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
      },
      {
        name: 'Beneficios',
        type: 'area',
        data: [10, 15, 5, 15, 9, 15, 20, 36, 65, 45, 25, 45],
      },
    ]
  } else {
    series.value = [
      {
        name: 'Ventas',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 95, 120],
      },
      {
        name: 'Gastos',
        data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
      },
      {
        name: 'Beneficios',
        data: [10, 15, 5, 15, 9, 15, 20, 36, 65, 45, 25, 45],
      },
    ]
  }
  chartKey.value++ // Forzar re-render
}

const exportToCSV = () => {
  let csvContent = ''

  if (currentChartType.value === 'pie') {
    csvContent = 'Categoría,Valor,Porcentaje,Tendencia\n'
    pieCategories.value.forEach((cat, index) => {
      csvContent += `${cat.name},$${cat.value},${cat.percentage}%,${cat.trend}%\n`
    })
  } else {
    const headers = ['Mes', ...series.value.map((s) => s.name)]
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]

    csvContent = headers.join(',') + '\n'

    for (let i = 0; i < 12; i++) {
      const row = [months[i], ...series.value.map((s) => s.data[i])]
      csvContent += row.join(',') + '\n'
    }
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  const fileName = currentChartType.value === 'pie' ? 'datos_pie' : 'datos_series'
  link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`
  link.click()

  alert('Archivo CSV generado con éxito')
}

const exportToPNG = () => {
  alert('La exportación PNG requeriría la librería html2canvas instalada')
  // Implementación con html2canvas
}

const applyDateFilter = () => {
  alert(`Filtro aplicado del ${dateRange.value.start} al ${dateRange.value.end}`)
  lastUpdate.value = new Date().toLocaleString()
}

const resetFilters = () => {
  visibleSeries.value = [true, true, true]
  currentChartType.value = 'line'
  dateRange.value = {
    start: '2024-01-01',
    end: '2024-12-31',
  }
  showLegend.value = true
  highlightedMetric.value = null
  lastUpdate.value = new Date().toLocaleString()
  chartKey.value++
}

const toggleLegend = () => {
  showLegend.value = !showLegend.value
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Inicialización
onMounted(() => {
  console.log('Dashboard de gráficos cargado con soporte para Pie Chart')
})
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
