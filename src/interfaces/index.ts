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
  NOMBRE?: string
  IDGRUPO?: number
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

/* PERIODO */
export interface BOPeriodo {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idperiodo: number
  idtipoperiodo: number
  anio: number
  numeroperiodo: number
  etiquetacorta: string
  etiquetalarga: string
  fechainicio: string
  fechafin: string
}

export interface FilterBOPeriodo {
  IDTIPOPERIODO?: string
  ANIO?: number
  NUMEROPERIODO?: number
  ETIQUETA?: string
}

export interface CreateBOPeriodoRequest {
  IDPERIODO?: number
  IDTIPOPERIODO: number
  ANIO: number
  NUMEROPERIODO: number
  ETIQUETACORTA: string
  ETIQUETALARGA: string
  FECHAINICIO: string
  FECHAFIN: string
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateBOPeriodoRequest extends CreateBOPeriodoRequest {
  IDPERIODO: number
}

/* TERRITORIO */
export interface BOTerritorio {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idterritorio: number
  idtipoterritorio: number
  idterritoriopadre: number
  nombreterritorio: string
}

export interface FilterBOTerritorio {
  IDTIPOTERRITORIO?: number
  IDTERRITORIOPADRE?: number
  NOMBRE?: string
}

export interface CreateBOTerritorioRequest {
  IDTERRITORIO?: number
  IDTIPOTERRITORIO: number
  IDTERRITORIOPADRE: number
  NOMBRETERRITORIO: string
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateBOTerritorioRequest extends CreateBOTerritorioRequest {
  IDTERRITORIO: number
}

/* INDICADOR */
export interface BOIndicador {
  estadoPersistencia: EstadoPersistenciaEnum
  errores: string | null
  listaErrores: string[] | null
  idindicador: number
  codigoindicador: string
  nombreindicador: string
  descripcionindicador: string
  idgrupo: number
  idsubgrupo: number
  idunidadmedida: number
  permitecomparacion: boolean
  disponibilidadreferencial: string
  urlfuente: string
  activo: boolean
}

export interface BOIndicadorDto {
  descripcionunidadmedida: string
  errores: string | null
  estadoPersistencia: EstadoPersistenciaEnum
  idunidadmedida: number
  listaErrores: string[] | null
  nombreunidadmedida: string
  simbolounidadmedida: string
}

export interface FilterBOIndicador {
  CODIGO?: string
  IDGRUPO?: number
  IDSUBGRUPO?: number
  NOMBRE?: string
}

export interface CreateBOIndicadorRequest {
  IDINDICADOR?: number
  CODIGOINDICADOR: string
  NOMBREINDICADOR: string
  DESCRIPCIONINDICADOR: string
  IDGRUPO: number
  IDSUBGRUPO: number
  IDUNIDADMEDIDA: number
  PERMITECOMPARACION: boolean
  DISPONIBILIDADREFERENCIAL: string
  URLFUENTE: string
  ACTIVO: boolean
  EstadoPersistencia: EstadoPersistenciaEnum
}

export interface UpdateBOIndicadorRequest extends CreateBOIndicadorRequest {
  IDINDICADOR: number
}
