export interface Empresa {
  id?: number;
  nombre: string;
  ubicacion: string;
  imagen: string;
  nit: string;
  usuario: string;
  contrasenia: string;
  rol?: string;
  convocatoriaList: Convocatoria[];
  confirmContrasenia?: string;
  img?: any;
}
export interface Convocatoria {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}
