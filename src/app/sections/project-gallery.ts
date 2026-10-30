import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, afterRenderEffect, input, output, signal, viewChild } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { ChevronLeft, ChevronRight, X } from '@animateicons/angular/lucide';
import { Proyecto } from '../data/proyectos';

/** Native <dialog>: focus trap, Esc and inert background come from the browser. */
@Component({
  selector: 'app-project-gallery',
  imports: [NgOptimizedImage, AnimateIcons],
  template: `
    <dialog
      #dialog
      [attr.aria-labelledby]="proyecto() ? 'galeria-titulo' : null"
      class="m-auto max-h-[92dvh] outline-none w-[min(64rem,94vw)] rounded-card border border-border bg-surface p-0 text-text backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      (close)="closed.emit()"
      (click)="closeOnBackdrop($event)"
      (keydown.arrowleft)="move(-1)"
      (keydown.arrowright)="move(1)"
    >
      @if (proyecto(); as p) {
        @let shot = p.galeria[index()];
        <header class="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
          <h2 id="galeria-titulo" class="text-lg font-semibold">{{ p.nombre }}</h2>
          <button type="button" class="btn btn-secondary size-11 cursor-pointer px-0" (click)="dialog.close()" aria-label="Cerrar galería">
            <animate-icons [icon]="icons.close" [size]="20" aria-hidden="true" />
          </button>
        </header>

        <figure class="p-4 sm:p-6">
          <!-- NgOptimizedImage inputs are fixed after init, so each screenshot gets its own <img>. -->
          @for (captura of p.galeria; track $index) {
            @if ($index === index()) {
              <img
                [ngSrc]="p.imagen + '-' + ($index + 1)"
                ngSrcset="640w, 1200w"
                sizes="(min-width: 1024px) 960px, 90vw"
                width="1200"
                [height]="captura.height"
                [alt]="captura.alt"
                loading="eager"
                class="max-h-[65dvh] w-full rounded-lg border border-border object-contain"
              />
            }
          }
          <figcaption class="mt-3 text-sm text-text-muted">{{ shot.alt }}</figcaption>
        </figure>

        <footer class="flex items-center justify-between gap-4 border-t border-border px-4 py-3 sm:px-6">
          <button type="button" class="btn btn-secondary cursor-pointer" (click)="move(-1)" [disabled]="index() === 0">
            <animate-icons [icon]="icons.prev" [size]="18" aria-hidden="true" />
            Anterior
          </button>
          <p class="font-mono text-sm text-text-muted" aria-live="polite">{{ index() + 1 }} de {{ p.galeria.length }}</p>
          <button type="button" class="btn btn-secondary cursor-pointer" (click)="move(1)" [disabled]="index() === p.galeria.length - 1">
            Siguiente
            <animate-icons [icon]="icons.next" [size]="18" aria-hidden="true" />
          </button>
        </footer>
      }
    </dialog>
  `,
  styles: `
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `,
})
export class ProjectGallery {
  /** The project to show; null keeps the dialog closed. */
  readonly proyecto = input<Proyecto | null>(null);
  readonly closed = output();

  protected readonly index = signal(0);
  protected readonly icons = { close: X, prev: ChevronLeft, next: ChevronRight };
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterRenderEffect(() => {
      const dialog = this.dialog().nativeElement;
      if (this.proyecto() && !dialog.open) {
        this.index.set(0);
        dialog.showModal();
      }
    });
  }

  protected move(step: number): void {
    const last = (this.proyecto()?.galeria.length ?? 1) - 1;
    this.index.update((i) => Math.min(last, Math.max(0, i + step)));
  }

  protected closeOnBackdrop(event: MouseEvent): void {
    // Clicks on the backdrop target the <dialog> itself; clicks on content target its children.
    if (event.target === event.currentTarget) this.dialog().nativeElement.close();
  }
}
