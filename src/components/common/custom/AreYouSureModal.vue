<template>
  <div v-if="props.showConfirm" class="fixed inset-0 z-100000 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40"></div>
    <div
      class="relative w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <h3 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">Confirmar</h3>
      <p class="mb-5 text-sm text-gray-600 dark:text-white/70">
        ¿Estás seguro de que deseas eliminar el registro?
      </p>
      <div class="flex justify-end gap-3">
        <button
          class="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-white/80 dark:hover:bg-white/5"
          @click="confirmNo"
        >
          No
        </button>
        <button
          class="inline-flex items-center rounded-lg bg-error-600 px-4 py-2 text-sm text-white hover:bg-error-700"
          @click="confirmYes"
        >
          Sí
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showConfirm: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirmNo', 'confirmYes'])

const confirmNo = () => {
  emit('confirmNo')
}

const confirmYes = () => {
  emit('confirmYes')
}
</script>
