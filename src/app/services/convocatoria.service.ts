import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convocatoria } from '../modelos/convocatoria';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  constructor( private http: HttpClient) { }

  crearConvocatoria(convocatoria: Convocatoria) : Observable<Convocatoria> {
    return this.http.post<Convocatoria>(environment.api + environment.backend.convocatoria, convocatoria);
  }
}
