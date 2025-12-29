import { axiosInstance } from '@/plugins/axios'
import type {
  BOResultadoLogicaNegocio,
  BOUsuario,
  CreateUserRequest,
  DeleteByIdRequest,
  FilterBOUsuario,
  LoginRequest,
  UpdateUserRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

const notifications = useNotificationStore()
const userStore = useUserStore()

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get users.
 * @Param filter: FilterBOUsuario. The object you want to filter.
 * @Return Promise<BOUsuario[]>
 */
export async function getUsers(filter: FilterBOUsuario): Promise<BOUsuario[]> {
  try {
    const { data } = await axiosInstance.get<BOUsuario[]>('/api/Usuario/LeerPorCriterio', {
      params: filter,
    })
    userStore.saveUsersOnStore(data)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create user.
 * @Param userData: CreateUserRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOUsuario>>
 */
export async function createUser(
  userData: CreateUserRequest,
): Promise<BOResultadoLogicaNegocio<BOUsuario>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOUsuario>>(
      '/api/Usuario/Grabar',
      null,
      {
        params: userData,
      },
    )
    if (data?.exito) {
      notifications.success('El usuario fue creado con éxito.')
    } else {
      const errorMsg = data.errores || 'Error al crear el usuario'
      notifications.error(errorMsg)
    }
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Update user.
 * @Param userData: UpdateUserRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOUsuario>>
 */
export async function updateUser(
  userData: UpdateUserRequest,
): Promise<BOResultadoLogicaNegocio<BOUsuario>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOUsuario>>(
      '/api/Usuario/Editar',
      null,
      {
        params: userData,
      },
    )
    if (data?.exito) {
      notifications.success('El usuario fue actualizado con éxito.')
    } else {
      const errorMsg = data.errores || 'Error al actualizar el usuario'
      notifications.error(errorMsg)
    }

    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Delete user.
 * @Param deleteById: DeleteByIdRequest.
 * @Return Promise<BOResultadoLogicaNegocio<null>>
 */
export async function deleteUser(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/Usuario/Eliminar',
      null,
      {
        params: deleteById,
      },
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Get user by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOUsuario>>
 */
export async function getUserById(id: number): Promise<BOResultadoLogicaNegocio<BOUsuario>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOUsuario>>(
      `/api/Usuario/LeerPorId?id=${id}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Login.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOUsuario>>
 */
export async function login(loginData: LoginRequest): Promise<BOResultadoLogicaNegocio<BOUsuario>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOUsuario>>(
      '/api/Usuario/Login',
      {
        params: loginData,
      },
    )

    userStore.saveLoggedUserOnStore(data.objeto)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
}
