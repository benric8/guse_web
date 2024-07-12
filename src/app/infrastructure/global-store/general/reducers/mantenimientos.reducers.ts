import { createReducer, on } from "@ngrx/store";
import * as acciones from '../actions';
import * as estados from '../states';
/**
 * Manejador de acciones paa recuperar datos de usuario del sistema
 */

const _recuperarEntidadNuevo= createReducer(estados.recuperarEntidadNuevoInit,
    on(acciones.recuperarEntidadNuevo,(state, {entidad}) => ({
        ...state,
        entidad:entidad
    })),
    on(acciones.resetearEntidadNuevo,(state => estados.recuperarEntidadNuevoInit)),
)

export function recuperarEntidadNuevo(state:any, action:any){
    return _recuperarEntidadNuevo(state, action);
}

/**
 * Manejador de acciones paa recuperar datos de usuario del sistema
 */

const _recuperarAplicativoNuevo= createReducer(estados.recuperarAplicativoNuevoInit,
    on(acciones.recuperarAplicativoNuevo,(state, {aplicativo}) => ({
        ...state,
        aplicativo:aplicativo
    })),
    on(acciones.resetearAplicativoNuevo,(state => estados.recuperarAplicativoNuevoInit)),
)

export function recuperarAplicativoNuevo(state:any, action:any){
    return _recuperarAplicativoNuevo(state, action);
}

/**
 * Manejador de acciones paa recuperar datos de usuario del sistema
 */

const _recuperarPersonaNuevo= createReducer(estados.recuperarPersonaNuevoInit,
    on(acciones.recuperarPersonaNuevo,(state, {persona}) => ({
        ...state,
        persona:persona
    })),
    on(acciones.resetearPersonaNuevo,(state => estados.recuperarPersonaNuevoInit)),
)

export function recuperarPersonaNuevo(state:any, action:any){
    return _recuperarPersonaNuevo(state, action);
}