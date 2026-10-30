import { Component } from '@angular/core';
import { casoDestacado } from '../data/experiencia';

@Component({
  selector: 'app-experience',
  host: { class: 'block' },
  template: `
    <section id="experiencia" aria-labelledby="experiencia-titulo" class="section">
      <p class="eyebrow">// experiencia</p>
      <h2 id="experiencia-titulo" class="section-title">Dónde trabajo hoy</h2>

      <article class="mt-10 grid gap-8 rounded-card border border-border bg-surface/80 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <header>
          <p class="inline-flex rounded-full bg-brand px-3 py-1 text-xs font-semibold text-on-brand">Caso destacado</p>
          <h3 class="mt-4 text-2xl font-bold">{{ c.producto }}</h3>
          <p class="mt-2 text-text-muted">{{ c.rol }} · {{ c.empresa }}</p>
          <p class="mt-1 font-mono text-sm text-text-muted">{{ c.periodo }}</p>
          <p class="mt-6 leading-relaxed">{{ c.contexto }}</p>
          <ul class="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
            @for (tech of c.stack; track tech) {
              <li class="chip">{{ tech }}</li>
            }
          </ul>
        </header>

        <div>
          <h4 class="font-display text-lg font-semibold">Qué construí</h4>
          <ul class="mt-4 space-y-4">
            @for (aporte of c.aportes; track $index) {
              <li class="flex gap-3 leading-relaxed text-text-muted">
                <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
                {{ aporte }}
              </li>
            }
          </ul>
        </div>
      </article>
    </section>
  `,
})
export class Experience {
  protected readonly c = casoDestacado;
}
