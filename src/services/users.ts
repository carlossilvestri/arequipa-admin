import { axiosInstance } from '@/plugins/axios'
import type { BOUsuario } from '@/interfaces'

// Obtiene la lista de usuarios
export async function getUsers(): Promise<BOUsuario[]> {
  const { data } = await axiosInstance.get<BOUsuario[]>('/api/Usuario/LeerPorCriterio')
  return data
}

export default {
  getUsers,
}
