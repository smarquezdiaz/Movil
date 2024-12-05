import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../modelos/empresa.model'; 
import { Convocatoria } from '../modelos/convocatoria.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la información de una empresa por su ID.
   * @param id ID de la empresa.
   * @returns Observable con los datos de la empresa.
   */
  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/empresas/${id}`);
  }

  /**
   * Actualiza los datos de una empresa.
   * @param id ID de la empresa a actualizar.
   * @param data Datos parciales de la empresa para actualizar.
   * @returns Observable con los datos actualizados de la empresa.
   */
  updateEmpresa(id: number, data: Partial<Empresa>): Observable<Empresa> {
    return this.http.patch<Empresa>(`${this.baseUrl}/empresas/${id}`, data);
  }

  /**
   * Obtiene las convocatorias asociadas a una empresa.
   * @param id ID de la empresa.
   * @returns Observable con la lista de convocatorias.
   */
  getConvocatorias(id: number): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(`${this.baseUrl}/empresas/${id}/convocatorias`);
  }
}

