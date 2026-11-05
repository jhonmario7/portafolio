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
    // Images in public/img/ ship as <name>-640.webp and <name>-1200.webp (some also -960).
    // A src with an extension (e.g. logos/masseq.webp) is a single file served as is.
    {
      provide: IMAGE_LOADER,
      useValue: ({ src, width }: ImageLoaderConfig) =>
        src.includes('.') ? src : `img/${src}-${width ?? 1200}.webp`,
    },
  ],
};
