import { axiosInstance } from '@/plugins/axios'
import type {
  BOGrupo,
  BOResultadoLogicaNegocio,
  CreateBOGrupoRequest,
  DeleteByIdRequest,
  FilterBOGrupo,
  UpdateBOGrupoRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { useGroupStore } from '@/stores/group'

const notifications = useNotificationStore()
const groupStore = useGroupStore()
const name = 'Sector'

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get groups.
 * @Param filter: FilterBOGrupo. The object you want to filter.
 * @Return Promise<BOGrupo[]>
 */
export async function getGroups(filter: FilterBOGrupo): Promise<BOGrupo[]> {
  try {
    const { data } = await axiosInstance.get<BOGrupo[]>('/api/Grupo/LeerPorCriterio', {
      params: filter,
    })
    groupStore.saveGroupsOnStore(data)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create group.
 * @Param groupData: CreateBOGrupoRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOGrupo>>
 */
export async function createGroup(
  groupData: CreateBOGrupoRequest,
): Promise<BOResultadoLogicaNegocio<BOGrupo>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOGrupo>>(
      '/api/Grupo/Grabar',
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
 * @Param groupData: UpdateBOGrupoRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOGrupo>>
 */
export async function updateGroup(
  groupData: UpdateBOGrupoRequest,
): Promise<BOResultadoLogicaNegocio<BOGrupo>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOGrupo>>(
      '/api/Grupo/Editar',
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
export async function deleteGroup(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/Grupo/Eliminar',
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
 * Get group by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOGrupo>>
 */
export async function getGroupById(id: number): Promise<BOResultadoLogicaNegocio<BOGrupo>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOGrupo>>(
      `/api/Grupo/LeerPorId?id=${id}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  getGroupById,
}
