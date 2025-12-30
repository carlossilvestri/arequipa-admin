export enum EstadoPersistenciaEnum {
  NEW = 0,
  UNCHANGED = 1,
  MARKED_FOR_DELETION = 2,
  MODIFIED = 3,
}

export interface BOGrupo {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idgrupo: number
  nombregrupo: string
}

export interface BOPeriodo {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idtipoperiodo: number
  anio: number
  numeroperiodo: number
  etiquetacorta: string | null
  etiquetalarga: string | null
  fechainicio: string | null
  fechafin: string | null
}

export interface BOResultadoLogicaNegocio<T> {
  objeto: T
  exito: boolean
  listaErrores: string[] | null
  errores: string | null
  listaMensajes: string[] | null
  mensajes: string | null
}

export interface BOSubGrupo {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idsubgrupo: number
  idgrupo: number
  nombresubgrupo: string
}

export interface BOTerritorio {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idterritorio: number
  idtipoterritorio: number
  idterritoriopadre: number
  nombreterritorio: string
}

export interface BOUsuario {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idusuario: number
  nombre: string
  clave: string
  estado: string
  nick: string
}

export interface FilterBOUsuario {
  NOMBRE?: string
  NICK?: string
  ESTADO?: string
}

export interface CreateUserRequest {
  IDUSUARIO?: number
  NOMBRE: string
  NICK: string
  CLAVE: string
  ESTADO: string
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateUserRequest extends CreateUserRequest {
  IDUSUARIO: number
}
export interface DeleteByIdRequest {
  id: number
}

export interface LoginRequest {
  nick: string
  password: string
}
/* UNIDAD DE MEDIDA */
export interface BOUnidadMedida {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idunidadmedida: number
  nombreunidadmedida: string
  simbolounidadmedida: string
  descripcionunidadmedida: string
}

export interface FilterBOUnidadMedida {
  NOMBRE?: string
  SIMBOLO?: string
}

export interface CreateBOUnidadMedidaRequest {
  NOMBREUNIDADMEDIDA: string
  SIMBOLOUNIDADMEDIDA: string
  DESCRIPCIONUNIDADMEDIDA: string
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateBOUnidadMedidaRequest extends CreateBOUnidadMedidaRequest {
  IDUNIDADMEDIDA: number
}

/* GRUPO */
export interface BOGrupo {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idgrupo: number
  nombregrupo: string
}

export interface FilterBOGrupo {
  NOMBRE?: string
}

export interface CreateBOGrupoRequest {
  NOMBREGRUPO: string
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateBOGrupoRequest extends CreateBOGrupoRequest {
  IDGRUPO: number
}

/* SUBGRUPO */
export interface BOSubGrupo {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idsubgrupo: number
  nombresubgrupo: string
}

export interface FilterBOSubGrupo {
  NOMBRESUBGRUPO?: string
}

export interface CreateBOSubGrupoRequest {
  IDGRUPO: number
  NOMBRESUBGRUPO: string
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateBOSubGrupoRequest extends CreateBOSubGrupoRequest {
  IDSUBGRUPO: number
}

/* TIPOPERIODO */
export interface BOTipoPeriodo {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idtipoperiodo: number
  nombretipoperiodo: string
  cantidadmeses: number
}

export interface FilterBOTipoPeriodo {
  NOMBRE?: string
}

export interface CreateBOTipoPeriodoRequest {
  IDTIPOPERIODO?: number
  NOMBRETIPOPERIODO: string
  CANTIDADMESES: number
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateBOTipoPeriodoRequest extends CreateBOTipoPeriodoRequest {
  IDTIPOPERIODO: number
}

/* TIPOTERRITORIO */
export interface BOTipoTerritorio {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idtipoterritorio: number
  nombretipoterritorio: string
  ordenjerarquico: number
}

export interface FilterBOTipoTerritorio {
  NOMBRE?: string
}

export interface CreateBOTipoTerritorioRequest {
  IDTIPOTERRITORIO?: number
  NOMBRETIPOTERRITORIO: string
  ORDENJERARQUICO: number
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateBOTipoTerritorioRequest extends CreateBOTipoTerritorioRequest {
  IDTIPOTERRITORIO: number
}
