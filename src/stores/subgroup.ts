import type { BOSubGrupo } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useSubGroupStore = defineStore(
  'subgroup',
  () => {
    const subgroups = ref<BOSubGrupo[]>([])

    return {
      subgroups,
      saveSubGroupsOnStore(newGroups: BOSubGrupo[]) {
        subgroups.value = newGroups
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
  import.meta.hot.accept(acceptHMRUpdate(useSubGroupStore, import.meta.hot))
}
