import { createAction, props } from "@ngrx/store";
import { Cliente } from "src/app/domain/dto/ClientesResponse.dto";

export const cargarDetalleCliente = createAction(
    '[ClientesComponent] CARGAR DETALLE CLIENTE',
    props<{ detalle: Cliente }>()
);