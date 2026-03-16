<template>
  <footer class="bg-blue-900 text-white py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="text-blue-200 text-sm">
          © {{ year }} IPE Arequipa - Instituto de Economía de Arequipa. Todos los derechos
          reservados.
        </p>
        <p class="text-blue-300 text-xs mt-2">
          Tu región en tus manos - Plataforma de datos públicos de Arequipa
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { classicFormatDate } from '@/utilities'
const year = ref(classicFormatDate(new Date(), 'YYYY'))
</script>
