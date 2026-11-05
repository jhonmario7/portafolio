import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { ChevronLeft, ChevronRight } from '@animateicons/angular/lucide';
import { Proyecto } from '../data/proyectos';

/**
 * Screenshot carousel on native CSS scroll-snap: swipe on phones, arrows and dots with the mouse,
 * arrow keys when the track has focus. No library: the browser does the scrolling.
 */
@Component({
  selector: 'app-project-carousel',
  imports: [NgOptimizedImage, AnimateIcons],
  host: { class: 'block' },
  template: `
    @let p = proyecto();
    @let total = p.capturas.length;
    <div class="relative" role="region" aria-roledescription="carrusel" [attr.aria-label]="'Capturas de ' + p.nombre">
      <div
        #track
        tabindex="0"
        [attr.aria-label]="'Capturas de ' + p.nombre + ', desliza o usa las flechas'"
        class="flex h-[220px] snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth rounded-xl border border-border bg-bg
          [scrollbar-width:none] motion-reduce:scroll-auto sm:h-[260px] md:h-[320px] lg:h-[360px] [&::-webkit-scrollbar]:hidden"
        (scroll)="sync()"
      >
        @for (alt of p.capturas; track $index; let i = $index) {
          <figure
            class="relative h-full w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="diapositiva"
            [attr.aria-label]="i + 1 + ' de ' + total"
          >
            <!-- The slide is cropped to fit; clicking it opens the full screenshot (zoom cursor as the cue). -->
            <button type="button" class="group absolute inset-0 cursor-zoom-in overflow-hidden" (click)="ampliar.emit(i)">
              <img
                [ngSrc]="p.imagen + '-' + (i + 1)"
                ngSrcset="640w, 1200w"
                sizes="(min-width: 1024px) 560px, 92vw"
                fill
                [alt]="alt"
                class="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span class="sr-only"> Ver en grande.</span>
            </button>
          </figure>
        }
      </div>

      @if (total > 1) {
        <button
          type="button"
          class="nav left-3"
          aria-label="Captura anterior"
          [disabled]="index() === 0"
          (click)="go(index() - 1)"
        >
          <animate-icons [icon]="icons.prev" [size]="20" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="nav right-3"
          aria-label="Captura siguiente"
          [disabled]="index() === total - 1"
          (click)="go(index() + 1)"
        >
          <animate-icons [icon]="icons.next" [size]="20" aria-hidden="true" />
        </button>

        <div class="mt-3 flex justify-center gap-2">
          @for (alt of p.capturas; track $index; let i = $index) {
            <button
              type="button"
              class="grid size-6 cursor-pointer place-items-center"
              [attr.aria-label]="'Ir a la captura ' + (i + 1)"
              [attr.aria-current]="i === index() ? 'true' : null"
              (click)="go(i)"
            >
              <span
                class="h-2 rounded-full transition-all duration-300"
                [class]="i === index() ? 'w-5 bg-accent' : 'w-2 bg-border'"
              ></span>
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: `
    /* Arrows centre on the track: the dots row below adds 2.25rem to the block. */
    .nav {
      position: absolute;
      top: calc(50% - 1.125rem);
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      translate: 0 -50%;
      /* Frosted: the screenshot shows through, blurred. */
      border: 1px solid rgb(255 255 255 / 0.2);
      border-radius: 9999px;
      background: rgb(10 10 10 / 0.3);
      color: var(--color-text);
      backdrop-filter: blur(12px) saturate(1.4);
      box-shadow: 0 4px 16px rgb(0 0 0 / 0.3);
      /* Keeps the white chevron readable over light screenshots. */
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.6));
      cursor: pointer;
      transition: opacity 200ms, border-color 200ms;
    }

    .nav:hover {
      border-color: var(--color-text-muted);
    }

    .nav:disabled {
      opacity: 0;
      pointer-events: none;
    }
  `,
})
export class ProjectCarousel {
  readonly proyecto = input.required<Proyecto>();
  /** Index of the slide the user wants to see full size. */
  readonly ampliar = output<number>();

  protected readonly index = signal(0);
  protected readonly icons = { prev: ChevronLeft, next: ChevronRight };
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  protected go(i: number): void {
    const track = this.track().nativeElement;
    track.scrollTo({ left: i * track.clientWidth });
    this.index.set(i); // immediate feedback; sync() confirms once the scroll settles
  }

  protected sync(): void {
    const track = this.track().nativeElement;
    this.index.set(Math.round(track.scrollLeft / track.clientWidth));
  }
}
