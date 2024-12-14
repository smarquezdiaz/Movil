import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modelos/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Postulante, PostulanteConvocatoriaDTO, PostulanteDto } from '../modelos/postulante';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {

  constructor(private http: HttpClient) { }

  login(user : User) : Observable<number>{
    return this.http.post<number>(environment.api + environment.backend.postulante + `/login`, user);
  }

  getPostulantes(idConvocatoria: number): Observable<any> {
    return this.http.get(environment.api + environment.backend.convocatoria +  `/${idConvocatoria}/postulantes`);
  }

  obtenerPostulantePorConvocatoria(idConvocatoria: number, idPostulante: number): Observable<PostulanteDto> {
    return this.http.get<PostulanteDto>(`${environment.api}/convocatorias/${idConvocatoria}/postulantes/${idPostulante}`);
  }

  cambiarEstadoPostulante(idConvocatoria: number, idPostulante: number, estado: string): Observable<any> {
    return this.http.put<any>(`${environment.api}/convocatorias/${idConvocatoria}/postulantes/${idPostulante}/estado`, { estado });
  }

  registrarPostulante(postulante: Postulante): Observable<Postulante> {
    return this.http.post<Postulante>(environment.api + environment.backend.postulante, postulante);
  }

  obtenerPostulantePorId(idPostulante: number): Observable<Postulante> {
    return this.http.get<Postulante>(`${environment.api}/postulantes/${idPostulante}`);
  }
  
  actualizarPostulante(idPostulante: number, postulante: Partial<Postulante>): Observable<Postulante> {
    return this.http.patch<Postulante>(`${environment.api}/postulantes/${idPostulante}`, postulante);
  }

  postularse(idPostulante: number, idConvocatoria: number, postulanteConvocatoria: PostulanteConvocatoriaDTO): Observable<boolean> {
    return this.http.post<boolean>(
      `${environment.api}${environment.backend.postulante}/${idPostulante}/postularse/${idConvocatoria}`,
      postulanteConvocatoria
    );
  }

  getConvocatoriaPorId(idConvocatoria: number): Observable<any> {
    return this.http.get(`${environment.api}/convocatorias/${idConvocatoria}`);
  }
}
