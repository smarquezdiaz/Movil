import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  getPostulantes(idConvocatoria: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/convocatorias/${idConvocatoria}/postulantes`);
  }
}
