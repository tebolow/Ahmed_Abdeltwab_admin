import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'cms_admin_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseURL = environment.apiUrl;

  isAuthenticated = signal<boolean>(!!this.getToken());

  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  login(key: string, password: string) {
    return this.http
      .post<{ msg: string; token: string; key: string }>(`${this.baseURL}/auth/login`, {
        key,
        password
      })
      .pipe(
        tap((res) => {
          if (res?.token) {
            try {
              localStorage.setItem(TOKEN_KEY, res.token);
            } catch {}
            this.isAuthenticated.set(true);
          }
        })
      );
  }

  logout(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}

