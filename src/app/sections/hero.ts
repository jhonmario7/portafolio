import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { Download, Github, Linkedin, Mail } from '@animateicons/angular/lucide';
import { perfil } from '../data/perfil';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, AnimateIcons],
  host: { class: 'block' },
  template: `
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      class="section grid items-center gap-12 lg:min-h-dvh lg:grid-cols-[1.2fr_1fr] lg:gap-16"
    >
      <div>
        <p class="eyebrow">Hola, soy {{ p.nombreCorto }} · {{ p.rol }}</p>
        <h1 id="inicio-titulo" class="mt-4 text-4xl font-bold leading-tight sm:text-5xl xl:text-6xl">
          Interfaces Angular <span class="text-accent">rápidas, accesibles</span> y listas para producción.
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
          Soy desarrollador frontend en {{ p.ubicacion }}. Construyo módulos de un ERP empresarial y
          landings para clientes que cargan en segundos y que cualquier persona puede usar.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#contacto" class="btn btn-primary">
            <animate-icons [icon]="icons.mail" [size]="18" aria-hidden="true" />
            Contactar
          </a>
          <a [href]="p.cv" download class="btn btn-secondary">
            <animate-icons [icon]="icons.download" [size]="18" aria-hidden="true" />
            Descargar CV
          </a>
        </div>
        <ul class="mt-6 flex gap-5 text-sm">
          <li>
            <a [href]="p.linkedin" rel="me noopener" target="_blank" class="inline-flex min-h-11 items-center gap-2 text-text-muted hover:text-text">
              <animate-icons [icon]="icons.linkedin" [size]="18" aria-hidden="true" />
              LinkedIn<span class="sr-only"> (abre en otra pestaña)</span>
            </a>
          </li>
          <li>
            <a [href]="p.github" rel="me noopener" target="_blank" class="inline-flex min-h-11 items-center gap-2 text-text-muted hover:text-text">
              <animate-icons [icon]="icons.github" [size]="18" aria-hidden="true" />
              GitHub<span class="sr-only"> (abre en otra pestaña)</span>
            </a>
          </li>
        </ul>

        <dl class="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          @for (m of p.metricas; track m.valor) {
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-sm text-text-muted">{{ m.etiqueta }}</dt>
              <dd class="font-display text-2xl font-bold">{{ m.valor }}</dd>
            </div>
          }
        </dl>
      </div>

      <div class="relative mx-auto w-full max-w-sm lg:mr-0">
        <img
          ngSrc="jhon"
          ngSrcset="640w, 1200w"
          sizes="(min-width: 640px) 384px, 90vw"
          width="640"
          height="800"
          priority
          alt="Jhon Mario Rodriguez sonriendo, con camisa clara, en un jardín de noche."
          class="rounded-card border border-border object-cover"
        />
        <p class="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg/85 px-3 py-1.5 text-xs font-medium backdrop-blur">
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span class="relative inline-flex size-2 rounded-full bg-accent"></span>
          </span>
          Disponible para trabajar
        </p>

        <!-- Code card: on large screens it overlaps the photo, on phones it stacks below. -->
        <figure class="mt-4 overflow-hidden rounded-card border border-border bg-surface/95 shadow-2xl backdrop-blur lg:absolute lg:-bottom-10 lg:-left-10 lg:mt-0 lg:w-80">
          <figcaption class="flex items-center gap-2 border-b border-border px-4 py-2.5 font-mono text-xs text-text-muted">
            <span class="flex gap-1.5" aria-hidden="true">
              <span class="size-2.5 rounded-full bg-border"></span>
              <span class="size-2.5 rounded-full bg-border"></span>
              <span class="size-2.5 rounded-full bg-brand"></span>
            </span>
            perfil.ts
          </figcaption>
          <pre class="whitespace-pre-wrap p-4 font-mono text-[0.8rem] leading-relaxed"><code><span class="text-accent">const</span> perfil = {{ '{' }}
  nombre: <span class="text-amber-200">'{{ p.nombre }}'</span>,
  rol: <span class="text-amber-200">'{{ p.rol }}'</span>,
  stack: [{{ quoted(p.stack) }}],
  enfoque: [{{ quoted(p.enfoque) }}],
{{ '}' }};</code></pre>
        </figure>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly p = perfil;
  protected readonly icons = { mail: Mail, download: Download, linkedin: Linkedin, github: Github };

  protected quoted(list: string[]): string {
    return list.map((item) => `'${item}'`).join(', ');
  }
}
