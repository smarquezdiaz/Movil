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

  getPostulantes(idConvocatoria: number): Observable<any> {
    return this.http.get(environment.api + environment.backend.convocatoria +  `/${idConvocatoria}/postulantes`);
  }
}
