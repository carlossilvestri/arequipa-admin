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
      if (response?.exito) {
        // Show success notification
        notifications.success('Usuario eliminado correctamente')
      } else {
        const errorMsg: string = response.errores || 'Error al eliminar el usuario'
        notifications.error(errorMsg)
      }
      // Refresh the user list after deletion
      await loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
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
