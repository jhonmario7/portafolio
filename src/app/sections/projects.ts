import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { IconHover } from '../shared/icon-hover';
import { ArrowUpRight, Image as ImageIcon } from '@animateicons/angular/lucide';
import { Proyecto, proyectos } from '../data/proyectos';
import { ProjectGallery } from './project-gallery';

@Component({
  selector: 'app-projects',
  imports: [NgOptimizedImage, AnimateIcons, IconHover, ProjectGallery],
  host: { class: 'block' },
  template: `
    <section id="proyectos" aria-labelledby="proyectos-titulo" class="section">
      <p class="eyebrow">// proyectos</p>
      <h2 id="proyectos-titulo" class="section-title">Lo que he construido para clientes</h2>

      <ul class="mt-12 space-y-16 lg:space-y-24">
        @for (proyecto of proyectos; track proyecto.nombre; let odd = $odd) {
          <li>
            <article class="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <!-- The cover also opens the gallery; its accessible name is the alt plus the action. -->
              <button
                type="button"
                class="group block cursor-pointer overflow-hidden rounded-card border border-border transition-colors hover:border-text-muted"
                [class.lg:order-last]="odd"
                (click)="selected.set(proyecto)"
              >
                <img
                  [ngSrc]="proyecto.imagen"
                  ngSrcset="640w, 960w, 1200w"
                  sizes="(min-width: 1024px) 560px, 92vw"
                  width="1200"
                  height="750"
                  [alt]="proyecto.alt"
                  class="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span class="sr-only"> Ver capturas.</span>
              </button>
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
                <div class="mt-8 flex flex-wrap items-center gap-3">
                  @if (proyecto.demo; as demo) {
                    <a appIconHover [href]="demo" target="_blank" rel="noopener" class="btn btn-primary">
                      Ver sitio<span class="sr-only"> de {{ proyecto.nombre }} (abre en otra pestaña)</span>
                      <animate-icons [icon]="icons.arrow" [size]="18" aria-hidden="true" />
                    </a>
                  }
                  <button appIconHover type="button" class="btn btn-secondary cursor-pointer" (click)="selected.set(proyecto)">
                    <animate-icons [icon]="icons.image" [size]="18" aria-hidden="true" />
                    Ver capturas ({{ proyecto.galeria.length }})<span class="sr-only"> de {{ proyecto.nombre }}</span>
                  </button>
                </div>
                @if (proyecto.nota) {
                  <p class="mt-4 text-sm text-text-muted">{{ proyecto.nota }}</p>
                }
              </div>
            </article>
          </li>
        }
      </ul>
      <app-project-gallery [proyecto]="selected()" (closed)="selected.set(null)" />
    </section>
  `,
})
export class Projects {
  protected readonly proyectos = proyectos;
  protected readonly icons = { arrow: ArrowUpRight, image: ImageIcon };
  protected readonly selected = signal<Proyecto | null>(null);
}
