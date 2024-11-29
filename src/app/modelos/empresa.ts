export interface Empresa {
  id?: number;
  nombre: string;
  ubicacion: string;
  imagen: string;
  nit: string;
  usuario: string;
  contrasenia: string;
  rol?: string;
  confirmContrasenia?: string;
  img?: any;
}