<template>
  <div class="min-h-screen">
    <main>
      <slot></slot>
    </main>
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import NotificationContainer from '@/components/common/custom/NotificationContainer.vue'
</script>
