export interface User {
  id: number;
  nombre: string;
  apellido: string;
  carrera: string;
  descripcion: string;
  celular: string;
  correo: string;
}

export interface UserConvocatoria {
  id: number;
  aceptado: boolean;
  curriculum: string;
  convocatoriaId: number;
}

  