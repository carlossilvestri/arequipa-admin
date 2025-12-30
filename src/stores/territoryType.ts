import type { BOTipoTerritorio } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useTerritoryTypeStore = defineStore(
  'territoryType',
  () => {
    const territoryTypes = ref<BOTipoTerritorio[]>([])

    return {
      territoryTypes,
      saveTerritoryTypesOnStore(newTerritoryTypes: BOTipoTerritorio[]) {
        territoryTypes.value = newTerritoryTypes
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
  import.meta.hot.accept(acceptHMRUpdate(useTerritoryTypeStore, import.meta.hot))
}
