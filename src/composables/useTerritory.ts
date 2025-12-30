import type { BOTerritorio } from '@/interfaces'
import { ref } from 'vue'
import { deleteTerritory, getTerritiries } from '@/services/territories'
import { useTerritoryStore } from '@/stores/territory'

export function useTerritory() {
  const territories = ref<BOTerritorio[]>([])
  const loading = ref(true)
  const loadingDelete = ref(false)
  const territoryStore = useTerritoryStore()

  const loadTerritories = async () => {
    loading.value = true
    try {
      territories.value = await getTerritiries({})
      territoryStore.saveTerritoriesOnStore(territories.value)
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deleteTerritory({ id })
      // Refresh the list
      await loadTerritories()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    territories,
    loadTerritories,
    loading,
    loadingDelete,
    handleDelete,
  }
}
