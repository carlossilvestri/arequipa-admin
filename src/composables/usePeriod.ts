import type { BOPeriodo } from '@/interfaces'
import { ref } from 'vue'
import { deletePeriod, getPeriods } from '@/services/period'
import { usePeriodStore } from '@/stores/period'

export function usePeriod() {
  const periods = ref<BOPeriodo[]>([])
  const loading = ref(true)
  const loadingDelete = ref(false)
  const periodStore = usePeriodStore()

  const loadPeriods = async () => {
    loading.value = true
    try {
      periods.value = await getPeriods({})
      periodStore.savePeriodsOnStore(periods.value)
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deletePeriod({ id })
      // Refresh the list
      await loadPeriods()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    periods,
    loadPeriods,
    loading,
    loadingDelete,
    handleDelete,
  }
}
