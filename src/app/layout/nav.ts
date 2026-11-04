import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import {
  Briefcase,
  FolderOpen,
  Github,
  GraduationCap,
  House,
  Linkedin,
  Mail,
  Menu,
  X,
} from '@animateicons/angular/lucide';
import { perfil } from '../data/perfil';
import { IconHover } from '../shared/icon-hover';

const links = [
  { id: 'inicio', label: 'Inicio', icon: House },
  { id: 'experiencia', label: 'Experiencia', icon: Briefcase },
  { id: 'proyectos', label: 'Proyectos', icon: FolderOpen },
  { id: 'formacion', label: 'Formación', icon: GraduationCap },
  { id: 'contacto', label: 'Contacto', icon: Mail },
];

const perfiles = [
  { label: 'GitHub', href: perfil.github, icon: Github },
  { label: 'LinkedIn', href: perfil.linkedin, icon: Linkedin },
];

/**
 * Desktop: icon-only sidebar from the top, labels as tooltips (still each link's accessible name),
 * profiles pinned at the bottom. Phones: a menu button opens the same icons as a floating rail.
 */
@Component({
  selector: 'app-nav',
  imports: [AnimateIcons, IconHover],
  host: {
    '(document:keydown.escape)': 'close(true)',
    '(document:click)': 'closeIfOutside($event)',
  },
  template: `
    <nav aria-label="Secciones">
      <button
        #toggle
        type="button"
        class="fixed right-4 top-4 z-50 flex size-12 cursor-pointer items-center justify-center rounded-xl border border-border bg-bg/90 text-text-muted backdrop-blur transition-colors hover:text-text lg:hidden"
        aria-controls="menu-secciones"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="open() ? 'Cerrar menú' : 'Abrir menú'"
        (click)="open.set(!open())"
      >
        <animate-icons [icon]="open() ? icons.close : icons.menu" [size]="22" aria-hidden="true" />
      </button>

      <div
        id="menu-secciones"
        class="fixed right-4 top-20 z-40 flex-col rounded-2xl border border-border bg-bg/90 p-3 backdrop-blur
          lg:inset-y-0 lg:left-0 lg:right-auto lg:top-0 lg:flex lg:w-24 lg:rounded-none lg:border-0 lg:border-r lg:px-4 lg:py-8"
        [class]="open() ? 'flex' : 'hidden'"
      >
      <ul class="flex flex-col gap-3">
        @for (link of links; track link.id) {
          @let current = active() === link.id;
          <li>
            <a
              appIconHover
              [href]="'#' + link.id"
              [attr.aria-current]="current ? 'location' : null"
              class="group relative flex items-center justify-center rounded-xl p-3 transition-all duration-300 xl:p-4"
              [class]="current
                ? 'bg-linear-to-r from-brand/25 to-accent/15 text-accent shadow-lg shadow-brand/20'
                : 'text-text-muted hover:bg-surface-2 hover:text-text'"
              (click)="close()"
            >
              <animate-icons [icon]="link.icon" [size]="22" aria-hidden="true" />
              <span class="label">{{ link.label }}</span>
              @if (current) {
                <span
                  class="absolute -right-2 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-linear-to-b from-accent to-brand lg:-right-3"
                  aria-hidden="true"
                ></span>
              }
            </a>
          </li>
        }
      </ul>

      <ul class="mt-auto hidden flex-col gap-3 lg:flex" aria-label="Perfiles">
        @for (item of perfiles; track item.label) {
          <li>
            <a
              appIconHover
              [href]="item.href"
              target="_blank"
              rel="me noopener"
              class="group relative flex items-center justify-center rounded-xl p-3 text-text-muted transition-colors hover:bg-surface-2 hover:text-text xl:p-4"
            >
              <animate-icons [icon]="item.icon" [size]="22" aria-hidden="true" />
              <span class="label">{{ item.label }}<span class="sr-only"> (abre en otra pestaña)</span></span>
            </a>
          </li>
        }
      </ul>
      </div>
    </nav>
  `,
  styles: `
    /* Phones: icons only, the label stays for screen readers. */
    @media (max-width: 1023.98px) {
      .label {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
    }

    /* Desktop: the label becomes a tooltip to the right of the icon. */
    @media (min-width: 1024px) {
      .label {
        position: absolute;
        left: 100%;
        top: 50%;
        z-index: 50;
        margin-left: 1rem;
        padding: 0.5rem 0.75rem;
        translate: -0.25rem -50%;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        background: var(--color-surface-2);
        color: var(--color-text);
        font-size: 0.875rem;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition:
          opacity 150ms,
          translate 150ms;
      }

      /* Arrow pointing back at the icon. */
      .label::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0.5rem;
        height: 0.5rem;
        translate: -50% -50%;
        rotate: 45deg;
        border-bottom: 1px solid var(--color-border);
        border-left: 1px solid var(--color-border);
        background: var(--color-surface-2);
      }

      .group:hover .label,
      .group:focus-visible .label {
        opacity: 1;
        translate: 0 -50%;
      }
    }
  `,
})
export class Nav {
  protected readonly links = links;
  protected readonly perfiles = perfiles;
  protected readonly icons = { menu: Menu, close: X };
  protected readonly active = signal('inicio');
  protected readonly open = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly toggle = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');

  protected close(returnFocus = false): void {
    if (!this.open()) return;
    this.open.set(false);
    if (returnFocus) this.toggle().nativeElement.focus();
  }

  protected closeIfOutside(event: Event): void {
    if (!this.host.nativeElement.contains(event.target as Node)) this.close();
  }

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Browser only: highlight the section that crosses the middle of the viewport.
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.active.set(entry.target.id);
          }
        },
        { rootMargin: '-50% 0px -50% 0px' },
      );
      for (const { id } of links) {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
