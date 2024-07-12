import { BaseResponse } from "./BaseResponse.dto"

export interface Entidad{
  id: number,
  entidad: string,
  documento?: string | null,
  activo?: string | null
}

export interface EntidadesComboResponse extends BaseResponse{
  data: Entidad[]
}
export interface EntidadCrearResponse extends BaseResponse{
  data: Entidad
}