import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { casoDestacado, trayectoria } from '../data/experiencia';
import { Lightbox } from '../shared/lightbox';

@Component({
  selector: 'app-experience',
  imports: [NgOptimizedImage, Lightbox],
  host: { class: 'block' },
  template: `
    <section id="experiencia" aria-labelledby="experiencia-titulo" class="section">
      <header class="mb-12">
        <p class="eyebrow"><span aria-hidden="true">// </span>experiencia</p>
        <h2 id="experiencia-titulo" class="section-title">Lo que <span class="text-accent">construyo hoy</span></h2>
        <p class="mt-2 text-text-muted">Frontend Angular para el ERP de MASSEQ, desde 2024.</p>
      </header>

      <article class="group reveal overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-lg">
        <div class="grid lg:min-h-[480px] lg:grid-cols-2">
          <!-- Screenshot as a muted backdrop: grayscale to sit in the red/black palette, color on hover. -->
          <!-- Clicking it opens the full, uncropped screenshot (zoom cursor as the cue). -->
          <button
            type="button"
            class="group/img relative order-2 min-h-[260px] cursor-zoom-in overflow-hidden sm:min-h-[300px] lg:order-1"
            (click)="visor.open([{ src: c.imagen, alt: c.alt }])"
          >
            <img
              [ngSrc]="c.imagen"
              ngSrcset="640w, 960w, 1200w"
              sizes="(min-width: 1024px) 50vw, 100vw"
              fill
              [alt]="c.alt"
              class="object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover/img:scale-[1.03]"
            />
            <span class="absolute inset-0 bg-linear-to-r from-bg/90 via-bg/60 to-bg/30" aria-hidden="true"></span>
            <span class="sr-only"> Ver en grande.</span>
          </button>

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

      <p class="eyebrow mt-20"><span aria-hidden="true">// </span>trayectoria</p>
      <h3 class="mt-2 font-display text-2xl font-semibold sm:text-3xl">Cómo <span class="text-accent">llegué hasta aquí</span></h3>
      <p class="mt-2 text-text-muted">De maquetar pantallas a desarrollar módulos de un ERP, rol por rol.</p>
      <!--
        Timeline: a glowing dot per role, each role in its own card. Every role but the last draws a
        segment from its dot (center 39px down) to the next dot (gap 1.5rem + 39px), so the rail
        starts and ends at a dot.
      -->
      <ol class="mt-8 space-y-6">
        @for (item of trayectoria; track item.rol; let i = $index) {
          @let open = abiertos().has(i);
          <li
            class="reveal relative pl-7 sm:pl-10
              before:absolute before:left-[7px] before:top-[39px] before:bottom-[calc(-1.5rem-39px)] before:w-px before:bg-border last:before:hidden"
          >
            <span
              class="absolute left-0 top-8 size-[15px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_rgb(255_107_107/0.15)]"
              aria-hidden="true"
            ></span>
            <article class="rounded-2xl border border-border bg-surface/80 p-5 sm:p-8">
              <!--
                Desktop: left = logo, title, company and summary; right = date pill with "Ver detalles"
                under it. Phones stack: date, title, summary, button.
              -->
              <div class="grid gap-x-8 gap-y-3 sm:grid-cols-[1fr_auto]">
                <div class="flex min-w-0 items-center gap-4 sm:col-start-1 sm:row-start-1">
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
                <p class="order-first w-fit rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted sm:order-none sm:col-start-2 sm:row-start-1 sm:self-start sm:justify-self-end">
                  {{ item.periodo }}
                </p>

                <p class="max-w-3xl leading-relaxed text-text-muted sm:col-start-1 sm:row-start-2 sm:mt-1">{{ item.resumen }}</p>

                <button
                  type="button"
                  class="inline-flex min-h-11 w-fit cursor-pointer items-center gap-1.5 rounded-full border border-accent/70 px-5 text-sm font-semibold transition-colors
                    hover:border-accent hover:bg-accent/10 sm:col-start-2 sm:row-start-2 sm:self-start sm:justify-self-end"
                  [attr.aria-expanded]="open"
                  [attr.aria-controls]="'detalles-' + i"
                  (click)="toggle(i)"
                >
                  {{ open ? 'Ocultar detalles' : 'Ver detalles' }}
                  <svg class="size-4 transition-transform duration-300" [class.rotate-180]="open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>

              <!--
                Details: a divider, then the achievements in two titled groups. The outer grid animates
                its row from 0fr to 1fr (height: auto can't transition); inert keeps closed content out
                of the tab order and the accessibility tree.
              -->
              <div
                [id]="'detalles-' + i"
                class="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                [class]="open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
                [attr.inert]="open ? null : ''"
              >
              <div class="overflow-hidden">
              <div class="mt-6 grid gap-4 border-t border-border pt-6 md:grid-cols-2">
                @for (grupo of item.detalles; track grupo.titulo) {
                  <div class="rounded-xl border border-border bg-surface-2/60 p-5 sm:p-6">
                    <h5 class="font-display text-lg font-semibold">{{ grupo.titulo }}</h5>
                    <p class="mt-1 leading-relaxed text-text-muted">{{ grupo.descripcion }}</p>
                    <ul class="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
                      @for (punto of grupo.puntos; track $index) {
                        <li class="flex gap-3">
                          <span class="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
                          <span class="text-justify hyphens-auto">{{ punto }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>
              </div>
              </div>
            </article>
          </li>
        }
      </ol>
      <app-lightbox #visor />
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
