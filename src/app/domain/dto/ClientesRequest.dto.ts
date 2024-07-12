import { Auditoria, BasePaginacion } from "./BaseRequest.dto";

export interface FiltroListarClientes extends BasePaginacion {
    idCliente?: number | null,
	idAplicativo?: number | null,
	idPersona?: number | null,
	usuario?: string |null,
	activo?: string | null,
}

export interface ClienteRequest{
    idPersona: number,
    idAplicativo: number,
    usuario: string,
    clave: string,
    cuota: number,
    activo: string
}

export interface ActualizarCredencialRequest{
    auditoria: Auditoria
}