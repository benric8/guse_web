import { Aplicativo } from "src/app/domain/dto/AplicativosResponse.dto";
import { Entidad } from "src/app/domain/dto/EntidadesResponse.dto";
import { PersonaData } from "src/app/domain/dto/PersonasResponse.dto";

export interface recuperarEntidadNuevo {
    entidad: Entidad | null
}

export interface recuperarAplicativoNuevo {
    aplicativo: Aplicativo | null
}

export interface recuperarPersonaNuevo {
    persona: PersonaData | null
}