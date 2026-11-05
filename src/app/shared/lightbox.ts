import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { ChevronLeft, ChevronRight, X } from '@animateicons/angular/lucide';

/** A screenshot by its base name in public/img/ (served as <src>-640.webp and <src>-1200.webp). */
export interface Captura {
  src: string;
  alt: string;
}

/**
 * Just the image, full and uncropped, zooming in over a dimmed page. Built on a native <dialog>
 * (Esc, focus trap, focus back to the trigger) but with no frame: a floating X, frosted arrows
 * (and arrow keys) when there are several captures, and any click that isn't on the image or a
 * control closes it.
 */
@Component({
  selector: 'app-lightbox',
  imports: [AnimateIcons],
  template: `
    <dialog
      #dialog
      [attr.aria-label]="captura()?.alt"
      class="visor m-0 size-full max-h-none max-w-none bg-transparent p-0 outline-none"
      (click)="closeUnlessImage($event)"
      (keydown.arrowleft)="move(-1)"
      (keydown.arrowright)="move(1)"
    >
      @if (captura(); as c) {
        <div class="grid size-full place-items-center p-4 sm:p-10">
          <!--
            Plain <img> on purpose: NgOptimizedImage needs fixed dimensions, and here the image must
            size itself to the screenshot's own aspect ratio inside the viewport.
          -->
          <img
            [src]="'img/' + c.src + '-1200.webp'"
            [srcset]="'img/' + c.src + '-640.webp 640w, img/' + c.src + '-1200.webp 1200w'"
            sizes="92vw"
            [alt]="c.alt"
            decoding="async"
            class="max-h-[88dvh] max-w-full rounded-xl border border-border object-contain shadow-2xl"
          />
        </div>
        @if (capturas().length > 1) {
          <button type="button" class="flecha left-3 sm:left-6" aria-label="Captura anterior" [disabled]="index() === 0" (click)="move(-1)">
            <animate-icons [icon]="icons.prev" [size]="22" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="flecha right-3 sm:right-6"
            aria-label="Captura siguiente"
            [disabled]="index() === capturas().length - 1"
            (click)="move(1)"
          >
            <animate-icons [icon]="icons.next" [size]="22" aria-hidden="true" />
          </button>
          <p class="sr-only" aria-live="polite">Captura {{ index() + 1 }} de {{ capturas().length }}</p>
        }
        <button
          type="button"
          class="fixed right-4 top-4 grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-bg/80 text-text backdrop-blur transition-colors hover:border-text-muted"
          aria-label="Cerrar imagen"
          (click)="dialog.close()"
        >
          <animate-icons [icon]="icons.close" [size]="20" aria-hidden="true" />
        </button>
      }
    </dialog>
  `,
  styles: `
    /* Frosted arrows: the page shows through, blurred. */
    .flecha {
      position: fixed;
      top: 50%;
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      translate: 0 -50%;
      border: 1px solid rgb(255 255 255 / 0.2);
      border-radius: 9999px;
      background: rgb(10 10 10 / 0.3);
      color: var(--color-text);
      backdrop-filter: blur(12px) saturate(1.4);
      box-shadow: 0 4px 16px rgb(0 0 0 / 0.3);
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.6));
      cursor: pointer;
      transition: opacity 200ms;
    }

    .flecha:disabled {
      opacity: 0;
      pointer-events: none;
    }

    /* Zoom + fade in and out; the backdrop fades with it. */
    .visor,
    .visor::backdrop {
      transition:
        opacity 250ms ease,
        scale 250ms ease,
        overlay 250ms allow-discrete,
        display 250ms allow-discrete;
      opacity: 0;
    }

    .visor {
      scale: 0.9;
    }

    .visor::backdrop {
      background: rgb(0 0 0 / 0.85);
      backdrop-filter: blur(4px);
    }

    .visor[open],
    .visor[open]::backdrop {
      opacity: 1;
    }

    .visor[open] {
      scale: 1;
    }

    @starting-style {
      .visor[open],
      .visor[open]::backdrop {
        opacity: 0;
      }

      .visor[open] {
        scale: 0.9;
      }
    }
  `,
})
export class Lightbox {
  protected readonly capturas = signal<Captura[]>([]);
  protected readonly index = signal(0);
  protected readonly captura = computed(() => this.capturas()[this.index()] ?? null);
  protected readonly icons = { close: X, prev: ChevronLeft, next: ChevronRight };
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(capturas: Captura[], start = 0): void {
    this.capturas.set(capturas);
    this.index.set(start);
    this.dialog().nativeElement.showModal();
  }

  protected move(step: number): void {
    this.index.update((i) => Math.min(this.capturas().length - 1, Math.max(0, i + step)));
  }

  protected closeUnlessImage(event: MouseEvent): void {
    const target = event.target as Element;
    if (!(target instanceof HTMLImageElement) && !target.closest('button')) this.dialog().nativeElement.close();
  }
}
