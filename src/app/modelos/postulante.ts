export interface Postulante {
  id?: number;
  nombre: string;
  apellido: string;
  carrera: string;
  descripcion: string;
  celular: string;
  correo: string;
  usuario: string;
  contrasenia: string;
  rol?: string;
}
export interface PostulanteConvocatoriaDTO {
  curriculum: string;  
}
