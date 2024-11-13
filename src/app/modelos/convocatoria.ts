import { Empresa } from "./empresa";

export interface Convocatoria {
    titulo: string;
    descripcion: string;
    imagen: string;
    cantidadMaxPost: number;
    fechaInicio: Date;
    fechaFin: Date;
    empresa: number;
}

export interface ConvocatoriaInfo {
  a: string;
  b: number;
}

 
  