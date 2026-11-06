import { Component, inject, signal } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { IconHover } from '../shared/icon-hover';
import { Copy, CopyCheck, Download, Github, Linkedin, Mail } from '@animateicons/angular/lucide';
import { perfil } from '../data/perfil';
import { I18n } from '../i18n';

const textos = {
  es: {
    titulo: 'Trabajemos juntos',
    intro: 'Busco un equipo remoto donde aportar con Angular, y también tomo landings y paneles como freelance.',
    correo: 'Enviar correo',
    copiar: 'Copiar correo',
    copiado: 'Correo copiado',
    fallo: 'No se pudo copiar; el correo es',
    cv: 'Descargar CV',
    cvSub: 'Perfil profesional completo en PDF',
    nuevaPestana: ' (abre en otra pestaña)',
  },
  en: {
    titulo: "Let's work together",
    intro: "I'm looking for a remote team where I can contribute with Angular, and I also take on landing pages and dashboards as a freelancer.",
    correo: 'Send an email',
    copiar: 'Copy email',
    copiado: 'Email copied',
    fallo: "Couldn't copy; the email is",
    cv: 'Download CV',
    cvSub: 'Full professional profile in PDF (Spanish)',
    nuevaPestana: ' (opens in a new tab)',
  },
};

@Component({
  selector: 'app-contact',
  imports: [AnimateIcons, IconHover],
  host: { class: 'block' },
  template: `
    <section id="contacto" aria-labelledby="contacto-titulo" class="section relative isolate flex min-h-svh items-center">
      <!-- Ember glows behind the call to action. -->
      <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div class="absolute left-[10%] top-16 size-40 rounded-full bg-brand/15 blur-3xl"></div>
        <div class="absolute bottom-10 right-[10%] size-56 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div class="reveal mx-auto w-full max-w-3xl text-center">
        <p class="eyebrow text-center"><span aria-hidden="true">// </span>{{ i18n.lang() === 'en' ? 'contact' : 'contacto' }}</p>
        <h2
          id="contacto-titulo"
          class="mt-2 font-display text-4xl font-bold leading-tight text-text sm:text-6xl"
        >
          {{ t().titulo }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-center text-text-muted hyphens-none">
          {{ t().intro }}
        </p>

        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-[minmax(0,1fr)] gap-4 text-left">
          <!--
            Whole card clicks through to the mailto (stretched link), while the copy button sits
            above it on its own layer: no button nested inside a link.
          -->
          <div class="card group">
            <span class="tile" aria-hidden="true"><animate-icons [icon]="icons.mail" [size]="22" /></span>
            <div class="min-w-0 flex-1">
              <a appIconHover [href]="'mailto:' + p.email" class="stretched font-display text-lg font-semibold group-hover:text-accent-soft">
                {{ t().correo }}
              </a>
              <p class="break-all text-left font-mono text-sm text-text-muted">{{ p.email }}</p>
            </div>
            <button
              appIconHover
              type="button"
              class="relative z-10 grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl text-text-muted transition-colors hover:bg-text/5 hover:text-accent"
              [attr.aria-label]="copy() === 'copied' ? t().copiado : t().copiar"
              (click)="copyEmail()"
            >
              <animate-icons [icon]="copy() === 'copied' ? icons.copyCheck : icons.copy" [size]="20" aria-hidden="true" />
            </button>
          </div>

          <div class="card group">
            <span class="tile" aria-hidden="true"><animate-icons [icon]="icons.download" [size]="22" /></span>
            <div class="min-w-0 flex-1">
              <a appIconHover [href]="p.cv" download class="stretched font-display text-lg font-semibold group-hover:text-accent-soft">
                {{ t().cv }}
              </a>
              <p class="text-left text-sm text-text-muted">{{ t().cvSub }}</p>
            </div>
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 5v12m-5-5 5 5 5-5M5 21h14" />
            </svg>
          </div>
        </div>

        <!-- Announced to screen readers; visible so sighted users get the same confirmation. -->
        <p class="mt-3 min-h-5 text-center text-sm" [class]="copy() === 'failed' ? 'text-alert' : 'text-accent'" aria-live="polite">
          @switch (copy()) {
            @case ('copied') { {{ t().copiado }} }
            @case ('failed') { {{ t().fallo }} {{ p.email }} }
          }
        </p>

        <ul class="mt-4 flex items-center justify-center gap-6 text-sm">
          <li>
            <a appIconHover [href]="p.linkedin" target="_blank" rel="me noopener" class="social">
              <span class="social-icon"><animate-icons [icon]="icons.linkedin" [size]="18" aria-hidden="true" /></span>
              LinkedIn<span class="sr-only">{{ t().nuevaPestana }}</span>
            </a>
          </li>
          <li class="h-6 w-px bg-border" aria-hidden="true"></li>
          <li>
            <a appIconHover [href]="p.github" target="_blank" rel="me noopener" class="social">
              <span class="social-icon"><animate-icons [icon]="icons.github" [size]="18" aria-hidden="true" /></span>
              GitHub<span class="sr-only">{{ t().nuevaPestana }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: `
    .card {
      position: relative;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      border: 1px solid var(--color-border);
      border-radius: 1rem;
      background: linear-gradient(
        to right,
        color-mix(in srgb, var(--color-surface) 85%, transparent),
        color-mix(in srgb, var(--color-surface-2) 60%, transparent)
      );
      transition: border-color 300ms, box-shadow 300ms;
    }

    .card:hover,
    .card:focus-within {
      border-color: rgb(255 107 107 / 0.5);
      box-shadow: 0 20px 40px -20px rgb(220 38 38 / 0.35);
    }

    @media (min-width: 640px) {
      .card {
        padding: 1.5rem;
      }
    }

    .tile {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      background: linear-gradient(to bottom right, rgb(220 38 38 / 0.25), rgb(255 107 107 / 0.1));
      color: var(--color-accent);
    }

    /* The link's hit area covers the whole card. */
    .stretched::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 1rem;
    }

    .stretched:focus-visible {
      outline: none;
    }

    .card:has(.stretched:focus-visible) {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }

    .arrow {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
      margin-right: 0.75rem;
      color: var(--color-text-muted);
      transition: color 200ms;
    }

    .card:hover .arrow {
      color: var(--color-accent);
    }

    .social {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      min-height: 2.75rem;
      color: var(--color-text-muted);
      font-weight: 500;
      transition: color 200ms;
    }

    .social:hover {
      color: var(--color-text);
    }

    .social-icon {
      display: grid;
      place-items: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: color-mix(in srgb, var(--color-text) 5%, transparent);
      transition: background-color 200ms;
    }

    .social:hover .social-icon {
      background: rgb(220 38 38 / 0.2);
    }
  `,
})
export class Contact {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.pick(textos);
  protected readonly p = perfil;
  protected readonly icons = {
    mail: Mail,
    copy: Copy,
    copyCheck: CopyCheck,
    linkedin: Linkedin,
    github: Github,
    download: Download,
  };
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
