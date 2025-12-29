import type { BOGrupo } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useGroupStore = defineStore(
  'group',
  () => {
    const groups = ref<BOGrupo[]>([])

    return {
      groups,
      saveGroupsOnStore(newGroups: BOGrupo[]) {
        groups.value = newGroups
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
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
}
