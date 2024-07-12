import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppProcesosState } from "./procesos.reducers";

export const getLayout = createFeatureSelector<AppProcesosState>(
    'ProcesosModule'
);

export const getDetalleServicio = createSelector(getLayout, (state: AppProcesosState) => {
    if(state.cargarDetalleServicio) {
        return  state.cargarDetalleServicio.detalle;     
    } 
    else {
        return null;
    }
});

export const getDetalleCliente= createSelector(getLayout, (state: AppProcesosState) => {
    if(state.cargarDetalleCliente) {
        return  state.cargarDetalleCliente.detalle;     
    } 
    else {
        return null;
    }
});