import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  router = inject(Router);

  constructor() { }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    const user = localStorage.getItem(key);
    return user ? JSON.parse(user) : null ;
  }

  deleteLocalStorage(key: string) {
    return localStorage.removeItem(key);
  }
}
