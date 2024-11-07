import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken'; 

  constructor() { }

  setTokenInLocalStorage(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  
  removeTokenFromLocalStorage(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setTokenInCookies(token: string): void {
    document.cookie = `${this.tokenKey}=${token}; path=/;`;
  }

  getTokenFromCookies(): string | null {
    const name = `${this.tokenKey}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let cookie of cookieArray) {
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }
  removeTokenFromCookies(): void {
    document.cookie = `${this.tokenKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}
