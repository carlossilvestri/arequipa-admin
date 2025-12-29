import type { BOUsuario } from '@/interfaces'
import { ref } from 'vue'
import { deleteUser, getUsers } from '@/services/users'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

export function useUser() {
  const users = ref<BOUsuario[]>([])
  const loadingUsers = ref(true)
  const loadingDelete = ref(false)
  const userStore = useUserStore()
  const notifications = useNotificationStore()

  const loadUsers = async () => {
    loadingUsers.value = true
    try {
      users.value = await getUsers({})
      userStore.saveUsersOnStore(users.value)
    } finally {
      loadingUsers.value = false
    }
  }

  const handleDelete = async (id: number) => {
    loadingDelete.value = true
    try {
      const response = await deleteUser({ id })
      // Refresh the user list after deletion
      await loadUsers()
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loadingDelete.value = false
    }
  }

  return {
    users,
    loadUsers,
    loadingUsers,
    loadingDelete,
    handleDelete,
  }
}
