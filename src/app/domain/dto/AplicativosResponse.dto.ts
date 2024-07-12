import { BaseResponse } from "./BaseResponse.dto"

export interface Aplicativo{
  id: number,
  aplicativo: string,
  descripcion: string | null,
  activo: string
}

export interface AplicativosComboResponse extends BaseResponse{
  data: Aplicativo[]
}

export interface AplicativoDetalleResponse extends BaseResponse{
  data: Aplicativo
}

export interface AplicativoCrearResponse extends BaseResponse{
  data: Aplicativo
}