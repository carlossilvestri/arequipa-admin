import { axiosInstance } from '@/plugins/axios'
import type {
  BOTerritorio,
  BOResultadoLogicaNegocio,
  CreateBOTerritorioRequest,
  DeleteByIdRequest,
  FilterBOTerritorio,
  UpdateBOTerritorioRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { useTerritoryStore } from '@/stores/territory'

const notifications = useNotificationStore()
const territoryStore = useTerritoryStore()
const name = 'Territorio'

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get territories.
 * @Param filter: FilterBOTerritorio. The object you want to filter.
 * @Return Promise<BOTerritorio[]>
 */
export async function getTerritiries(filter: FilterBOTerritorio): Promise<BOTerritorio[]> {
  try {
    const { data } = await axiosInstance.get<BOTerritorio[]>('/api/Territorio/LeerPorCriterio', {
      params: filter,
    })
    territoryStore.saveTerritoriesOnStore(data)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create territory.
 * @Param periodData: CreateBOTerritorioRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOTerritorio>>
 */
export async function createTerritory(
  periodData: CreateBOTerritorioRequest,
): Promise<BOResultadoLogicaNegocio<BOTerritorio>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOTerritorio>>(
      '/api/Territorio/Grabar',
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
 * Update territory.
 * @Param periodData: UpdateBOTerritorioRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOTerritorio>>
 */
export async function updateTerritory(
  periodData: UpdateBOTerritorioRequest,
): Promise<BOResultadoLogicaNegocio<BOTerritorio>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOTerritorio>>(
      '/api/Territorio/Editar',
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
 * Delete territory.
 * @Param deleteById: DeleteByIdRequest.
 * @Return Promise<BOResultadoLogicaNegocio<null>>
 */
export async function deleteTerritory(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/Territorio/Eliminar',
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
 * Get territory by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOTerritorio>>
 */
export async function getTerritoryById(
  id: number,
): Promise<BOResultadoLogicaNegocio<BOTerritorio>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOTerritorio>>(
      `/api/Territorio/LeerPorId?id=${id}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getTerritiries,
  createTerritory,
  updateTerritory,
  deleteTerritory,
  getTerritoryById,
}
