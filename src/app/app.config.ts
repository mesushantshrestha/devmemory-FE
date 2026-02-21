import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CAPTURE_REPOSITORY } from './core/repositories/capture.repository';
import { LocalCaptureRepository } from './core/repositories/local-capture.repository';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiErrorInterceptor } from './core/interceptors/api-error.interceptor';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([credentialsInterceptor, apiErrorInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // Repository binding (swap this later to ApiCaptureRepository)
    { provide: CAPTURE_REPOSITORY, useClass: LocalCaptureRepository }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ]
};
