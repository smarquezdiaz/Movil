export interface Convocatoria {
  id?: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  cantidadMaxPost: number;
  fechaInicio: Date;
  fechaFin: Date;
  empresa: number;
}

export interface ConvocatoriaInfo {
id: number;
titulo: string;
cantidadMaxPost: number;
}

export interface ConvocatoriaParaMostrar {
id?: string;
titulo: string;
descripcion: string;
imagen: string;
cantidadMaxPost: number;
fechaInicio: string;
fechaFin: string;
empresa: number;
}