import { axiosInstance } from '@/plugins/axios'
import type {
  BOSubGrupo,
  BOResultadoLogicaNegocio,
  CreateBOSubGrupoRequest,
  DeleteByIdRequest,
  FilterBOSubGrupo,
  UpdateBOSubGrupoRequest,
} from '@/interfaces'
import { useNotificationStore } from '@/stores/notification'
import { useSubGroupStore } from '@/stores/subgroup'

const notifications = useNotificationStore()
const subgroupStore = useSubGroupStore()
const name = 'Subgrupo'

const handleShowError = (error: any) => {
  console.error(error)
  notifications.error('Hubo un error inesperado, por favor intenta más tarde.')
}

/**
 * Get subgroups.
 * @Param filter: FilterBOSubGrupo. The object you want to filter.
 * @Return Promise<BOSubGrupo[]>
 */
export async function getSubgroups(filter: FilterBOSubGrupo): Promise<BOSubGrupo[]> {
  try {
    const { data } = await axiosInstance.get<BOSubGrupo[]>('/api/SubGrupo/LeerPorCriterio', {
      params: filter,
    })
    subgroupStore.saveSubGroupsOnStore(data)
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

/**
 * Create group.
 * @Param subgroupData: CreateBOSubGrupoRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOSubGrupo>>
 */
export async function createSubGroup(
  subgroupData: CreateBOSubGrupoRequest,
): Promise<BOResultadoLogicaNegocio<BOSubGrupo>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOSubGrupo>>(
      '/api/SubGrupo/Grabar',
      null,
      {
        params: subgroupData,
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
 * @Param subgroupData: UpdateBOSubGrupoRequest.
 * @Return Promise<BOResultadoLogicaNegocio<BOSubGrupo>>
 */
export async function updateSubGroup(
  subgroupData: UpdateBOSubGrupoRequest,
): Promise<BOResultadoLogicaNegocio<BOSubGrupo>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<BOSubGrupo>>(
      '/api/SubGrupo/Editar',
      null,
      {
        params: subgroupData,
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
 * Delete subgroup.
 * @Param deleteById: DeleteByIdRequest.
 * @Return Promise<BOResultadoLogicaNegocio<null>>
 */
export async function deleteSubGroup(
  deleteById: DeleteByIdRequest,
): Promise<BOResultadoLogicaNegocio<null>> {
  try {
    const { data } = await axiosInstance.post<BOResultadoLogicaNegocio<null>>(
      '/api/SubGrupo/Eliminar',
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
 * Get subgroup by id.
 * @Param id: number.
 * @Return Promise<BOResultadoLogicaNegocio<BOSubGrupo>>
 */
export async function getSubGroupById(id: number): Promise<BOResultadoLogicaNegocio<BOSubGrupo>> {
  try {
    const { data } = await axiosInstance.get<BOResultadoLogicaNegocio<BOSubGrupo>>(
      `/api/SubGrupo/LeerPorId?id=${id}`,
    )
    return data
  } catch (error) {
    console.error(error)
    handleShowError(error)
    throw error
  }
}

export default {
  getSubgroups,
  createSubGroup,
  updateSubGroup,
  deleteSubGroup,
  getSubGroupById,
}
