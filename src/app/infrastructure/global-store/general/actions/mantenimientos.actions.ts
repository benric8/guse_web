import { createAction, props } from "@ngrx/store";
import { Aplicativo } from "src/app/domain/dto/AplicativosResponse.dto";
import { Entidad } from "src/app/domain/dto/EntidadesResponse.dto";
import { PersonaData } from "src/app/domain/dto/PersonasResponse.dto";

/* ************* Acciones para datoa de entidad ************ */
export const recuperarEntidadNuevo = createAction(
    '[EntidadesComponent] RECUPERAR ENTIDAD CREADO O MODIFICADO',
    props<{ entidad: Entidad }>()
);
export const resetearEntidadNuevo = createAction('[EntidadesComponent] RESETEA ENTIDAD CREADO O MODIFICADO');

/* ************* Acciones para datoa de aplicativo ************ */
export const recuperarAplicativoNuevo = createAction(
    '[AplicativosComponent] RECUPERAR APLICATIVO CREADO O MODIFICADO',
    props<{ aplicativo: Aplicativo }>()
);
export const resetearAplicativoNuevo = createAction('[AplicativosComponent] RESETEA APLICATIVO CREADO O MODIFICADO');

/* ************* Acciones para datoa de entidad ************ */
export const recuperarPersonaNuevo = createAction(
    '[PersonasComponent] RECUPERAR PERSONA CREADO O MODIFICADO',
    props<{ persona: PersonaData }>()
);
export const resetearPersonaNuevo = createAction('[PersonasComponent] RESETEA PERSONA CREADO O MODIFICADO');
