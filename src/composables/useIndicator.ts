import type { BOIndicadorDto } from '@/interfaces'
import { ref } from 'vue'
import { deleteIndicator, getIndicators } from '@/services/indicator'
import { useIndicatorStore } from '@/stores/indicator'

export function useIndicator() {
  const indicators = ref<BOIndicadorDto[]>([])
  const loading = ref(true)
  const loadingDelete = ref(false)
  const indicatorStore = useIndicatorStore()

  const loadIndicators = async () => {
    loading.value = true
    try {
      indicators.value = await getIndicators({})
      indicatorStore.saveIndicatorsOnStore(indicators.value)
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deleteIndicator({ id })
      // Refresh the list
      await loadIndicators()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    indicators,
    loadIndicators,
    loading,
    loadingDelete,
    handleDelete,
  }
}
