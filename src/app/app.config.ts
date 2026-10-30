import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    // Images in public/img/ ship as <name>-640.webp and <name>-1200.webp (hero photo and covers also -960).
    {
      provide: IMAGE_LOADER,
      useValue: ({ src, width }: ImageLoaderConfig) => `img/${src}-${width ?? 1200}.webp`,
    },
  ],
};
