export interface Convocatoria {
  id?: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  cantidadMaxPost: number;
  fechaInicio: Date;
  fechaFin: Date;
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