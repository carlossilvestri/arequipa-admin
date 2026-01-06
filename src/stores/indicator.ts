import type { BOIndicador } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useIndicatorStore = defineStore(
  'indicator',
  () => {
    const indicators = ref<BOIndicador[]>([])

    return {
      indicators,
      saveIndicatorsOnStore(newIndicators: BOIndicador[]) {
        indicators.value = newIndicators
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
  import.meta.hot.accept(acceptHMRUpdate(useIndicatorStore, import.meta.hot))
}
