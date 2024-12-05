export interface Convocatoria {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface Empresa {
  id: number;             
  nombre: string;
  ubicacion: string;
  imagen: string;
  nit: string;
  createdAt: Date;
  updatedAt: Date;
  usuario: string;
  contrasenia: string;
  rol: string;
  convocatoriaList: Convocatoria[];  
}

