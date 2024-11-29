import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../modelos/empresa';
<<<<<<< HEAD
import { User } from '../modelos/user';
import { Convocatoria } from '../modelos/convocatoria';

=======
import { User } from '../modelos/user'; 
import { Convocatoria } from '../modelos/convocatoria';
>>>>>>> ff74f7d28da1ac450cb054e3c9c563e64940cabb
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient) { }

  crearEmpresa ( empresa : Empresa) : Observable<Empresa>{
    return this.http.post<Empresa>(environment.api + environment.backend.empresa, empresa);
  }
  getEmpresa(id: String): Observable<Empresa> {
    return this.http.get<Empresa>(`${environment.api}${environment.backend.empresa}/${id}`);
  }
  
  updateEmpresa(id: string, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${environment.api}${environment.backend.empresa}/${id}`, empresa);
  }
<<<<<<< HEAD
  
=======
>>>>>>> ff74f7d28da1ac450cb054e3c9c563e64940cabb
  login(user: User): Observable<number> {
    return this.http.post<number>(environment.api + environment.backend.empresa + `/login`, user);
  }
  
  obtenerConvocatoriasPorEmpresa(userId: number): Observable<Array<Convocatoria>> {
    return this.http.get<Array<Convocatoria>>(environment.api + environment.backend.empresa + `/${userId}/convocatorias`);
  }
  
  obtenerConvocatoriasFiltradas(userId: number, esVigente: boolean): Observable<Array<Convocatoria>> {
    const params = new HttpParams().set('esVigente', esVigente);
    return this.http.get<Array<Convocatoria>>(environment.api + environment.backend.empresa + `/${userId}/convocatoriasVigentes`, { params });
  }
<<<<<<< HEAD
  
=======
>>>>>>> ff74f7d28da1ac450cb054e3c9c563e64940cabb
}
