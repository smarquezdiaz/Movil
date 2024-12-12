import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaDTO } from '../_DTO/empresaDTO';
import { ConvocatoriaForTableDTO } from '../_DTO/convocatoriaForTableDTO';
import { Convocatoria } from '../modelos/convocatoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = environment.api + environment.backend.empresa;

  constructor(private http: HttpClient) {}

  // Métodos relacionados con la empresa
  createEmpresa(empresaDTO: EmpresaDTO): Observable<EmpresaDTO> {
    return this.http.post<EmpresaDTO>(`${this.baseUrl}`, empresaDTO);
  }

  loginEmpresa(empresa: EmpresaDTO): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/login`, empresa);
  }

  getEmpresa(idEmpresa: number): Observable<EmpresaDTO> {
    return this.http.get<EmpresaDTO>(`${this.baseUrl}/${idEmpresa}`);
  }

  updateEmpresa(idEmpresa: number, empresaDTO: EmpresaDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${idEmpresa}`, empresaDTO);
  }

  // Métodos relacionados con las convocatorias
  getConvocatorias(idEmpresa: number): Observable<ConvocatoriaForTableDTO[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatorias`);
  }

  getConvocatoriasVigentes(idEmpresa: number, esVigente: boolean): Observable<ConvocatoriaForTableDTO[]> {
    const params = new HttpParams().set('esVigente', esVigente.toString());
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatoriasVigentes`, { params });
  }

  obtenerConvocatoriasPorEstado(idEmpresa: number, estado: string): Observable<ConvocatoriaForTableDTO[]> {
    const params = new HttpParams().set('estado', estado);
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatorias`, { params });
  }

  obtenerConvocatoriasPorEmpresa(idEmpresa: number): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(`${this.baseUrl}/${idEmpresa}/convocatorias`);
  }

  obtenerConvocatoriasFiltradas(idEmpresa: number, esVigente: boolean): Observable<Convocatoria[]> {
    const params = new HttpParams().set('esVigente', esVigente.toString());
    return this.http.get<Convocatoria[]>(`${this.baseUrl}/${idEmpresa}/convocatoriasVigentes`, { params });
  }
}

