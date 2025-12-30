import type { BOPeriodo } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const usePeriodStore = defineStore(
  'period',
  () => {
    const periods = ref<BOPeriodo[]>([])

    return {
      periods,
      savePeriodsOnStore(newPeriods: BOPeriodo[]) {
        periods.value = newPeriods
      },
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePeriodStore, import.meta.hot))
}
