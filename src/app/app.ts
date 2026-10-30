import { Component } from '@angular/core';
import { perfil } from './data/perfil';
import { Nav } from './layout/nav';
import { Contact } from './sections/contact';
import { Education } from './sections/education';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero';
import { Projects } from './sections/projects';

// ponytail: one page, so sections render here instead of behind a route. Add pages/ when case studies arrive (Fase 4).
@Component({
  imports: [Nav, Hero, Experience, Projects, Education, Contact],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly name = perfil.nombre;
  // Baked in at prerender; every deploy rebuilds, so it stays current.
  protected readonly year = new Date().getFullYear();
}
