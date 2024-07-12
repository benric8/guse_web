import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { handleError, toParams } from './BaseService';
import { FiltroBuscarPersonaSiga, PersonaRequest } from 'src/app/domain/dto/PersonasRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private httpClient: HttpClient) { }

  getComboPersonas() {
    return this.httpClient.get(`${ environment.urlApi }personas/combo`).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  getComboTipoDocumento() {
    return this.httpClient.get(`${ environment.urlApi }personas/tipos-documento/combo`).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }
  getBuscarPersonaSiga(filtro: FiltroBuscarPersonaSiga) {
    return this.httpClient.get(`${ environment.urlApi }personas/siga/consultar-usuario`,{params:toParams(filtro)}).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

  postCrearPersona(persona: PersonaRequest) {
    return this.httpClient.post(`${ environment.urlApi }personas`, persona).pipe(
        map((result: any) => result),
        catchError(handleError)
    );
  }

}
