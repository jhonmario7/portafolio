import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { X } from '@animateicons/angular/lucide';

/** A screenshot by its base name in public/img/ (served as <src>-640.webp and <src>-1200.webp). */
export interface Captura {
  src: string;
  alt: string;
}

/**
 * Just the image, full and uncropped, zooming in over a dimmed page. Built on a native <dialog>
 * (Esc, focus trap, focus back to the trigger) but with no frame: a floating X, and any click
 * that isn't on the image closes it.
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
  protected readonly captura = signal<Captura | null>(null);
  protected readonly icons = { close: X };
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(captura: Captura): void {
    this.captura.set(captura);
    this.dialog().nativeElement.showModal();
  }

  protected closeUnlessImage(event: MouseEvent): void {
    if (!(event.target instanceof HTMLImageElement)) this.dialog().nativeElement.close();
  }
}
