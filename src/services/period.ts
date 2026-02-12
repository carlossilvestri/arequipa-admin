import { axiosInstance } from '@/plugins/axios'
import type {
  BOPeriodo,
  BOResultadoLogicaNegocio,
  CreateBOPeriodoRequest,
  DeleteByIdRequest,
  FilterBOPeriodo,
  UpdateBOPeriodoRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { usePeriodStore } from '@/stores/period'
import { classicFormatDate } from '@/utilities'

const notifications = useNotificationStore()
const periodStore = usePeriodStore()
const name = 'Período'

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get periods.
 * @Param filter: FilterBOPeriodo. The object you want to filter.
 * @Return Promise<BOPeriodo[]>
 */
export async function getPeriods(filter: FilterBOPeriodo): Promise<BOPeriodo[]> {
  try {
    const { data } = await axiosInstance.get<BOPeriodo[]>('/api/Periodo/LeerPorCriterio', {
      params: filter,
    })
    const mapData = data.map((period) => ({
      ...period,
      fechainicio: classicFormatDate(period.fechainicio),
      fechafin: classicFormatDate(period.fechafin),
    }))
    periodStore.savePeriodsOnStore(mapData)
    return mapData
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create period.
 * @Param periodData: CreateBOPeriodoRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOPeriodo>>
 */
export async function createPeriod(
  periodData: CreateBOPeriodoRequest,
): Promise<BOResultadoLogicaNegocio<BOPeriodo>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOPeriodo>>(
      '/api/Periodo/Grabar',
      null,
      {
        params: periodData,
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
 * Update period.
 * @Param periodData: UpdateBOPeriodoRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOPeriodo>>
 */
export async function updatePeriod(
  periodData: UpdateBOPeriodoRequest,
): Promise<BOResultadoLogicaNegocio<BOPeriodo>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOPeriodo>>(
      '/api/Periodo/Editar',
      null,
      {
        params: periodData,
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
 * Delete period.
 * @Param deleteById: DeleteByIdRequest.
 * @Return Promise<BOResultadoLogicaNegocio<null>>
 */
export async function deletePeriod(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/Periodo/Eliminar',
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
 * Get period by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOPeriodo>>
 */
export async function getPeriodById(id: number): Promise<BOResultadoLogicaNegocio<BOPeriodo>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOPeriodo>>(
      `/api/Periodo/LeerPorId?id=${id}`,
    )
    const mapData = {
      ...data,
      objeto: {
        ...data.objeto,
        fechainicio: classicFormatDate(data.objeto.fechainicio),
        fechafin: classicFormatDate(data.objeto.fechafin),
      },
    }
    return mapData
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Get period by idTipo and idIndicador
 * @Param idTipo: number.
 * @Param idIndicador: number.
 * @Return Promise<BOPeriodo[]>
 */
export async function getPeriodByIdTipoAndIdIndicador(
  idTipo: number,
  idIndicador: number,
): Promise<BOPeriodo[]> {
  try {
    const { data } = await axiosInstance.get<BOPeriodo[]>(
      `/api/Periodo/LeerPorPorTipoYIndicador?idTipo=${idTipo}&idIndicador=${idIndicador}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getPeriods,
  createPeriod,
  updatePeriod,
  deletePeriod,
  getPeriodById,
  getPeriodByIdTipoAndIdIndicador,
}
