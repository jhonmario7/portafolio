import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { ArrowUpRight } from '@animateicons/angular/lucide';
import { proyectos } from '../data/proyectos';

@Component({
  selector: 'app-projects',
  imports: [NgOptimizedImage, AnimateIcons],
  host: { class: 'block' },
  template: `
    <section id="proyectos" aria-labelledby="proyectos-titulo" class="section">
      <p class="eyebrow">// proyectos</p>
      <h2 id="proyectos-titulo" class="section-title">Lo que he construido para clientes</h2>

      <ul class="mt-12 space-y-16 lg:space-y-24">
        @for (proyecto of proyectos; track proyecto.nombre; let odd = $odd) {
          <li>
            <article class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <img
                [ngSrc]="proyecto.imagen"
                ngSrcset="640w, 1200w"
                sizes="(min-width: 1024px) 560px, 92vw"
                width="1200"
                height="750"
                [alt]="proyecto.alt"
                class="rounded-card border border-border"
                [class.lg:order-last]="odd"
              />
              <div>
                <p class="font-mono text-sm text-text-muted">{{ proyecto.tipo }}</p>
                <h3 class="mt-2 text-2xl font-bold sm:text-3xl">{{ proyecto.nombre }}</h3>
                <p class="mt-4 leading-relaxed text-text-muted">{{ proyecto.descripcion }}</p>
                <ul class="mt-6 space-y-2">
                  @for (logro of proyecto.logros; track logro) {
                    <li class="flex gap-3">
                      <span class="text-accent" aria-hidden="true">→</span>
                      {{ logro }}
                    </li>
                  }
                </ul>
                <ul class="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
                  @for (tech of proyecto.stack; track tech) {
                    <li class="chip">{{ tech }}</li>
                  }
                </ul>
                @if (proyecto.demo; as demo) {
                  <a [href]="demo" target="_blank" rel="noopener" class="btn btn-secondary mt-8">
                    Ver sitio<span class="sr-only"> de {{ proyecto.nombre }} (abre en otra pestaña)</span>
                    <animate-icons [icon]="arrow" [size]="18" aria-hidden="true" />
                  </a>
                } @else if (proyecto.nota) {
                  <p class="mt-8 text-sm text-text-muted">{{ proyecto.nota }}</p>
                }
              </div>
            </article>
          </li>
        }
      </ul>
    </section>
  `,
})
export class Projects {
  protected readonly proyectos = proyectos;
  protected readonly arrow = ArrowUpRight;
}
