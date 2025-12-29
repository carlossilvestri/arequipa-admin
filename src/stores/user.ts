import type { BOUsuario } from '@/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const users = ref<BOUsuario[]>([])
    const loggedUser = ref<BOUsuario | null>(null)

    return {
      users,
      loggedUser,
      saveUsersOnStore(newUsers: BOUsuario[]) {
        users.value = newUsers
      },
      saveLoggedUserOnStore(user: BOUsuario) {
        loggedUser.value = user
      },
      clearLoggedUser() {
        loggedUser.value = null
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
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
