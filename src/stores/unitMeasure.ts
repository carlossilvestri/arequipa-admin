import type { BOUnidadMedida } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useUnitMeasureStore = defineStore(
  'unitMeasure',
  () => {
    const unitMeasures = ref<BOUnidadMedida[]>([])

    return {
      unitMeasures,
      saveUnitMeasuresOnStore(newUnitMeasures: BOUnidadMedida[]) {
        unitMeasures.value = newUnitMeasures
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
  import.meta.hot.accept(acceptHMRUpdate(useUnitMeasureStore, import.meta.hot))
}
