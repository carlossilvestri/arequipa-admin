import type { BOTerritorio } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useTerritoryStore = defineStore(
  'territory',
  () => {
    const territories = ref<BOTerritorio[]>([])

    return {
      territories,
      saveTerritoriesOnStore(newTerritories: BOTerritorio[]) {
        territories.value = newTerritories
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
  import.meta.hot.accept(acceptHMRUpdate(useTerritoryStore, import.meta.hot))
}
