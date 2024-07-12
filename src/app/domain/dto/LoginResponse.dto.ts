import { BaseResponse } from "./BaseResponse.dto"

export interface Usuario{
  id:number,
  usuario: string,
  password: string,
  perfil:string,
  numeroDocumento: string,
  apellidosNombres:string,
  nombres: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  correo: string | null,
  activo:String,
  codigoRol: string,
  token: string
}

export interface LoginResponse extends BaseResponse{
  data: Usuario
}