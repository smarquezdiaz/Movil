import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host: String = "http://localhost:8081";

  constructor(private http: HttpClient) { }

  getUser () {
    return this.http.get(this.host+"users");
  }
}
