import { Empresa } from "./empresa";

export interface Convocatoria {
    descripcion: string;
    imagen: string;
    cantidadMaxPost: number;
    fechaInicio: Date;
    fechaFin: Date;
    empresa: number;
  }

 
  