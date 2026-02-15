import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CAPTURE_REPOSITORY } from './core/repositories/capture.repository';
import { LocalCaptureRepository } from './core/repositories/local-capture.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    // Repository binding (swap this later to ApiCaptureRepository)
    { provide: CAPTURE_REPOSITORY, useClass: LocalCaptureRepository },
  ]
};
