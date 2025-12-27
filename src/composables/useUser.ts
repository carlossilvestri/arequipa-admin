import type { BOUsuario } from '@/interfaces'
import { ref } from 'vue'
import { useAxios } from '@/composables/useAxios'

export function useUser() {
  const axios = useAxios()
  const users = ref<BOUsuario[]>([])
  const loadUsers = async () => {
    const { data } = await axios.get('/api/Usuario/LeerPorCriterio')
    users.value = data
  }

  return {
    users,
    loadUsers,
  }
}
