import { Component, inject } from '@angular/core';
import { perfil } from './data/perfil';
import { I18n } from './i18n';
import { BackToTop } from './layout/back-to-top';
import { GlyphField } from './layout/glyph-field';
import { Nav } from './layout/nav';
import { Contact } from './sections/contact';
import { Education } from './sections/education';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero';
import { Projects } from './sections/projects';

// ponytail: one page, so sections render here instead of behind a route. Add pages/ when case studies arrive (Fase 4).
@Component({
  imports: [Nav, GlyphField, BackToTop, Hero, Experience, Projects, Education, Contact],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly i18n = inject(I18n);
  protected readonly name = perfil.nombre;
  // Baked in at prerender; every deploy rebuilds, so it stays current.
  protected readonly year = new Date().getFullYear();
}
