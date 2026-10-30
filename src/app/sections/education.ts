import { Component } from '@angular/core';
import { cursos, formacion } from '../data/formacion';

@Component({
  selector: 'app-education',
  host: { class: 'block' },
  template: `
    <section id="formacion" aria-labelledby="formacion-titulo" class="section">
      <p class="eyebrow">// formación</p>
      <h2 id="formacion-titulo" class="section-title">Formación</h2>

      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h3 class="font-display text-lg font-semibold">Académica</h3>
          <ul class="mt-4 space-y-3">
            @for (item of formacion; track item.titulo) {
              <li class="rounded-card border border-border bg-surface/80 p-5">
                <p class="font-semibold">{{ item.titulo }}</p>
                <p class="mt-1 text-sm text-text-muted">{{ item.lugar }} · <span class="font-mono">{{ item.periodo }}</span></p>
              </li>
            }
          </ul>
        </div>
        <div>
          <h3 class="font-display text-lg font-semibold">Cursos</h3>
          <ul class="mt-4 space-y-3">
            @for (item of cursos; track item.titulo) {
              <li class="rounded-card border border-border bg-surface/80 p-5">
                <p class="font-semibold">{{ item.titulo }}</p>
                <p class="mt-1 text-sm text-text-muted">{{ item.lugar }} · <span class="font-mono">{{ item.periodo }}</span></p>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class Education {
  protected readonly formacion = formacion;
  protected readonly cursos = cursos;
}
