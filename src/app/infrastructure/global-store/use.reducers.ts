import {ActionReducerMap} from "@ngrx/store";

//----------- reducers ----------
import * as reducersGeneral from './general/reducers';
//------------ states -----------
import * as statesGeneral from './general/states/general.states';
import * as statesLayout from './general/states/layout.states'
import * as statesMantenimientos from './general/states/mantenimientos.states'

export interface AppUseState {
    //--- general
    mostrartituloNavBar: statesGeneral.mostrartituloNavBar,
    mostrarCargando: statesGeneral.mostrarCargando,
    recuperarUsuario: statesGeneral.recuperarUsuario,
    //--- layout
    seleccionarOpcioMenu: statesLayout.seleccionarOpcionMenu,
    seleccionarOpcionMenuIndice: statesLayout.seleccionarOpcionMenuIndice,
    //--- mantenimientos
    recuperarEntidadNuevo: statesMantenimientos.recuperarEntidadNuevo,
    recuperarAplicativoNuevo: statesMantenimientos.recuperarAplicativoNuevo,
    recuperarPersonaNuevo: statesMantenimientos.recuperarPersonaNuevo
}

export const appUseReducers: ActionReducerMap<AppUseState> = {
    //--- general
    mostrartituloNavBar: reducersGeneral.mostrarTituloNavBar,
    mostrarCargando: reducersGeneral.mostrarCargando,
    recuperarUsuario: reducersGeneral.recuperarUsuario,
    //--- layout
    seleccionarOpcioMenu: reducersGeneral.seleccionarOpcionMenu,
    seleccionarOpcionMenuIndice: reducersGeneral.seleccionarOpcionMenuIndice,
    //--- mantenimientos 
    recuperarEntidadNuevo: reducersGeneral.recuperarEntidadNuevo,
    recuperarAplicativoNuevo: reducersGeneral.recuperarAplicativoNuevo,
    recuperarPersonaNuevo: reducersGeneral.recuperarPersonaNuevo
}