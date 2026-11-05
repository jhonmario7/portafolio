import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { formacion } from '../data/formacion';
import { Lightbox } from '../shared/lightbox';

const horas = formacion.reduce((total, f) => total + (f.horas ?? 0), 0);

@Component({
  selector: 'app-education',
  imports: [NgOptimizedImage, Lightbox],
  host: { class: 'block' },
  template: `
    <section id="formacion" aria-labelledby="formacion-titulo" class="section">
      <p class="eyebrow"><span aria-hidden="true">// </span>formación</p>
      <h2 id="formacion-titulo" class="section-title">La base <span class="text-accent">detrás del código</span></h2>
      <p class="mt-2 text-text-muted">Ingeniería, tecnología y cursos que sigo sumando.</p>

      <dl class="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        @for (s of stats; track s.label) {
          <div class="reveal flex flex-col-reverse rounded-2xl border border-border bg-linear-to-br from-brand/15 to-accent/5 p-5 text-center">
            <dt class="mt-1 text-sm text-text-muted">{{ s.label }}</dt>
            <dd class="font-display text-3xl font-bold text-accent">{{ s.valor }}</dd>
          </div>
        }
      </dl>

      <ul class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        @for (f of formacion; track f.titulo) {
          <li class="reveal">
            <article
              class="flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-5 transition-colors duration-300 hover:border-accent/50 sm:p-6"
            >
              <div class="flex items-center gap-3">
                <!-- Decorative: the institution's name is right next to it. -->
                <img
                  [ngSrc]="f.logo"
                  width="48"
                  height="48"
                  disableOptimizedSrcset
                  alt=""
                  class="size-12 shrink-0 rounded-xl border border-border object-cover"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-left text-sm font-medium text-accent">{{ f.institucion }}</p>
                  <p class="text-left font-mono text-xs text-text-muted">{{ f.periodo }}</p>
                </div>
                <span class="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs text-text-muted">{{ f.tipo }}</span>
              </div>

              <h3 class="mt-4 font-display text-lg font-semibold leading-snug">{{ f.titulo }}</h3>
              <p class="mt-2 flex items-center gap-2 text-left text-sm text-text-muted">
                <span class="size-2 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>{{ f.duracion }}
              </p>

              <h4 class="mt-5 flex items-center justify-between text-sm font-medium">
                Temas clave
                <span class="rounded-full bg-brand/20 px-2 py-0.5 text-xs text-red-200">{{ f.temas.length }}</span>
              </h4>
              <ul class="mt-3 space-y-2">
                @for (tema of f.temas; track tema) {
                  <li class="flex items-start gap-3 rounded-lg bg-surface-2/60 p-2.5 text-sm">
                    <span class="grid size-6 shrink-0 place-items-center rounded-md bg-brand/20 text-accent" aria-hidden="true">
                      <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span class="pt-0.5">{{ tema }}</span>
                  </li>
                }
              </ul>

              <!-- mt-auto pins the actions to the bottom so the cards line up in the grid. -->
              <div class="mt-auto flex flex-wrap items-center gap-2 pt-5">
                <button
                  type="button"
                  class="inline-flex min-h-11 cursor-zoom-in items-center gap-1.5 rounded-full border border-accent/70 px-5 text-sm font-semibold transition-colors hover:border-accent hover:bg-accent/10"
                  (click)="visor.open([{ src: f.certificado, alt: (f.tipo === 'Título' ? 'Título de ' : 'Certificado de ') + f.titulo + ', ' + f.institucion }])"
                >
                  Ver {{ f.tipo === 'Título' ? 'título' : 'certificado' }}
                  <span class="sr-only">: {{ f.titulo }}</span>
                </button>
                @if (f.verificar; as url) {
                  <a
                    [href]="url"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex min-h-11 items-center px-3 text-sm text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
                  >
                    Verificar<span class="sr-only"> {{ f.titulo }} (se abre en otra pestaña)</span>
                  </a>
                }
              </div>
            </article>
          </li>
        }
      </ul>

      <p class="mt-12 flex justify-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-brand/10 px-5 py-2.5 text-sm font-medium text-red-200">
          <span class="size-2 rounded-full bg-accent motion-safe:animate-pulse" aria-hidden="true"></span>
          Aprendizaje continuo desde 2018
        </span>
      </p>

      <app-lightbox #visor />
    </section>
  `,
})
export class Education {
  protected readonly formacion = formacion;
  protected readonly stats = [
    { label: 'Títulos', valor: formacion.filter((f) => f.tipo === 'Título').length },
    { label: 'Certificados', valor: formacion.filter((f) => f.tipo === 'Certificado').length },
    { label: 'Horas certificadas', valor: `+${Math.floor(horas / 10) * 10}` },
    { label: 'Instituciones', valor: new Set(formacion.flatMap((f) => f.institucion.split(' · '))).size },
  ];
}
