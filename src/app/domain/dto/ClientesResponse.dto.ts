import { Aplicativo } from "./AplicativosResponse.dto"
import { BasePaginacionResponse, BaseResponse } from "./BaseResponse.dto"
import { PersonaData } from "./PersonasResponse.dto"

export interface Cliente{
    id: number,
    usuario: string,
    clave: string | null,
    cuota: number,
    usuarioRegistra: string | null,
    usuarioActualiza: string | null,
    fechaActualizacion: string | null,
    activo: string |null,
    idPersona: number,
    idAplicativo: number,
    persona: PersonaData| null,
    aplicativo: Aplicativo | null
}
export interface ListaClientesData extends BasePaginacionResponse{
    lista: Cliente[]
}

export interface ListaClienteResponse extends BaseResponse{
    data: ListaClientesData
}