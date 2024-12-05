import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaDTO } from '../_DTO/empresaDTO';
import { ConvocatoriaForTableDTO } from '../_DTO/convocatoriaForTableDTO';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = 'http://localhost:8080/empresas';  // Cambia esto por tu URL base
  
  constructor(private http: HttpClient) {}

  createEmpresa(empresaDTO: EmpresaDTO){
    return this.http.post<EmpresaDTO>(`${this.baseUrl}`, empresaDTO);
  }

  getConvocatorias(idEmpresa: number){
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatorias`);
  }

  getConvocatoriasVigentes(idEmpresa: number , esVigente : boolean){
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatorias`);
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
    return this.http.patch(`${this.baseUrl}/${idEmpresa}`, empresaDTO);
  }
  
  /*
 
  // Obtener las convocatorias de la empresa
  obtenerConvocatorias(id: number): Observable< private Integer id;[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${id}/convocatorias`);
  }

  // Obtener convocatorias vigentes de la empresa
  obtenerConvocatoriasVigentes(id: number, esVigente: boolean): Observable<ConvocatoriaForTableDTO[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${id}/convocatoriasVigentes?esVigente=${esVigente}`);
  }

  // Obtener las convocatorias por empresa (Método adicional)
  obtenerConvocatoriasPorEmpresa(idEmpresa: number): Observable<ConvocatoriaForTableDTO[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatorias`);
  }

  // Obtener convocatorias filtradas de la empresa (Método adicional)
  obtenerConvocatoriasFiltradas(idEmpresa: number, activo: boolean): Observable<ConvocatoriaForTableDTO[]> {
    return this.http.get<ConvocatoriaForTableDTO[]>(`${this.baseUrl}/${idEmpresa}/convocatoriasFiltradas?activo=${activo}`);
  }

  // Realizar login de la empresa
  loginEmpresa(empresa: EmpresaDTO): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/login`, empresa);
 
  }
*/

}
