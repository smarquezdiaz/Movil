import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modelos/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {

  constructor(private http: HttpClient) { }

  login(user : User) : Observable<number>{
    return this.http.post<number>(environment.api + environment.backend.postulante + `/login`, user);
  }

  obtenerPostulantePorConvocatoria(idConvocatoria: number, idPostulante: number): Observable<User> {
    return this.http.get<User>(`${environment.api}/convocatorias/${idConvocatoria}/postulantes/${idPostulante}`);
  }

  cambiarEstadoPostulante(idConvocatoria: number, idPostulante: number, estado: string): Observable<any> {
    return this.http.put<any>(`${environment.api}/convocatorias/${idConvocatoria}/postulantes/${idPostulante}/estado`, { estado });
  }
}
