import { Component } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { Github, Globe } from '@animateicons/angular/lucide';
import { Proyecto, proyectos } from '../data/proyectos';
import { Captura, Lightbox } from '../shared/lightbox';
import { IconHover } from '../shared/icon-hover';
import { DeviceMockup } from './device-mockup';

@Component({
  selector: 'app-projects',
  imports: [AnimateIcons, IconHover, DeviceMockup, Lightbox],
  host: { class: 'block' },
  template: `
    <section id="proyectos" aria-labelledby="proyectos-titulo" class="section">
      <p class="eyebrow"><span aria-hidden="true">// </span>proyectos</p>
      <h2 id="proyectos-titulo" class="section-title">Lo que he construido <span class="text-accent">para clientes</span></h2>
      <p class="mt-2 text-text-muted">Sitios y paneles reales, publicados y en uso.</p>

      <!-- Zigzag like the reference: device mockup on one side, the story on the other. -->
      <ul class="mt-12 space-y-16 lg:space-y-24">
        @for (proyecto of proyectos; track proyecto.nombre; let odd = $odd) {
          <li>
            <article class="reveal grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <!-- Cover: laptop + phone mockup; clicking it opens every screenshot full size. -->
              <button
                type="button"
                class="block w-full cursor-zoom-in rounded-card"
                [class.lg:order-last]="odd"
                (click)="visor.open(capturas(proyecto))"
              >
                <app-device-mockup [proyecto]="proyecto" [invertido]="odd" />
                <span class="sr-only">Ver capturas de {{ proyecto.nombre }}</span>
              </button>

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

  /** Desktop screenshots in order, then the phone one. */
  protected capturas(p: Proyecto): Captura[] {
    return [
      ...p.capturas.map((alt, i) => ({ src: `${p.imagen}-${i + 1}`, alt })),
      { src: `${p.imagen}-movil`, alt: p.movil },
    ];
  }
}
