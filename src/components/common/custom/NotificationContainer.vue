<template>
  <div class="fixed top-25 right-6 z-100">
    <transition-group name="fade" tag="div" class="flex flex-col items-end">
      <div
        v-for="n in notifications"
        :key="n.id"
        :class="{ 'mt-3': notifications.indexOf(n) > 0 }"
        class="w-fit"
      >
        <Alert
          :variant="n.variant"
          :title="n.title!"
          :message="n.message"
          :showLink="false"
          :showClose="true"
          @close="store.remove(n.id)"
        />
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
