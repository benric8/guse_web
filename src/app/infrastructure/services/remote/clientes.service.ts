import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { handleError, toParams } from './BaseService';
import { ActualizarCredencialRequest, ClienteRequest, FiltroListarClientes } from 'src/app/domain/dto/ClientesRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpClient: HttpClient) { }

  getListaClientes(filtroCliente: FiltroListarClientes) {
    return this.httpClient.get(`${ environment.urlApi }clientes`,{params:toParams(filtroCliente)}).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  postCrearCliente(cliente: ClienteRequest) {
    return this.httpClient.post(`${ environment.urlApi }clientes`, cliente).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  putActualizarCliente(cliente: ClienteRequest, idCliente:number) {
    return this.httpClient.put(`${ environment.urlApi }clientes/${idCliente}`, cliente).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  putActualizarCredencialCliente(data: ActualizarCredencialRequest,  idCliente:number) {
    return this.httpClient.put(`${ environment.urlApi }clientes/actualizar-credencial/${idCliente}`,data).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }
}
