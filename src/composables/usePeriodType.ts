import type { BOTipoPeriodo } from '@/interfaces'
import { ref } from 'vue'
import { deletePeriodType, getPeriodTypes } from '@/services/periodType'
import { usePeriodTypeStore } from '@/stores/periodType'

export function usePeriodType() {
  const periodTypes = ref<BOTipoPeriodo[]>([])
  const loading = ref(true)
  const loadingDelete = ref(false)
  const periodTypeStore = usePeriodTypeStore()

  const loadPeriodTypes = async () => {
    loading.value = true
    try {
      periodTypes.value = await getPeriodTypes({})
      periodTypeStore.savePeriodTypesOnStore(periodTypes.value)
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deletePeriodType({ id })
      // Refresh the list
      await loadPeriodTypes()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    periodTypes,
    loadPeriodTypes,
    loading,
    loadingDelete,
    handleDelete,
  }
}
