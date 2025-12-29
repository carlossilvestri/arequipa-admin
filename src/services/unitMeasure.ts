import { axiosInstance } from '@/plugins/axios'
import type {
  BOResultadoLogicaNegocio,
  BOUnidadMedida,
  CreateUserRequest,
  DeleteByIdRequest,
  FilterBOUnidadMedida,
  LoginRequest,
  UpdateUserRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { useUnitMeasureStore } from '@/stores/unitMeasure'

const notifications = useNotificationStore()
const unitMeasureStore = useUnitMeasureStore()
const name = 'Unidad de medida'

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get unit measures.
 * @Param filter: FilterBOUnidadMedida. The object you want to filter.
 * @Return Promise<BOUnidadMedida[]>
 */
export async function getUnitMeasures(filter: FilterBOUnidadMedida): Promise<BOUnidadMedida[]> {
  try {
    const { data } = await axiosInstance.get<BOUnidadMedida[]>(
      '/api/UnidadMedida/LeerPorCriterio',
      {
        params: filter,
      },
    )
    unitMeasureStore.saveUnitMeasuresOnStore(data)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create unit measure.
 * @Param userData: CreateUserRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOUnidadMedida>>
 */
export async function createUnitMeasure(
  userData: CreateUserRequest,
): Promise<BOResultadoLogicaNegocio<BOUnidadMedida>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOUnidadMedida>>(
      '/api/UnidadMedida/Grabar',
      null,
      {
        params: userData,
      },
    )
    if (data?.exito) {
      notifications.success(`${name} fue creado con éxito.`)
    } else {
      const errorMsg = data.errores || `Error al crear el ${name}`
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
 * @Return Promise<BOResultadoLogicaNegocio<BOUnidadMedida>>
 */
export async function updateUser(
  userData: UpdateUserRequest,
): Promise<BOResultadoLogicaNegocio<BOUnidadMedida>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOUnidadMedida>>(
      '/api/UnidadMedida/Editar',
      null,
      {
        params: userData,
      },
    )
    if (data?.exito) {
      notifications.success(`${name} fue actualizado con éxito.`)
    } else {
      const errorMsg = data.errores || `Error al actualizar el ${name}`
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
export async function deleteUnitMeasure(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/UnidadMedida/Eliminar',
      null,
      {
        params: deleteById,
      },
    )
    if (data?.exito) {
      notifications.success(`${name} fue eliminado con éxito.`)
    } else {
      const errorMsg = data.errores || `Error al eliminar el ${name}`
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
 * Get user by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOUnidadMedida>>
 */
export async function getUnitMeasureById(
  id: number,
): Promise<BOResultadoLogicaNegocio<BOUnidadMedida>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOUnidadMedida>>(
      `/api/UnidadMedida/LeerPorId?id=${id}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getUnitMeasures,
  createUnitMeasure,
  updateUser,
  deleteUnitMeasure,
  getUnitMeasureById,
}
