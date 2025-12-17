<template>
  <div class="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
    <!-- Top Sidebar (sticky) -->
    <header
      class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 dark:bg-gray-900/70 dark:border-gray-800"
    >
      <nav
        class="mx-auto max-w-(--breakpoint-2xl) px-4 md:px-6 py-3 flex items-center justify-between"
      >
        <img
          class="dark:hidden"
          src="@/assets/img/logos/logo-ipe-arequipa.png"
          alt="Logo"
          width="150"
          height="40"
        />
        <ul class="flex items-center gap-3">
          <li>
            <a
              href="#opcion-1"
              class="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              Estadísticas
            </a>
          </li>
          <li>
            <a
              href="#opcion-2"
              class="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              Descripción
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Hero -->
    <section
      class="relative min-h-[60vh] flex items-center"
      :style="{
        'background-image': `url(${banner})`,
        'background-size': 'cover',
        'background-position': 'center',
      }"
    >
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative mx-auto max-w-(--breakpoint-2xl) px-4 md:px-6 py-16 text-white">
        <h2 class="text-3xl md:text-5xl font-bold">Tu región en tus manos</h2>
        <p class="mt-5 max-w-3xl leading-7 md:leading-8 text-white/90">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Praesent mauris.
        </p>
      </div>
    </section>

    <!-- Sección Opción 1 (con gráfico) -->
    <section
      id="opcion-1"
      class="scroll-mt-24 mx-auto max-w-(--breakpoint-2xl) px-4 md:px-6 py-12 md:py-16"
    >
      <h3 class="text-2xl font-semibold mb-6">Estadísticas</h3>
      <div class="m-3">
        <div>
          <p>Seleccionar indicadores</p>
        </div>
        <MultipleSelect v-model="form.selectedItems" :options="options" class="w-full" />
      </div>
      <div class="grid">
        <MonthlySale />

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
      © {{ new Date().getFullYear() }} IPE Arequipa
    </footer>
  </div>
</template>

<script setup lang="ts">
// Reutilizamos el componente existente
import MonthlySale from '@/components/ecommerce/MonthlySale.vue'
import MultipleSelect from '@/components/forms/FormElements/MultipleSelect.vue'
import { ref } from 'vue'
import banner from '@/assets/img/banners/banner-01.jpg'
import Button from '@/components/ui/Button.vue'
const options = [
  { value: 'apple', label: 'Indice de ejecución presupuestal' },
  { value: 'banana', label: 'Indicador 2' },
  { value: 'cherry', label: 'Indicador 3' },
  { value: 'date', label: 'Indicador 4' },
  { value: 'elderberry', label: 'Indicador. 5' },
  { value: 'graphs', label: 'Indicador 6' },
]

const form = ref({
  selectedItems: [],
})
</script>

<style>
/* Suaviza el scroll a las anclas del “sidebar” superior */
html {
  scroll-behavior: smooth;
}
</style>
