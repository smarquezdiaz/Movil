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
  aceptado?: boolean;
  estado?: string;
}
export interface PostulanteDto {
  id: number;
  nombre: string;
  apellido: string;
  carrera: string;
  descripcion: string;
  celular: string;
  correo: string;
  usuario: string;
  contrasenia: string;
  rol: string;
  datosAdicionales: PostulanteConvocatoriaDTO;
}