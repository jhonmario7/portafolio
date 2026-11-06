import { Routes } from '@angular/router';

// No router outlet: the routes only tell the prerenderer to emit one page per language.
export const routes: Routes = [
  { path: '', children: [] },
  { path: 'es', children: [] },
  { path: '**', redirectTo: '' },
];
