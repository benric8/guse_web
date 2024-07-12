import { createReducer, on } from "@ngrx/store";
import * as acciones from '../actions';
import * as estados from '../states';

const _cargarDetalleServicio= createReducer(estados.cargarDetalleServicioInit,
    on(acciones.cargarDetalleServicio, (state, { detalle }) => ({
        ...state,
        detalle: detalle
    }))
);

export function cargarDetalleServicio(state:any, action:any) {
    return _cargarDetalleServicio(state, action);
}