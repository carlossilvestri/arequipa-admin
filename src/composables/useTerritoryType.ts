import type { BOTipoTerritorio } from '@/interfaces'
import { ref } from 'vue'
import { deleteTerritoryType, getTerritoryTypes } from '@/services/territoryType'
import { useTerritoryTypeStore } from '@/stores/territoryType'

export function useTerritoryType() {
  const territoryTypes = ref<BOTipoTerritorio[]>([])
  const loading = ref(true)
  const loadingDelete = ref(false)
  const territoryTypeStore = useTerritoryTypeStore()

  const loadTerritoryTypes = async () => {
    loading.value = true
    try {
      territoryTypes.value = await getTerritoryTypes({})
      territoryTypeStore.saveTerritoryTypesOnStore(territoryTypes.value)
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deleteTerritoryType({ id })
      // Refresh the list
      await loadTerritoryTypes()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    territoryTypes,
    loadTerritoryTypes,
    loading,
    loadingDelete,
    handleDelete,
  }
}
