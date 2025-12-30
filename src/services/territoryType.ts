import { axiosInstance } from '@/plugins/axios'
import type {
  BOTipoTerritorio,
  BOResultadoLogicaNegocio,
  CreateBOTipoTerritorioRequest,
  DeleteByIdRequest,
  FilterBOTipoTerritorio,
  UpdateBOTipoTerritorioRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { useTerritoryTypeStore } from '@/stores/territoryType'

const notifications = useNotificationStore()
const territoryTypeStore = useTerritoryTypeStore()
const name = 'Tipo de territorio'

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get territory types.
 * @Param filter: FilterBOTipoTerritorio. The object you want to filter.
 * @Return Promise<BOTipoTerritorio[]>
 */
export async function getTerritoryTypes(
  filter: FilterBOTipoTerritorio,
): Promise<BOTipoTerritorio[]> {
  try {
    const { data } = await axiosInstance.get<BOTipoTerritorio[]>(
      '/api/TipoTerritorio/LeerPorCriterio',
      {
        params: filter,
      },
    )
    territoryTypeStore.saveTerritoryTypesOnStore(data)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create territory type.
 * @Param territoryTypeData: CreateBOTipoTerritorioRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOTipoTerritorio>>
 */
export async function createTerritoryType(
  territoryTypeData: CreateBOTipoTerritorioRequest,
): Promise<BOResultadoLogicaNegocio<BOTipoTerritorio>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOTipoTerritorio>>(
      '/api/TipoTerritorio/Grabar',
      null,
      {
        params: territoryTypeData,
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
 * Update territory type.
 * @Param territoryTypeData: UpdateBOTipoTerritorioRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOTipoTerritorio>>
 */
export async function updateTerritoryType(
  territoryTypeData: UpdateBOTipoTerritorioRequest,
): Promise<BOResultadoLogicaNegocio<BOTipoTerritorio>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOTipoTerritorio>>(
      '/api/TipoTerritorio/Editar',
      null,
      {
        params: territoryTypeData,
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
 * Delete territory type.
 * @Param deleteById: DeleteByIdRequest.
 * @Return Promise<BOResultadoLogicaNegocio<null>>
 */
export async function deleteTerritoryType(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/TipoTerritorio/Eliminar',
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
 * Get territory type by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOTipoTerritorio>>
 */
export async function getTerritoryTypeById(
  id: number,
): Promise<BOResultadoLogicaNegocio<BOTipoTerritorio>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOTipoTerritorio>>(
      `/api/TipoTerritorio/LeerPorId?id=${id}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getTerritoryTypes,
  createTerritoryType,
  updateTerritoryType,
  deleteTerritoryType,
  getTerritoryTypeById,
}
