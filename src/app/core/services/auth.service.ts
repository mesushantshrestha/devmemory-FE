import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthMeResponse, AuthUser } from '../models/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/auth`;

  private readonly userSignal = signal<AuthUser | null>(null);
  private readonly statusSignal = signal<'idle' | 'loading' | 'authenticated' | 'loggedOut' | 'error'>('idle');

  readonly user = this.userSignal.asReadonly();
  readonly status = this.statusSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal());

  private toUser(response: AuthMeResponse | null): AuthUser | null {
    if (!response?.loggedIn) {
      return null;
    }

    return {
      id: response.userId,
      name: response.name,
      email: response.email,
      avatarUrl: response.pictureUrl,
    };
  }

  refreshSession(): void {
    this.statusSignal.set('loading');

    this.http
      .get<AuthMeResponse | null>(`${this.baseUrl}/me`, { withCredentials: true })
      .pipe(
        tap((response) => {
          const user = this.toUser(response);
          if (user) {
            this.userSignal.set(user);
            this.statusSignal.set('authenticated');
          } else {
            this.userSignal.set(null);
            this.statusSignal.set('idle');
          }
        }),
        catchError(() => {
          this.userSignal.set(null);
          this.statusSignal.set('error');
          return of(null);
        })
      )
      .subscribe();
  }

  loginWithGoogle(): void {
    this.statusSignal.set('loading');
    window.location.href = `${environment.apiBaseUrl}/oauth2/authorization/google`;
  }

  logout(): void {
    this.statusSignal.set('loading');

    this.http
      .get<void>(`${this.baseUrl}/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.userSignal.set(null);
          this.statusSignal.set('idle');
        }),
        catchError(() => {
          this.statusSignal.set('error');
          return of(void 0);
        })
      )
      .subscribe();
  }

  setLoggedOut(): void {
    this.userSignal.set(null);
    this.statusSignal.set('loggedOut');
  }
}
