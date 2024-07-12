import { createReducer, on } from "@ngrx/store";
import * as acciones from '../actions';
import * as estados from '../states';

const _cargarDetalleCliente= createReducer(estados.cargarDetalleClienteInit,
    on(acciones.cargarDetalleCliente, (state, { detalle }) => ({
        ...state,
        detalle: detalle
    }))
);

export function cargarDetalleCliente(state:any, action:any) {
    return _cargarDetalleCliente(state, action);
}