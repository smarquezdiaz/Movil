import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = 'http://localhost:8080';
  

  constructor(private http: HttpClient) { }
  
  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/empresas/${id}`);
  }

  updateEmpresa(id: number, data: Partial<Empresa>): Observable<Empresa> {
    return this.http.patch<Empresa>(`${this.baseUrl}/empresas/${id}`, data);
  }

  getConvocatorias(id: number): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(`${this.baseUrl}/empresas/${id}/Convocatorias`);
  }
}

