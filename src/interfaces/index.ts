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
  nombreterritorio: string | null
}

export interface BOTipoPeriodo {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idtipoperiodo: number
  nombretipoperiodo: string | null
  cantidadmeses: number
}

export interface BOTipoTerritorio {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idtipoterritorio: number
  nombretipoterritorio: string | null
  ordenjerarquico: number
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
