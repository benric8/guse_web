import * as states from './general.states';
import * as statesLayout from './layout.states';
import * as statesMantenimientos from './mantenimientos.states';

export const mostrartituloNavBarInit: states.mostrartituloNavBar = {
    titulo: ""
};
export const mostrarCargandoInit: states.mostrarCargando = {
    estado: false
};
export const recuperarUsuarioInit: states.recuperarUsuario = {
    usuario: null
}

export const seleccionarOpcionMenuInit: statesLayout.seleccionarOpcionMenu= {
    url:""
}
export const seleccionarOpcionMenuIndiceInit: statesLayout.seleccionarOpcionMenuIndice = {
    indice:-1
}

export const recuperarEntidadNuevoInit: statesMantenimientos.recuperarEntidadNuevo = {
    entidad: null
};
export const recuperarAplicativoNuevoInit: statesMantenimientos.recuperarAplicativoNuevo = {
    aplicativo: null
};
export const recuperarPersonaNuevoInit: statesMantenimientos.recuperarPersonaNuevo = {
    persona: null
};