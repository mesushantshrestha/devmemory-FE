import { Injectable, signal } from '@angular/core';

export type ApiErrorToast = {
  id: string;
  timestamp?: string;
  status?: number;
  error?: string;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class ErrorToastService {
  private readonly _toasts = signal<ApiErrorToast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(toast: Omit<ApiErrorToast, 'id'>, durationMs = 5000): void {
    const id = crypto.randomUUID();
    const nextToast: ApiErrorToast = { id, ...toast };
    this._toasts.update((current) => [...current, nextToast]);

    setTimeout(() => {
      this.dismiss(id);
    }, durationMs);
  }

  dismiss(id: string): void {
    this._toasts.update((current) => current.filter((toast) => toast.id !== id));
  }
}
