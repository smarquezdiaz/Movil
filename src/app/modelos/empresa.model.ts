
export interface Empresa {
  id: string;
  nombre: string;
  descripcion: string;
  email: string;
  telefono: string;
  imagen: string;
  convocatorias: Convocatoria[];
}

export interface Convocatoria {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}
