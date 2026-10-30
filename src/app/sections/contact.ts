import { Component, signal } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { Copy, CopyCheck, Download, Linkedin, Mail } from '@animateicons/angular/lucide';
import { perfil } from '../data/perfil';

@Component({
  selector: 'app-contact',
  imports: [AnimateIcons],
  host: { class: 'block' },
  template: `
    <section id="contacto" aria-labelledby="contacto-titulo" class="section">
      <div class="rounded-card border border-border bg-surface/80 p-6 text-center sm:p-12">
        <p class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-text-muted">
          <span class="size-2 rounded-full bg-accent" aria-hidden="true"></span>
          {{ p.disponibilidad }}
        </p>
        <h2 id="contacto-titulo" class="section-title mx-auto max-w-2xl">¿Construimos algo juntos?</h2>
        <p class="mx-auto mt-4 max-w-xl text-text-muted">
          Busco un equipo remoto donde aportar con Angular, y también tomo landings y paneles como
          freelance. Escríbeme por correo o LinkedIn.
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a [href]="'mailto:' + p.email" class="btn btn-primary">
            <animate-icons [icon]="icons.mail" [size]="18" aria-hidden="true" />
            Escribirme
          </a>
          <button type="button" class="btn btn-secondary cursor-pointer font-mono text-sm" (click)="copyEmail()">
            <animate-icons [icon]="copy() === 'copied' ? icons.copyCheck : icons.copy" [size]="18" aria-hidden="true" />
            {{ p.email }}
            <span class="sr-only">, copiar correo</span>
          </button>
        </div>
        <!-- Announced to screen readers; visible so sighted users get the same confirmation. -->
        <p class="mt-3 min-h-5 text-sm" [class]="copy() === 'failed' ? 'text-alert' : 'text-accent'" aria-live="polite">
          @switch (copy()) {
            @case ('copied') { Correo copiado }
            @case ('failed') { No se pudo copiar; el correo es {{ p.email }} }
          }
        </p>

        <ul class="mt-6 flex flex-wrap justify-center gap-6 text-sm">
          <li>
            <a [href]="p.linkedin" target="_blank" rel="me noopener" class="inline-flex min-h-11 items-center gap-2 text-text-muted hover:text-text">
              <animate-icons [icon]="icons.linkedin" [size]="18" aria-hidden="true" />
              LinkedIn<span class="sr-only"> (abre en otra pestaña)</span>
            </a>
          </li>
          <li>
            <a [href]="p.cv" download class="inline-flex min-h-11 items-center gap-2 text-text-muted hover:text-text">
              <animate-icons [icon]="icons.download" [size]="18" aria-hidden="true" />
              Descargar CV (PDF)
            </a>
          </li>
        </ul>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly p = perfil;
  protected readonly icons = { mail: Mail, copy: Copy, copyCheck: CopyCheck, linkedin: Linkedin, download: Download };
  protected readonly copy = signal<'idle' | 'copied' | 'failed'>('idle');

  protected async copyEmail(): Promise<void> {
    try {
      // Rejects when the browser denies clipboard access (permissions, embedded webviews).
      await navigator.clipboard.writeText(this.p.email);
      this.copy.set('copied');
      setTimeout(() => this.copy.set('idle'), 2500);
    } catch {
      this.copy.set('failed');
    }
  }
}
