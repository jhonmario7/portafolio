import { Component } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { Github, Globe } from '@animateicons/angular/lucide';
import { proyectos } from '../data/proyectos';
import { Lightbox } from '../shared/lightbox';
import { IconHover } from '../shared/icon-hover';
import { ProjectCarousel } from './project-carousel';

@Component({
  selector: 'app-projects',
  imports: [AnimateIcons, IconHover, ProjectCarousel, Lightbox],
  host: { class: 'block' },
  template: `
    <section id="proyectos" aria-labelledby="proyectos-titulo" class="section">
      <p class="eyebrow"><span aria-hidden="true">// </span>proyectos</p>
      <h2 id="proyectos-titulo" class="section-title">Lo que he construido <span class="text-accent">para clientes</span></h2>
      <p class="mt-2 text-text-muted">Sitios y paneles reales, publicados y en uso.</p>

      <!-- Zigzag like the reference: screenshots carousel on one side, the story on the other. -->
      <ul class="mt-12 space-y-16 lg:space-y-24">
        @for (proyecto of proyectos; track proyecto.nombre; let odd = $odd) {
          <li>
            <article class="reveal grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <app-project-carousel
                [proyecto]="proyecto"
                [class.lg:order-last]="odd"
                (ampliar)="visor.open({ src: proyecto.imagen + '-' + ($event + 1), alt: proyecto.capturas[$event] })"
              />

              <div class="min-w-0">
                <h3 class="text-2xl font-bold leading-snug">{{ proyecto.nombre }}</h3>
                <p class="mt-4 leading-relaxed text-text-muted">{{ proyecto.descripcion }}</p>

                <ul class="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
                  @for (tech of proyecto.stack; track tech) {
                    <li class="rounded-full bg-surface-2 px-3 py-1 text-sm text-text-muted transition-colors hover:bg-brand hover:text-on-brand">
                      {{ tech }}
                    </li>
                  }
                </ul>

                @if (proyecto.demo || proyecto.codigo) {
                  <div class="mt-6 flex flex-wrap items-center gap-3">
                    @if (proyecto.demo; as demo) {
                      <a appIconHover [href]="demo" target="_blank" rel="noopener" class="btn btn-primary rounded-lg">
                        <animate-icons [icon]="icons.globe" [size]="18" aria-hidden="true" />
                        Ver sitio<span class="sr-only"> de {{ proyecto.nombre }} (abre en otra pestaña)</span>
                      </a>
                    }
                    @if (proyecto.codigo; as codigo) {
                      <a appIconHover [href]="codigo" target="_blank" rel="noopener" class="btn btn-secondary rounded-lg">
                        <animate-icons [icon]="icons.github" [size]="18" aria-hidden="true" />
                        Código<span class="sr-only"> de {{ proyecto.nombre }} (abre en otra pestaña)</span>
                      </a>
                    }
                  </div>
                } @else if (proyecto.nota) {
                  <p class="mt-6 text-sm text-text-muted">{{ proyecto.nota }}</p>
                }
              </div>
            </article>
          </li>
        }
      </ul>
      <app-lightbox #visor />
    </section>
  `,
})
export class Projects {
  protected readonly proyectos = proyectos;
  protected readonly icons = { globe: Globe, github: Github };
}
