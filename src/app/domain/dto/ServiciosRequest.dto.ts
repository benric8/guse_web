import { BasePaginacion } from "./BaseRequest.dto"

export interface FiltroListarServicios extends BasePaginacion {
    idEntidad?: number | null,
	idServicio?: number | null,
	servicio?: string |null,
	activo?: string | null,
}

export interface ServicioRequest{
	nombreServicio: string,
	descripcion: string,
	url: string,
	actualizarCredencial: string,
  	diasActualizarCredencial: number | null,
  	activo: string,
  	idEntidad: number | null
}

export interface AsociarItem{
	id:number
}
export interface AsociarAplicativosRequest {
	idServicio: number,
    aplicativos: AsociarItem []
}