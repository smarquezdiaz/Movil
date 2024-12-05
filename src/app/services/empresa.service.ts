import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaDTO } from '../models/empresa.dto';
import { ConvocatoriaForTableDTO } from '../models/convocatoria.dto';  // Asegúrate de importar este DTO si lo tienes

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = 'http://localhost:8080/empresas';  // Cambia esto por tu URL base

  constructor(private http: HttpClient) {}

  // Obtener datos de una empresa
  obtenerEmpresa(id: number): Observable<EmpresaDTO> {
    return this.http.get<EmpresaDTO>(`${this.baseUrl}/${id}`);
  }

  // Actualizar los datos de la empresa
  actualizarEmpresa(id: number, empresa: EmpresaDTO): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, empresa);
  }

  // Obtener las convocatorias de la empresa
  obtenerConvocatorias(id: number): Observable<ConvocatoriaForTableDTO[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${id}/convocatorias`);
  }

  // Obtener convocatorias vigentes de la empresa
  obtenerConvocatoriasVigentes(id: number, esVigente: boolean): Observable<ConvocatoriaForTableDTO[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${id}/convocatoriasVigentes?esVigente=${esVigente}`);
  }

  // Realizar login de la empresa
  loginEmpresa(empresa: EmpresaDTO): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/login`, empresa);
  }
}
