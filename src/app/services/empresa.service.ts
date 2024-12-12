import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaDTO } from '../_DTO/empresaDTO';
import { ConvocatoriaForTableDTO } from '../_DTO/convocatoriaForTableDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = environment.api + environment.backend.empresa; 
  
  constructor(private http: HttpClient) {}

  createEmpresa(empresaDTO: EmpresaDTO): Observable<EmpresaDTO> {
    return this.http.post<EmpresaDTO>(`${this.baseUrl}`, empresaDTO);
  }

  getConvocatorias(idEmpresa: number): Observable<ConvocatoriaForTableDTO[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatorias`);
  }

  getConvocatoriasVigentes(idEmpresa: number, esVigente: boolean): Observable<ConvocatoriaForTableDTO[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatoriasVigentes?esVigente=${esVigente}`);
  }

  // Realizar login de la empresa
  loginEmpresa(empresa: EmpresaDTO): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/login`, empresa);
  }

  // Obtener datos de una empresa
  getEmpresa(idEmpresa: number): Observable<EmpresaDTO> {
    return this.http.get<EmpresaDTO>(`${this.baseUrl}/${idEmpresa}`);
  }

  // Actualizar los datos de la empresa
  updateEmpresa(idEmpresa: number, empresaDTO: EmpresaDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${idEmpresa}`, empresaDTO);
  }
}
