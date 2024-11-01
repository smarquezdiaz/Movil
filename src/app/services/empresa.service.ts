import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../modelos/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient) { }

  crearEmpresa ( empresa :Empresa) : Observable<Empresa>{
    return this.http.post<Empresa>(environment.api + environment.backend.empresa, empresa);
  }
}
