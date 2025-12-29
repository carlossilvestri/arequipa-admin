import type { BOGrupo } from '@/interfaces'
import { ref } from 'vue'
import { deleteGroup, getGroups } from '@/services/group'
import { useGroupStore } from '@/stores/group'

export function useGroup() {
  const groups = ref<BOGrupo[]>([])
  const loading = ref(true)
  const loadingDelete = ref(false)
  const groupStore = useGroupStore()

  const loadGroups = async () => {
    loading.value = true
    try {
      groups.value = await getGroups({})
      groupStore.saveGroupsOnStore(groups.value)
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deleteGroup({ id })
      // Refresh the list
      await loadGroups()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    groups,
    loadGroups,
    loading,
    loadingDelete,
    handleDelete,
  }
}
