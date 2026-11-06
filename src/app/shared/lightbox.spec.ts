import { TestBed } from '@angular/core/testing';
import { Lightbox } from './lightbox';

describe('Lightbox', () => {
  beforeEach(() => {
    // jsdom has no modal dialogs.
    HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    };
  });

  it('moves between captures within bounds and closes on a click outside the image', async () => {
    const fixture = TestBed.createComponent(Lightbox);
    await fixture.whenStable();
    const capturas = ['a', 'b', 'c'].map((src) => ({ src, alt: `captura ${src}` }));
    fixture.componentInstance.open(capturas, 1);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const dialog = el.querySelector('dialog')!;
    const img = () => el.querySelector('img')!;

    expect(dialog.open).toBe(true);
    expect(img().getAttribute('src')).toBe('img/b-1200.webp');

    const next = el.querySelector<HTMLButtonElement>('button[aria-label="Next screenshot"]')!;
    next.click();
    next.click();
    await fixture.whenStable();
    expect(img().getAttribute('alt')).toBe('captura c');
    expect(next.disabled).toBe(true);
    expect(dialog.open).toBe(true); // arrows don't close it

    img().click();
    expect(dialog.open).toBe(true);
    img().parentElement!.click(); // the empty area around the image
    expect(dialog.open).toBe(false);
  });
});
