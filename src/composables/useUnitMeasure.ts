import type { BOUnidadMedida } from '@/interfaces'
import { ref } from 'vue'
import { deleteUnitMeasure, getUnitMeasures } from '@/services/unitMeasure'
import { useUnitMeasureStore } from '@/stores/unitMeasure'

export function useUnitMeasure() {
  const unitMeasures = ref<BOUnidadMedida[]>([])
  const loading = ref(true)
  const loadingDelete = ref(false)
  const unitMeasureStore = useUnitMeasureStore()

  const loadUnitMeasures = async () => {
    loading.value = true
    try {
      unitMeasures.value = await getUnitMeasures({})
      unitMeasureStore.saveUnitMeasuresOnStore(unitMeasures.value)
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deleteUnitMeasure({ id })
      // Refresh the unit measures list after deletion
      await loadUnitMeasures()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    unitMeasures,
    loadUnitMeasures,
    loading,
    loadingDelete,
    handleDelete,
  }
}
