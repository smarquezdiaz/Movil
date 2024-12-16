import { Empresa } from "./empresa";

export interface Convocatoria {
  id?: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  cantidadMaxPost: number;
  fechaInicioReclutamiento: Date;
  fechaFinReclutamiento: Date;
  fechaInicioSeleccion: Date;
  fechaFinSeleccion: Date;
  empresa: number;
  postulantes?: number;
}

export interface ConvocatoriaInfo {
id: number;
titulo: string;
cantidadMaxPost: number;
postulantes?: number;
}

export interface ConvocatoriaParaMostrar {
id?: number;
titulo: string;
descripcion: string;
imagen: string;
cantidadMaxPost: number;
fechaInicio: string;
fechaFin: string;
empresa: number;
}

export interface ConvocatoriaParaPostulantes {
  id?: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  cantidadMaxPost: number;
  fechaInicio: string;
  fechaFin: string;
  empresa: Empresa;
  }

export interface ConvocatoriaForTableDTO {
  id: string;
  titulo: string;
  descripcion?: string;
  imagen: string;
  cantidadMaxPost: number;
  fechaInicioReclutamiento: string;
  fechaFinReclutamiento: string;
  fechaInicioSeleccion: string;
  fechaFinSeleccion: string;
  estado: string;
  empresa?: number;
  postulantes?: number;
}  