import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imagen } from '../modelos/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http:HttpClient) {}

  subirImagen (Image: any): Observable<string> { 
    return this.http.post<string>(environment.api + environment.backend.imagen, Image, {
      responseType: 'text' as 'json' 
    });
  }


  obtenerImagen (nameImage: string) : Observable<any> {
    return this.http.get(environment.api + environment.backend.imagen + /obtener-imagen/${nameImage}, 
      {responseType: 'blob'}
    );
  }
}