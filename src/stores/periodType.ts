import type { BOTipoPeriodo } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const usePeriodTypeStore = defineStore(
  'periodType',
  () => {
    const periodTypes = ref<BOTipoPeriodo[]>([])

    return {
      periodTypes,
      savePeriodTypesOnStore(newPeriodTypes: BOTipoPeriodo[]) {
        periodTypes.value = newPeriodTypes
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
  import.meta.hot.accept(acceptHMRUpdate(usePeriodTypeStore, import.meta.hot))
}
