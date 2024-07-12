import { createAction, props } from "@ngrx/store";
import { Servicio } from "src/app/domain/dto/ServiciosResponse.dto";

export const cargarDetalleServicio = createAction(
    '[ServiciosComponent] CARGAR DETALLE SERVICIO',
    props<{ detalle: Servicio }>()
);