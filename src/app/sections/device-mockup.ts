import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { Proyecto } from '../data/proyectos';

/**
 * Project cover: a laptop with the desktop screenshot and a phone with the mobile one, slightly
 * tilted in 3D (alternating per project) and straightening on hover. Pure CSS frames.
 */
@Component({
  selector: 'app-device-mockup',
  imports: [NgOptimizedImage],
  host: { class: 'block' },
  template: `
    @let p = proyecto();
    <div class="escena" [style.--ry]="invertido() ? '5deg' : '-5deg'" [style.--rx]="invertido() ? '-3deg' : '3deg'">
      <div class="laptop">
        <div class="pantalla">
          <img
            [ngSrc]="p.imagen + '-1'"
            ngSrcset="640w, 1200w"
            sizes="(min-width: 1024px) 480px, 80vw"
            fill
            [alt]="p.capturas[0]"
            class="object-cover object-top"
          />
        </div>
        <div class="base" aria-hidden="true"></div>
      </div>

      <div class="telefono">
        <img
          [ngSrc]="p.imagen + '-movil'"
          ngSrcset="640w"
          sizes="160px"
          fill
          [alt]="p.movil"
          class="object-cover object-top"
        />
      </div>
    </div>
  `,
  styles: `
    .escena {
      position: relative;
      padding: 1.5rem 9% 1.5rem 0;
      transform: perspective(1400px) rotateY(var(--ry)) rotateX(var(--rx));
      transition: transform 500ms ease;
    }

    :host:hover .escena,
    :host:focus-within .escena {
      transform: perspective(1400px) rotateY(0deg) rotateX(0deg);
    }

    .pantalla {
      position: relative;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      border: 10px solid #1c1c1c;
      border-radius: 0.9rem 0.9rem 0 0;
      background: #0a0a0a;
      box-shadow: 0 0 0 1px var(--color-border);
    }

    /* The keyboard deck: a slim bar wider than the screen, with a notch. */
    .base {
      position: relative;
      height: 0.9rem;
      margin: 0 -5%;
      border-radius: 0 0 1rem 1rem;
      background: linear-gradient(#2a2a2a, #151515);
      box-shadow: 0 18px 30px -12px rgb(0 0 0 / 0.7);
    }

    .base::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      width: 18%;
      height: 0.35rem;
      translate: -50% 0;
      border-radius: 0 0 0.5rem 0.5rem;
      background: #0d0d0d;
    }

    .telefono {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 26%;
      aspect-ratio: 9 / 19.5;
      overflow: hidden;
      border: 6px solid #111;
      border-radius: 1.4rem;
      background: #0a0a0a;
      box-shadow:
        0 0 0 1px var(--color-border),
        0 20px 40px -10px rgb(0 0 0 / 0.8);
    }

    @media (prefers-reduced-motion: reduce) {
      .escena {
        transform: none;
      }
    }
  `,
})
export class DeviceMockup {
  readonly proyecto = input.required<Proyecto>();
  /** Mirror the tilt so the zigzag alternates direction. */
  readonly invertido = input(false);
}
