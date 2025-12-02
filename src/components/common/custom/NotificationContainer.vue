<template>
  <div class="fixed top-25 right-6 z-2 space-y-3">
    <transition-group name="fade" tag="div">
      <div v-for="n in notifications" :key="n.id">
        <Alert :variant="n.variant" :title="n.title" :message="n.message" :showLink="false" />
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'
import Alert from '@/components/ui/Alert.vue'

const store = useNotificationStore()
const { notifications } = storeToRefs(store)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
