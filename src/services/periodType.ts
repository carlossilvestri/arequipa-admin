import { axiosInstance } from '@/plugins/axios'
import type {
  BOTipoPeriodo,
  BOResultadoLogicaNegocio,
  CreateBOTipoPeriodoRequest,
  DeleteByIdRequest,
  FilterBOTipoPeriodo,
  UpdateBOTipoPeriodoRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { usePeriodTypeStore } from '@/stores/periodType'

const notifications = useNotificationStore()
const periodTypeStore = usePeriodTypeStore()
const name = 'Tipo de período'

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get period types.
 * @Param filter: FilterBOTipoPeriodo. The object you want to filter.
 * @Return Promise<BOTipoPeriodo[]>
 */
export async function getPeriodTypes(filter: FilterBOTipoPeriodo): Promise<BOTipoPeriodo[]> {
  try {
    const { data } = await axiosInstance.get<BOTipoPeriodo[]>('/api/TipoPeriodo/LeerPorCriterio', {
      params: filter,
    })
    periodTypeStore.savePeriodTypesOnStore(data)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create period type.
 * @Param periodTypeData: CreateBOTipoPeriodoRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOTipoPeriodo>>
 */
export async function createPeriodType(
  periodTypeData: CreateBOTipoPeriodoRequest,
): Promise<BOResultadoLogicaNegocio<BOTipoPeriodo>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOTipoPeriodo>>(
      '/api/TipoPeriodo/Grabar',
      null,
      {
        params: periodTypeData,
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
 * Update period type.
 * @Param periodTypeData: UpdateBOTipoPeriodoRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOTipoPeriodo>>
 */
export async function updatePeriodType(
  periodTypeData: UpdateBOTipoPeriodoRequest,
): Promise<BOResultadoLogicaNegocio<BOTipoPeriodo>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOTipoPeriodo>>(
      '/api/TipoPeriodo/Editar',
      null,
      {
        params: periodTypeData,
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
 * Delete period type.
 * @Param deleteById: DeleteByIdRequest.
 * @Return Promise<BOResultadoLogicaNegocio<null>>
 */
export async function deletePeriodType(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/TipoPeriodo/Eliminar',
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
 * Get period type by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOTipoPeriodo>>
 */
export async function getPeriodTypeById(
  id: number,
): Promise<BOResultadoLogicaNegocio<BOTipoPeriodo>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOTipoPeriodo>>(
      `/api/TipoPeriodo/LeerPorId?id=${id}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getPeriodTypes,
  createPeriodType,
  updatePeriodType,
  deletePeriodType,
  getPeriodTypeById,
}
