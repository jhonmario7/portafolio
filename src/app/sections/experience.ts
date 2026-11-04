import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { casoDestacado, trayectoria } from '../data/experiencia';

@Component({
  selector: 'app-experience',
  imports: [NgOptimizedImage],
  host: { class: 'block' },
  template: `
    <section id="experiencia" aria-labelledby="experiencia-titulo" class="section">
      <header class="mb-12 text-center">
        <h2 id="experiencia-titulo" class="text-3xl font-bold sm:text-4xl">
          <span class="text-accent">Experiencia</span> laboral
        </h2>
        <p class="mt-2 text-center text-sm text-text-muted">Caso destacado · Empresa</p>
      </header>

      <article class="group reveal overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-lg">
        <div class="grid lg:min-h-[480px] lg:grid-cols-2">
          <!-- Screenshot as a muted backdrop: grayscale to sit in the red/black palette, color on hover. -->
          <div class="relative order-2 min-h-[260px] sm:min-h-[300px] lg:order-1">
            <img
              [ngSrc]="c.imagen"
              ngSrcset="640w, 960w, 1200w"
              sizes="(min-width: 1024px) 50vw, 100vw"
              fill
              [alt]="c.alt"
              class="object-cover grayscale transition duration-700 group-hover:grayscale-0"
            />
            <div class="absolute inset-0 bg-linear-to-r from-bg/90 via-bg/60 to-bg/30" aria-hidden="true"></div>
          </div>

          <div class="order-1 flex flex-col justify-center p-6 sm:p-10 lg:order-2 lg:p-14">
            <div class="max-w-[65ch] space-y-6">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="min-w-0 flex-1">
                  <h3 class="text-lg font-semibold md:text-xl">{{ c.titulo }}</h3>
                  <p class="mt-1 font-mono text-xs text-text-muted">{{ c.periodo }}</p>
                </div>
                <img
                  [ngSrc]="c.logo"
                  width="234"
                  height="96"
                  disableOptimizedSrcset
                  [alt]="c.logoAlt"
                  class="h-9 w-auto shrink-0 object-contain md:h-10"
                />
              </div>

              <dl class="space-y-1.5 border-b border-border pb-4 text-xs">
                @for (dato of c.datos; track dato.etiqueta) {
                  <div class="flex gap-2">
                    <dt class="shrink-0 font-medium uppercase tracking-wider text-text-muted">{{ dato.etiqueta }}:</dt>
                    <dd>{{ dato.valor }}</dd>
                  </div>
                }
              </dl>

              <ul class="space-y-2 text-sm leading-relaxed text-text-muted">
                @for (aporte of c.aportes; track $index) {
                  <li class="flex gap-3">
                    <span class="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
                    <span class="text-justify hyphens-auto [&_b]:font-medium [&_b]:text-red-300" [innerHTML]="aporte"></span>
                  </li>
                }
              </ul>

              <ul class="flex flex-wrap gap-2 border-t border-border pt-5" aria-label="Tecnologías">
                @for (tech of c.stack; track tech) {
                  <li
                    class="rounded-md border border-border bg-surface-2/60 px-2 py-1 font-mono text-xs text-text-muted transition duration-300
                      hover:border-brand/50 hover:text-red-200 hover:shadow-[0_0_14px_-2px_rgb(220_38_38/0.35)]"
                  >
                    {{ tech }}
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </article>

      <h3 class="mt-16 font-display text-xl font-semibold">Trayectoria</h3>
      <ol class="mt-6 border-l border-border">
        @for (item of trayectoria; track item.rol) {
          <li class="reveal relative pb-8 pl-6 last:pb-0">
            <span class="absolute -left-[5px] top-2 size-2.5 rounded-full border-2 border-bg bg-accent" aria-hidden="true"></span>
            <p class="font-mono text-sm text-text-muted">{{ item.periodo }}</p>
            <h4 class="mt-1 font-semibold">{{ item.rol }} <span class="font-normal text-text-muted">· {{ item.lugar }}</span></h4>
            <p class="mt-1 max-w-2xl text-text-muted">{{ item.resumen }}</p>
          </li>
        }
      </ol>
    </section>
  `,
})
export class Experience {
  protected readonly c = casoDestacado;
  protected readonly trayectoria = trayectoria;
}
