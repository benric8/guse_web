import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { handleError } from './BaseService';
import { CrearEntidadRequest } from 'src/app/domain/dto/EntidadesRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  constructor(private httpClient: HttpClient) { }

  getComboEntidades() {
    return this.httpClient.get(`${ environment.urlApi }entidades/combo`).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  postCrearEntidad(entidad: CrearEntidadRequest) {
    return this.httpClient.post(`${ environment.urlApi }entidades`, entidad).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

}
