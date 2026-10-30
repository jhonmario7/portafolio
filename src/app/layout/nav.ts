import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { IconHover } from '../shared/icon-hover';
import { Briefcase, FolderOpen, GraduationCap, House, Mail } from '@animateicons/angular/lucide';

const links = [
  { id: 'inicio', label: 'Inicio', icon: House },
  { id: 'experiencia', label: 'Experiencia', icon: Briefcase },
  { id: 'proyectos', label: 'Proyectos', icon: FolderOpen },
  { id: 'formacion', label: 'Formación', icon: GraduationCap },
  { id: 'contacto', label: 'Contacto', icon: Mail },
];

@Component({
  selector: 'app-nav',
  imports: [AnimateIcons, IconHover],
  template: `
    <nav
      aria-label="Secciones"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur
        lg:inset-y-0 lg:right-auto lg:w-24 lg:border-t-0 lg:border-r lg:pb-0"
    >
      <ul class="flex h-16 lg:h-full lg:flex-col lg:justify-center lg:gap-2">
        @for (link of links; track link.id) {
          @let current = active() === link.id;
          <li class="flex-1 lg:flex-none">
            <a
              appIconHover
              [href]="'#' + link.id"
              [attr.aria-current]="current ? 'location' : null"
              class="flex h-full flex-col items-center justify-center gap-1 text-xs font-medium transition-colors
                lg:mx-3 lg:h-auto lg:rounded-card lg:py-3"
              [class]="current ? 'text-accent lg:bg-surface-2' : 'text-text-muted hover:text-text'"
            >
              <animate-icons [icon]="link.icon" [size]="22" aria-hidden="true" />
              {{ link.label }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class Nav {
  protected readonly links = links;
  protected readonly active = signal('inicio');

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
