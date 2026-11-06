import { Component, inject } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { ArrowUp } from '@animateicons/angular/lucide';
import { I18n } from '../i18n';
import { IconHover } from '../shared/icon-hover';

/**
 * Frosted round button (same glass as the hero's skills card) whose red ring fills as the page
 * scrolls and closes at the bottom. Pure CSS scroll-driven animations: no scroll listener.
 * Browsers without them (Firefox today) just show the button, always visible, ring empty.
 */
@Component({
  selector: 'app-back-to-top',
  imports: [AnimateIcons, IconHover],
  template: `
    <a appIconHover [href]="i18n.base() + '#inicio'" class="volver">
      <svg class="anillo" viewBox="0 0 48 48" aria-hidden="true">
        <circle class="pista" cx="24" cy="24" r="22" pathLength="100" />
        <circle class="progreso" cx="24" cy="24" r="22" pathLength="100" />
      </svg>
      <animate-icons [icon]="arrowUp" [size]="20" aria-hidden="true" />
      <span class="sr-only">{{ i18n.lang() === 'es' ? 'Volver arriba' : 'Back to top' }}</span>
    </a>
  `,
  styles: `
    .volver {
      position: fixed;
      right: 1.25rem;
      bottom: 1.25rem;
      z-index: 40;
      display: grid;
      place-items: center;
      width: 3.25rem;
      height: 3.25rem;
      border: 1px solid rgb(255 255 255 / 0.15);
      border-radius: 9999px;
      background: color-mix(in srgb, var(--color-surface) 60%, transparent);
      color: var(--color-text);
      backdrop-filter: blur(24px);
      box-shadow: 0 10px 30px -10px rgb(220 38 38 / 0.45);
      transition: color 200ms, box-shadow 200ms;
    }

    .volver:hover {
      color: var(--color-accent);
      box-shadow: 0 10px 34px -8px rgb(220 38 38 / 0.65);
    }

    .anillo {
      position: absolute;
      inset: 0;
      rotate: -90deg; /* the ring starts filling at 12 o'clock */
    }

    .anillo circle {
      fill: none;
      stroke-width: 2.5;
    }

    .pista {
      stroke: var(--color-border);
    }

    .progreso {
      stroke: var(--color-brand);
      stroke-linecap: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
    }

    @supports (animation-timeline: scroll()) {
      /* Hidden on the hero, fades in past the first screen. Visibility keeps it out of the tab order meanwhile. */
      .volver {
        animation: aparecer linear both;
        animation-timeline: scroll(root);
        animation-range: 60vh 90vh;
      }

      .progreso {
        animation: llenar linear both;
        animation-timeline: scroll(root);
      }
    }

    @keyframes aparecer {
      from {
        opacity: 0;
        visibility: hidden;
        translate: 0 1rem;
      }
    }

    @keyframes llenar {
      to {
        stroke-dashoffset: 0;
      }
    }

    @media (min-width: 1024px) {
      .volver {
        right: 1.5rem;
        bottom: 1.5rem;
      }
    }
  `,
})
export class BackToTop {
  protected readonly i18n = inject(I18n);
  protected readonly arrowUp = ArrowUp;
}
