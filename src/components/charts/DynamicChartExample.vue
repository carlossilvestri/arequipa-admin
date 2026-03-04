<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Ejemplo de DynamicChart</h1>

      <!-- Controles de datos -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Controles de Datos</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Cargar datos de ejemplo
            </label>
            <button
              @click="loadSampleData"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Cargar Datos JSON
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Estado </label>
            <div class="flex items-center space-x-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  loading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800',
                ]"
              >
                {{ loading ? 'Cargando...' : 'Datos listos' }}
              </span>
              <span v-if="chartData" class="text-sm text-gray-500">
                {{ chartData.objeto.series.length }} series encontradas
              </span>
            </div>
          </div>
        </div>

        <!-- Vista previa del JSON -->
        <div v-if="chartData" class="mt-4">
          <details class="cursor-pointer">
            <summary class="text-sm font-medium text-gray-700 hover:text-gray-900">
              Ver JSON completo
            </summary>
            <pre class="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-auto max-h-64">{{
              JSON.stringify(chartData, null, 2)
            }}</pre>
          </details>
        </div>
      </div>

      <!-- Gráfico dinámico -->
      <DynamicChart v-if="chartData" :chart-data="chartData" :loading="loading" />

      <!-- Mensaje cuando no hay datos -->
      <div v-else class="bg-white rounded-xl shadow-sm p-12 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Sin datos</h3>
        <p class="text-gray-500 mb-4">
          Haz clic en "Cargar Datos JSON" para ver el gráfico en acción
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DynamicChart from './DynamicChart.vue'
import type { ChartData } from './DynamicChart.vue'

// Estado
const loading = ref(false)
const chartData = ref<ChartData | null>(null)

// Datos de ejemplo basados en tu JSON
const sampleData: ChartData = {
  objeto: {
    idtipoperiodo: 3,
    idtipoterritorio: 1,
    series: [
      {
        idindicador: 15,
        nombreindicador: 'Ejecución presupuestal total en Soles (Sólo Proyectos)',
        unidadmedida: 'Soles Peruanos Corrientes (S/.)',
        simbolounidadmedida: 'S/. corrientes',
        tipografica: 'line',
        valores: [
          {
            idperiodo: 191,
            nombreperiodo: 'Trimestre 1 2020',
            valor: 4458248865.0,
          },
          {
            idperiodo: 192,
            nombreperiodo: 'Trimestre 2 2020',
            valor: 2403560449.0,
          },
          {
            idperiodo: 193,
            nombreperiodo: 'Trimestre 3 2020',
            valor: 6219605027.0,
          },
          {
            idperiodo: 194,
            nombreperiodo: 'Trimestre 4 2020',
            valor: 15162546531.0,
          },
          {
            idperiodo: 195,
            nombreperiodo: 'Trimestre 1 2021',
            valor: 6931907466.0,
          },
        ],
      },
      {
        idindicador: 16,
        nombreindicador: 'Ejecución presupuestal total en Porcentaje - (Sólo Proyectos)',
        unidadmedida: 'Porcentaje del total (%)',
        simbolounidadmedida: '% del total',
        tipografica: 'bar',
        valores: [
          {
            idperiodo: 192,
            nombreperiodo: 'Trimestre 2 2020',
            valor: 5.25,
          },
          {
            idperiodo: 193,
            nombreperiodo: 'Trimestre 3 2020',
            valor: 13.6,
          },
          {
            idperiodo: 194,
            nombreperiodo: 'Trimestre 4 2020',
            valor: 33.15,
          },
          {
            idperiodo: 195,
            nombreperiodo: 'Trimestre 1 2021',
            valor: 12.36,
          },
          {
            idperiodo: 196,
            nombreperiodo: 'Trimestre 2 2021',
            valor: 15.91,
          },
          {
            idperiodo: 197,
            nombreperiodo: 'Trimestre 3 2021',
            valor: 16.63,
          },
          {
            idperiodo: 198,
            nombreperiodo: 'Trimestre 4 2021',
            valor: 24.21,
          },
          {
            idperiodo: 199,
            nombreperiodo: 'Trimestre 1 2022',
            valor: 9.32,
          },
        ],
      },
    ],
  },
  exito: true,
  listaErrores: [],
  errores: '',
  listaMensajes: ['La gráfica fue generada correctamente.'],
  mensajes: 'La grafica fue generada correctamente.\n',
}

// Función para cargar datos de ejemplo
const loadSampleData = async () => {
  loading.value = true

  // Simular carga asíncrona
  await new Promise((resolve) => setTimeout(resolve, 1000))

  chartData.value = sampleData
  loading.value = false
}
</script>

<style scoped>
details summary {
  outline: none;
}

details summary::-webkit-details-marker {
  display: none;
}

details summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
}

details[open] summary::before {
  transform: rotate(90deg);
}
</style>
