<template>
  <button
    @click="goBack"
    class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
  >
    <BackIcon />
    Regresar
  </button>
</template>

<script setup lang="ts">
import BackIcon from '@/icons/BackIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
})

const goBack = () => {
  if (props.to) {
    router.push(props.to)
  } else {
    router.back()
  }
}
</script>
