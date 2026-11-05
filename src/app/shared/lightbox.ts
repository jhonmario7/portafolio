import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { ChevronLeft, ChevronRight, X } from '@animateicons/angular/lucide';

/** A screenshot by its base name in public/img/ (served as <src>-640.webp and <src>-1200.webp). */
export interface Captura {
  src: string;
  alt: string;
}

/**
 * Full, uncropped screenshots in a native modal <dialog>: the browser handles Esc, focus trapping
 * and returning focus to whatever opened it. Arrow keys and buttons move between captures.
 */
@Component({
  selector: 'app-lightbox',
  imports: [NgOptimizedImage, AnimateIcons],
  template: `
    <dialog
      #dialog
      [attr.aria-label]="titulo()"
      class="m-auto max-h-[94dvh] w-[min(80rem,96vw)] overflow-hidden rounded-card border border-border bg-surface p-0 text-text outline-none
        backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      (click)="closeOnBackdrop($event)"
      (close)="capturas.set([])"
      (keydown.arrowleft)="move(-1)"
      (keydown.arrowright)="move(1)"
    >
      @if (capturas().length) {
        @let actual = capturas()[index()];
        <header class="flex items-center justify-between gap-4 border-b border-border px-4 py-2 sm:px-6">
          <p class="truncate font-display font-semibold">{{ titulo() }}</p>
          <button type="button" class="nav-btn" aria-label="Cerrar" (click)="dialog.close()">
            <animate-icons [icon]="icons.close" [size]="20" aria-hidden="true" />
          </button>
        </header>

        <figure class="px-4 pt-4 sm:px-6">
          <!-- One <img> per capture: NgOptimizedImage inputs can't change after init. -->
          <div class="relative h-[40dvh] sm:h-[min(72dvh,46rem)]">
            @for (c of capturas(); track c.src; let i = $index) {
              @if (i === index()) {
                <img [ngSrc]="c.src" ngSrcset="640w, 1200w" sizes="96vw" fill loading="eager" [alt]="c.alt" class="object-contain" />
              }
            }
          </div>
          <figcaption class="mt-3 text-sm text-text-muted">{{ actual.alt }}</figcaption>
        </figure>

        <footer class="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button type="button" class="nav-btn" aria-label="Captura anterior" [disabled]="index() === 0" (click)="move(-1)">
            <animate-icons [icon]="icons.prev" [size]="20" aria-hidden="true" />
          </button>
          <p class="font-mono text-sm text-text-muted" aria-live="polite">{{ index() + 1 }} de {{ capturas().length }}</p>
          <button
            type="button"
            class="nav-btn"
            aria-label="Captura siguiente"
            [disabled]="index() === capturas().length - 1"
            (click)="move(1)"
          >
            <animate-icons [icon]="icons.next" [size]="20" aria-hidden="true" />
          </button>
        </footer>
      }
    </dialog>
  `,
  styles: `
    .nav-btn {
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border: 1px solid var(--color-border);
      border-radius: 9999px;
      cursor: pointer;
      transition: border-color 200ms, opacity 200ms;
    }

    .nav-btn:hover {
      border-color: var(--color-text-muted);
    }

    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  `,
})
export class Lightbox {
  protected readonly capturas = signal<Captura[]>([]);
  protected readonly titulo = signal('');
  protected readonly index = signal(0);
  protected readonly icons = { close: X, prev: ChevronLeft, next: ChevronRight };
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(titulo: string, capturas: Captura[], start = 0): void {
    this.titulo.set(titulo);
    this.capturas.set(capturas);
    this.index.set(start);
    this.dialog().nativeElement.showModal();
  }

  protected move(step: number): void {
    this.index.update((i) => Math.min(this.capturas().length - 1, Math.max(0, i + step)));
  }

  protected closeOnBackdrop(event: MouseEvent): void {
    // A click on the backdrop targets the <dialog> itself; clicks on its content target children.
    if (event.target === event.currentTarget) this.dialog().nativeElement.close();
  }
}
