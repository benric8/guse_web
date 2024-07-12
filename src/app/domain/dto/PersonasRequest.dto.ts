export interface FiltroBuscarPersonaSiga {
    numeroDocumentoIdentidad:string
}

export interface PersonaRequest{
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno?: string | null,
    fechaNacimiento?: string | null,
    documentoIdentidad: string,
    direccion?: string | null,
    email?: string | null,
    tipoDocumento:string ,
    activo: string
}