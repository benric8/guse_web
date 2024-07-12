import { BaseResponse } from "./BaseResponse.dto"

export interface PersonaData{
    id: number,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string | null,
    apellidosNombres: string,
    fechaNacimiento: string | null,
    documentoIdentidad: string,
    direccion: string |null,
    email: string | null,
    tipoDocumento: string,
    activo: string
}

export interface ComboPersonasResponse extends BaseResponse{
    data: PersonaData[]
}

export interface TipoDocumento{
    id: string,
    descripcion: string,
    abreviatura: string | null
}

export interface ComboTipoDocResponse extends BaseResponse{
    data: TipoDocumento[]
}

export interface PersonaSiga{
    codigoValidacion: string,
    descripcionValidacion: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string | null
}

export interface BuscarPerSigaResponse extends BaseResponse{
    data: PersonaSiga
}

export interface PersonaCrearResponse extends BaseResponse{
    data: PersonaData
}