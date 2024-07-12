import { Aplicativo } from "./AplicativosResponse.dto"
import { BasePaginacionResponse, BaseResponse } from "./BaseResponse.dto"
import { Entidad } from "./EntidadesResponse.dto"

export interface ServicioCombo{
  id: number,
  nombreServicio: string,
  descripcion: string | null,
  url: string | null,
  actualizarCredencial: string | null,
  diasActualizarCredencial: string | null,
  activo: string | null,
  entidad: string | null
}

export interface ServiciosComboResponse extends BaseResponse{
  data: ServicioCombo[]
}

export interface Servicio{
  id: number,
  nombreServicio: string,
  descripcion: string | null,
  url: string,
  actualizarCredencial: string,
  diasActualizarCredencial: string | null,
  activo: string,
  entidad: Entidad | null
}

export interface ListaServicioData extends BasePaginacionResponse{
  lista: Servicio[]
}

export interface ListaServicioResponse extends BaseResponse{
  data: ListaServicioData
}

export interface DetalleServicioData extends Servicio{
  aplicativosAsociados: Aplicativo[]
}

export interface DetalleServicioResponse extends BaseResponse{
  data: DetalleServicioData
}