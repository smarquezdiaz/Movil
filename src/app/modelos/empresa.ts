export interface Empresa {
  id?: number;
  nombre: string;
  imagen: string;
  telefono: string;
  email: string;
  usuario: string;
  convocatorias?: Convocatoria [];
  img?:any;
}
export interface Convocatoria {
  id: number;
  titulo: string;
  vigente: boolean;
  fechaCreacion: string;
}
