import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../modelos/email';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(email: Email): Observable<string> {
    const url = `${environment.api}${environment.backend.email}/updateEmail`;
    return this.http.patch<string>(url, email);
  }
}
