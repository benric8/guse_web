import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { handleError, toParams } from './BaseService';
import { AsociarAplicativosRequest, FiltroListarServicios, ServicioRequest } from 'src/app/domain/dto/ServiciosRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private httpClient: HttpClient) { }

  getComboServicios() {
    return this.httpClient.get(`${ environment.urlApi }servicios/combo`).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  getListaServicios(filtroServicios: FiltroListarServicios) {
    return this.httpClient.get(`${ environment.urlApi }servicios`,{params:toParams(filtroServicios)}).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  getDetalleServicio(idServicio: number) {
    return this.httpClient.get(`${ environment.urlApi }servicios/${idServicio}`).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  postCrearServicio(servicio: ServicioRequest) {
    return this.httpClient.post(`${ environment.urlApi }servicios`, servicio).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  putActualizarServicio(servicio: ServicioRequest, idServicio:number) {
    return this.httpClient.put(`${ environment.urlApi }servicios/${idServicio}`, servicio).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  postAsociarAplicativos(asociar: AsociarAplicativosRequest) {
    return this.httpClient.post(`${ environment.urlApi }aplicativos/asociar-aplicativo`, asociar).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }
}
