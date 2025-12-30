import type { BOSubGrupo } from '@/interfaces'
import { ref } from 'vue'
import { deleteSubGroup, getSubgroups } from '@/services/subgroup'
import { useSubGroupStore } from '@/stores/subgroup'

export function useSubGroup() {
  const subgroups = ref<BOSubGrupo[]>([])
  const loading = ref(true)
  const loadingDelete = ref(false)
  const subgroupstore = useSubGroupStore()

  const loadSubgroups = async () => {
    loading.value = true
    try {
      subgroups.value = await getSubgroups({})
      subgroupstore.saveSubGroupsOnStore(subgroups.value)
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deleteSubGroup({ id })
      // Refresh the list
      await loadSubgroups()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    subgroups,
    loadSubgroups,
    loading,
    loadingDelete,
    handleDelete,
  }
}
