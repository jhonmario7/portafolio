import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
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

      <h3 class="mt-20 font-display text-2xl font-semibold">Trayectoria</h3>
      <!-- Timeline: a rail with a glowing dot per role, each role in its own card. -->
      <ol class="relative mt-8 space-y-6 before:absolute before:inset-y-2 before:left-[7px] before:w-px before:bg-border">
        @for (item of trayectoria; track item.rol; let i = $index) {
          @let open = abiertos().has(i);
          <li class="reveal relative pl-7 sm:pl-10">
            <span
              class="absolute left-0 top-8 size-[15px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_rgb(255_107_107/0.15)]"
              aria-hidden="true"
            ></span>
            <article class="rounded-2xl border border-border bg-surface/80 p-5 sm:p-8">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div class="flex min-w-0 items-center gap-4">
                  <!-- Decorative: the company name is right next to it. -->
                  <img
                    [ngSrc]="item.logo"
                    width="56"
                    height="56"
                    disableOptimizedSrcset
                    alt=""
                    class="size-12 shrink-0 rounded-xl border border-border object-cover sm:size-14"
                  />
                  <div class="min-w-0">
                    <h4 class="font-display text-xl font-semibold sm:text-2xl">{{ item.rol }}</h4>
                    <p class="mt-1 text-left text-accent">{{ item.lugar }}</p>
                  </div>
                </div>
                <p class="order-first w-fit shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted sm:order-none">
                  {{ item.periodo }}
                </p>
              </div>

              <p class="mt-4 max-w-3xl leading-relaxed text-text-muted">{{ item.resumen }}</p>

              <button
                type="button"
                class="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors hover:bg-surface-2 -ml-4"
                [attr.aria-expanded]="open"
                [attr.aria-controls]="'detalles-' + i"
                (click)="toggle(i)"
              >
                {{ open ? 'Ocultar detalles' : 'Ver detalles' }}
                <svg class="size-4 transition-transform duration-300" [class.rotate-180]="open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <ul [id]="'detalles-' + i" class="space-y-2 text-sm leading-relaxed text-text-muted" [class.mt-3]="open" [hidden]="!open">
                @for (detalle of item.detalles; track $index) {
                  <li class="flex gap-3">
                    <span class="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
                    <span class="text-justify hyphens-auto">{{ detalle }}</span>
                  </li>
                }
              </ul>
            </article>
          </li>
        }
      </ol>
    </section>
  `,
})
export class Experience {
  protected readonly c = casoDestacado;
  protected readonly trayectoria = trayectoria;
  protected readonly abiertos = signal(new Set<number>());

  protected toggle(i: number): void {
    this.abiertos.update((set) => {
      const next = new Set(set);
      if (!next.delete(i)) next.add(i);
      return next;
    });
  }
}
