import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convocatoria, ConvocatoriaForTableDTO, ConvocatoriaParaMostrar, ConvocatoriaParaPostulantes } from '../modelos/convocatoria';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostulanteDto } from '../modelos/postulante';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  constructor( private http: HttpClient) { }

  crearConvocatoria(convocatoria: Convocatoria) : Observable<Convocatoria> {
    return this.http.post<Convocatoria>(environment.api + environment.backend.convocatoria, convocatoria);
  }

  obtenerConvocatoria(id: number) : Observable<ConvocatoriaForTableDTO> {
    return this.http.get<ConvocatoriaForTableDTO>(environment.api + environment.backend.convocatoria + `/${id}`);
  }

  obtenerConvocatorias() : Observable<Array<ConvocatoriaParaPostulantes>> {
    return this.http.get<Array<ConvocatoriaParaPostulantes>>(environment.api + environment.backend.convocatoria);
  }

  obtenerConvocatoriaParaPostulante(id: number) : Observable<ConvocatoriaParaPostulantes> {
    return this.http.get<ConvocatoriaParaPostulantes>(environment.api + environment.backend.convocatoria + `/postulante/${id}`);
  }

  obtenerConvocatoriasPorPostulante(idPostulante: number): Observable<ConvocatoriaParaPostulantes[]> {
    return this.http.get<ConvocatoriaParaPostulantes[]>(`${environment.api}/postulantes/${idPostulante}/all-convocatorias`);
  }
}