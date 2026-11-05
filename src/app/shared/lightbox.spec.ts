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

  it('shows the image and closes on a click anywhere but the image', async () => {
    const fixture = TestBed.createComponent(Lightbox);
    await fixture.whenStable();
    fixture.componentInstance.open({ src: 'demo', alt: 'Captura de prueba' });
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const dialog = el.querySelector('dialog')!;
    const img = el.querySelector('img')!;

    expect(dialog.open).toBe(true);
    expect(img.getAttribute('alt')).toBe('Captura de prueba');
    expect(img.getAttribute('src')).toBe('img/demo-1200.webp');

    img.click();
    expect(dialog.open).toBe(true);

    img.parentElement!.click(); // the empty area around the image
    expect(dialog.open).toBe(false);
  });
});
