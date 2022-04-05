import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  readonly tokenKey = "token";

  constructor(@Inject(Window) private window: Window) { }

  setToken(token: string): void {
    this.window.sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(this.tokenKey);
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(this.tokenKey);
  }
}
