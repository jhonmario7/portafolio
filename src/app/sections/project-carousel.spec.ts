import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { proyectos } from '../data/proyectos';
import { ProjectCarousel } from './project-carousel';

describe('ProjectCarousel', () => {
  beforeEach(() => {
    // jsdom has no layout: give the track a width and record where it is asked to scroll.
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 500 });
    HTMLElement.prototype.scrollTo = function (this: HTMLElement, options?: ScrollToOptions | number) {
      if (typeof options === 'object') this.scrollLeft = options.left ?? 0;
    } as typeof HTMLElement.prototype.scrollTo;
    TestBed.configureTestingModule({
      providers: [{ provide: IMAGE_LOADER, useValue: () => 'img/test.webp' }],
    });
  });

  it('moves between screenshots and hides the arrow at each end', async () => {
    const proyecto = proyectos.find((p) => p.capturas.length > 2)!;
    const fixture = TestBed.createComponent(ProjectCarousel);
    fixture.componentRef.setInput('proyecto', proyecto);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const [prev, next] = el.querySelectorAll<HTMLButtonElement>('button[aria-label^="Captura"]');
    const current = () => el.querySelector('[aria-current="true"]')?.getAttribute('aria-label');

    expect(prev.disabled).toBe(true);
    expect(current()).toBe('Ir a la captura 1');

    for (let i = 0; i < proyecto.capturas.length + 2; i++) {
      next.click();
      await fixture.whenStable();
    }
    expect(current()).toBe(`Ir a la captura ${proyecto.capturas.length}`);
    expect(next.disabled).toBe(true);
    expect(el.querySelector<HTMLElement>('[tabindex="0"]')!.scrollLeft).toBe((proyecto.capturas.length - 1) * 500);
  });
});
