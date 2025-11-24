<template>
  <p class="mt-1.5 text-theme-xs text-error-500">{{ message }}</p>
</template>
<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>
