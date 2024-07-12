import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { handleError } from './BaseService';
import { CrearAplicativoRequest } from 'src/app/domain/dto/AplicativosRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class AplicativosService {

  constructor(private httpClient: HttpClient) { }

  getComboAplicativos() {
    return this.httpClient.get(`${ environment.urlApi }aplicativos/combo`).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  postCrearAplicativo(aplicativo: CrearAplicativoRequest) {
    return this.httpClient.post(`${ environment.urlApi }aplicativos`, aplicativo).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  getDetalleAplicativo(idAplicativo:number) {
    return this.httpClient.get(`${ environment.urlApi }aplicativos/${idAplicativo}`).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }
}
