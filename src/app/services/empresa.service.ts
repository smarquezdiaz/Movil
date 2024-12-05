import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaDTO } from '../models/empresa.dto';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = 'http://localhost:8080/empresas';  // Cambia esto por tu URL base

  constructor(private http: HttpClient) {}

  obtenerEmpresa(id: number): Observable<EmpresaDTO> {
    return this.http.get<EmpresaDTO>(`${this.baseUrl}/${id}`);
  }

  actualizarEmpresa(id: number, empresa: EmpresaDTO): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, empresa);
  }
}
