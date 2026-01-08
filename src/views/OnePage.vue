<template>
  <div class="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
    <!-- Top Sidebar (sticky) -->
    <HeaderOnePage />

    <!-- Sección Opción 1 (con gráfico) -->
    <section
      id="opcion-1"
      class="scroll-mt-24 mx-auto max-w-(--breakpoint-2xl) px-4 md:px-6 py-12 md:py-16"
    >
      <h3 class="text-2xl font-semibold mb-6">Indicadores</h3>
      <div class="m-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="flex">
              <span
                class="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30"
                >1</span
              >
              <p class="pl-2 font-bold">Selecciona uno o más indicadores</p>
            </div>
            <MultipleSelect
              v-model="form.selectedItems"
              :options="computedValues.indicatorOptions"
              class="w-full mb-6 mt-3"
              :key="`multiselect-key-${form.selectedItems.length}`"
            />
            <p class="text-gray-900/50 text-[14px] italic mt-3 mb-5 ml-2 dark:text-gray-100/50">
              Selecciona uno o más indicadores para analizarlos individualmente o compararlos en una
              sola gráfica
            </p>
          </div>
        </div>

        <div v-if="form.selectedItems.length > 0">
          <div class="flex mb-3">
            <span
              class="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30"
              >2</span
            >
            <p class="pl-2 font-bold">Configura los indicadores seleccionados</p>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <IndicatorCard
              v-for="indicator in displayIndicators"
              :key="indicator.idindicador"
              :indicador="indicator"
              @editar="handleEditar"
              @toggle-activo="handleToggleActivo"
              @ver-detalle="handleVerDetalle"
              @deseleccionar="handleDeseleccionar"
            />
          </div>
        </div>

        <div v-if="form.selectedItems.length > 0">
          <div class="flex my-4">
            <span
              class="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30"
              >3</span
            >
            <p class="pl-2 font-bold">Genera el gráfico</p>
          </div>
          <div class="flex items-center justify-start">
            <Button>Generar gráfico</Button>
          </div>
        </div>
      </div>
      <div class="grid">
        <MultiChartDashboard />
      </div>
    </section>

    <!-- Footer simple -->
    <footer
      class="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      © {{ year }} IPE Arequipa
    </footer>
  </div>
</template>

<script setup lang="ts">
// Reutilizamos el componente existente
import MultiChartDashboard from '@/components/charts/MultiChartDashboard.vue'
import MultipleSelect from '@/components/forms/FormElements/MultipleSelect.vue'
import { ref, onMounted, computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import HeaderOnePage from '@/components/common/custom/HeaderOnePage.vue'
import { classicFormatDate } from '@/utilities'
import type { BOIndicadorDto } from '@/interfaces'
import { getIndicators } from '@/services/indicator'
import IndicatorCard from '@/components/common/custom/IndicatorCard.vue'

const indicators = ref<BOIndicadorDto[]>([])

const form = ref<{ selectedItems: { value: string; label: string }[] }>({
  selectedItems: [],
})

const year = ref(classicFormatDate(new Date(), 'YYYY'))

onMounted(async () => {
  indicators.value = await getIndicators({ ACTIVO: true })
})

const computedValues = computed(() => ({
  indicatorOptions: indicators.value.map((i) => ({
    value: String(i.idindicador),
    label: i.nombreindicador,
  })),
}))

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
}
</script>

<style>
/* Suaviza el scroll a las anclas del “sidebar” superior */
html {
  scroll-behavior: smooth;
}
</style>
