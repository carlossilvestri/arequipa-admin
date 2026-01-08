import { axiosInstance } from '@/plugins/axios'
import type {
  BOIndicador,
  BOIndicadorDto,
  BOResultadoLogicaNegocio,
  CreateBOIndicadorRequest,
  DeleteByIdRequest,
  FilterBOIndicador,
  UpdateBOIndicadorRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { useIndicatorStore } from '@/stores/indicator'

const notifications = useNotificationStore()
const indicatorStore = useIndicatorStore()
const name = 'Indicador'

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get indicators.
 * @Param filter: FilterBOIndicador. The object you want to filter.
 * @Return Promise<BOIndicador[]>
 */
export async function getIndicators(filter: FilterBOIndicador): Promise<BOIndicadorDto[]> {
  try {
    const { data } = await axiosInstance.get<BOIndicadorDto[]>('/api/Indicador/LeerPorCriterio', {
      params: filter,
    })
    indicatorStore.saveIndicatorsOnStore(data)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create group.
 * @Param groupData: CreateBOIndicadorRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOIndicador>>
 */
export async function createIndicator(
  groupData: CreateBOIndicadorRequest,
): Promise<BOResultadoLogicaNegocio<BOIndicador>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOIndicador>>(
      '/api/Indicador/Grabar',
      null,
      {
        params: groupData,
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
 * Update group.
 * @Param groupData: UpdateBOIndicadorRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOIndicador>>
 */
export async function updateIndicator(
  groupData: UpdateBOIndicadorRequest,
): Promise<BOResultadoLogicaNegocio<BOIndicador>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOIndicador>>(
      '/api/Indicador/Editar',
      null,
      {
        params: groupData,
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
 * Delete group.
 * @Param deleteById: DeleteByIdRequest.
 * @Return Promise<BOResultadoLogicaNegocio<null>>
 */
export async function deleteIndicator(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/Indicador/Eliminar',
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
 * Get indicator by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOIndicador>>
 */
export async function getIndicatorById(id: number): Promise<BOResultadoLogicaNegocio<BOIndicador>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOIndicador>>(
      `/api/Indicador/LeerPorId?id=${id}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getIndicators,
  createIndicator,
  updateIndicator,
  deleteIndicator,
  getIndicatorById,
}
