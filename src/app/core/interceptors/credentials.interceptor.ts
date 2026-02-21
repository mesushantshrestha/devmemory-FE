import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.withCredentials) {
    return next(req);
  }

  return next(req.clone({ withCredentials: true }));
};
