<template>
  <span
    class="inline-flex items-center rounded-md bg-blue-400/10 px-4 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30 max-h-10"
    >{{ props.number }}</span
  >
</template>

<script setup lang="ts">
interface NumberBadgeProps {
  number: number
}

const props = defineProps<NumberBadgeProps>()
</script>

<style lang="scss" scoped></style>
