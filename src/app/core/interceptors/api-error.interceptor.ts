import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorToastService } from '../services/error-toast.service';

type ApiErrorResponse = {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
};

function parseErrorBody(error: unknown): ApiErrorResponse {
  if (typeof error === 'string') {
    try {
      return JSON.parse(error) as ApiErrorResponse;
    } catch {
      return { message: error };
    }
  }

  if (error && typeof error === 'object') {
    return error as ApiErrorResponse;
  }

  return {};
}

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ErrorToastService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const body = parseErrorBody(error.error);

        const status = body.status ?? error.status;
        const errorText = body.error ?? (status ? `HTTP ${status}` : 'Request Error');
        const message = body.message ?? error.message ?? 'Something went wrong.';

        toast.show({
          timestamp: body.timestamp,
          status,
          error: errorText,
          message,
        });
      }

      return throwError(() => error);
    })
  );
};
