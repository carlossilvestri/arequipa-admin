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
            <div>
              <p>Seleccionar indicadores</p>
            </div>
            <MultipleSelect
              v-model="form.selectedItems"
              :options="computedValues.indicatorOptions"
              class="w-full mb-6 mt-3"
            />
          </div>
          <div class="flex items-center justify-end">
            <Button>Generar gráfico</Button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <IndicatorCard
            v-for="indicator in displayIndicators"
            :key="indicator.idindicador"
            :indicador="indicator"
            @editar="handleEditar"
            @toggle-activo="handleToggleActivo"
            @ver-detalle="handleVerDetalle"
          />
        </div>
      </div>
      <div class="grid">
        <MultiChartDashboard />

        <div class="flex justify-end">
          <Button class-name="m-2 p-2">Exportar</Button>
          <Button variant="outline" class-name="m-2 p-2">Generar gráfico</Button>
        </div>
      </div>
    </section>

    <!-- Sección Descripción (contenido placeholder) -->
    <section
      id="opcion-2"
      class="scroll-mt-24 mx-auto max-w-(--breakpoint-2xl) px-4 md:px-6 py-12 md:py-16"
    >
      <h3 class="text-2xl font-semibold mb-4">Descripción</h3>
      <p class="text-gray-600 dark:text-gray-300">
        Contenido de ejemplo para la Descripción. Puedes colocar aquí tarjetas, métricas o cualquier
        componente adicional.
      </p>
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

const form = ref({
  selectedItems: [],
})

const year = ref(classicFormatDate(new Date(), 'YYYY'))

onMounted(async () => {
  indicators.value = await getIndicators({})
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
</script>

<style>
/* Suaviza el scroll a las anclas del “sidebar” superior */
html {
  scroll-behavior: smooth;
}
</style>
