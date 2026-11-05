import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Lightbox } from './lightbox';

describe('Lightbox', () => {
  beforeEach(() => {
    // jsdom has no modal dialogs.
    HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    };
    TestBed.configureTestingModule({
      providers: [{ provide: IMAGE_LOADER, useValue: () => 'img/test.webp' }],
    });
  });

  it('opens on the chosen capture and stays within bounds', async () => {
    const fixture = TestBed.createComponent(Lightbox);
    await fixture.whenStable();
    const capturas = ['a', 'b', 'c'].map((src) => ({ src, alt: `captura ${src}` }));
    fixture.componentInstance.open('Proyecto', capturas, 1);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const counter = () => el.querySelector('[aria-live]')!.textContent!.trim();

    expect(el.querySelector('dialog')!.open).toBe(true);
    expect(counter()).toBe('2 de 3');
    expect(el.querySelector('img')!.getAttribute('alt')).toBe('captura b');

    const next = el.querySelector<HTMLButtonElement>('button[aria-label="Captura siguiente"]')!;
    next.click();
    next.click();
    await fixture.whenStable();
    expect(counter()).toBe('3 de 3');
    expect(next.disabled).toBe(true);
  });
});
