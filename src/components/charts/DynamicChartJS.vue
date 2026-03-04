<template>
  <div class="chart-container">
    <h3>Ejecución Presupuestal - Proyectos</h3>
    <LineChart
      v-if="chartData"
      :data="chartData"
      :options="chartOptions"
      :width="800"
      :height="400"
    />
    <p v-else>Cargando datos...</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler,
} from 'chart.js'
// types.ts
export interface Valor {
  idperiodo: number
  nombreperiodo: string // Ej: "Trimestre 1 2020"
  valor: number
}

export interface Serie {
  idindicador: number
  nombreindicador: string
  unidadmedida: string
  simbolounidadmedida: string
  tipografica: string // 'line' en este caso
  valores: Valor[]
}

export interface ObjetoData {
  idtipoperiodo: number
  idtipoterritorio: number
  series: Serie[]
}

export interface ApiResponse {
  objeto: ObjetoData
  exito: boolean
  listaErrores: any[]
  errores: string
  listaMensajes: string[]
  mensajes: string
}

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler,
)

// Props
const props = defineProps<{
  response: ApiResponse
}>()

// Función para extraer todas las etiquetas de período ordenadas
const getAllPeriods = (series: Serie[]): string[] => {
  const periodSet = new Set<string>()
  series.forEach((serie) => {
    serie.valores.forEach((v) => periodSet.add(v.nombreperiodo))
  })
  // Ordenar cronológicamente (asumiendo formato "Trimestre N AAAA")
  return Array.from(periodSet).sort((a, b) => {
    const aMatch = a.match(/Trimestre (\d) (\d{4})/)
    const bMatch = b.match(/Trimestre (\d) (\d{4})/)
    if (!aMatch || !bMatch) return 0
    const aYear = parseInt(aMatch[2])
    const bYear = parseInt(bMatch[2])
    if (aYear !== bYear) return aYear - bYear
    return parseInt(aMatch[1]) - parseInt(bMatch[1])
  })
}

// Construir los datasets a partir de las series
const chartData = computed(() => {
  const series = props.response.objeto.series
  const periods = getAllPeriods(series)

  // Determinar colores para cada serie
  const colors = ['#42A5F5', '#FFA726'] // Azul para soles, naranja para porcentaje

  const datasets = series.map((serie, index) => {
    // Mapear valores a cada período (rellenar con null si no hay dato)
    const data = periods.map((period) => {
      const valorObj = serie.valores.find((v) => v.nombreperiodo === period)
      return valorObj ? valorObj.valor : null
    })

    // Definir eje Y según la unidad
    const yAxisID = serie.unidadmedida.includes('Soles') ? 'y-soles' : 'y-porcentaje'

    return {
      label: serie.nombreindicador,
      data,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length] + '20', // con transparencia
      tension: 0.2,
      pointRadius: 4,
      yAxisID,
    }
  })

  return {
    labels: periods,
    datasets,
  }
})

// Opciones del gráfico con dos ejes Y
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
    tooltip: { mode: 'index' as const, intersect: false },
  },
  scales: {
    x: { title: { display: true, text: 'Trimestre' } },
    'y-soles': {
      type: 'linear' as const,
      position: 'left' as const,
      title: { display: true, text: 'Soles (S/.)' },
      ticks: {
        callback: (tickValue: string | number) => `S/ ${Number(tickValue).toLocaleString('es-PE')}`,
      },
    },
    'y-porcentaje': {
      type: 'linear' as const,
      position: 'right' as const,
      title: { display: true, text: 'Porcentaje (%)' },
      grid: { drawOnChartArea: false }, // evitar que las líneas se sobrepongan
      ticks: {
        callback: (tickValue: string | number) => `${Number(tickValue)}%`,
      },
    },
  },
}))
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
