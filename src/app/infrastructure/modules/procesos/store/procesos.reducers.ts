import {ActionReducerMap} from "@ngrx/store";

//----------- general - shared --------
import * as reducersProcesos from './reducers';
import * as statesServicios from './states/servicios.states';
import * as statesClientes from './states/clientes.states';


export interface AppProcesosState {
    cargarDetalleServicio: statesServicios.cargarDetalleServicio,
    cargarDetalleCliente: statesClientes.cargarDetalleCliente,
}

export const appProcesosReducers: ActionReducerMap<AppProcesosState> = {
    cargarDetalleServicio:reducersProcesos.cargarDetalleServicio,
    cargarDetalleCliente:reducersProcesos.cargarDetalleCliente,
}
