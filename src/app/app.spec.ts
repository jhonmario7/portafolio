import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { appConfig } from './app.config';

describe('App', () => {
  beforeEach(async () => {
    // jsdom has no IntersectionObserver; the nav only needs it to highlight the active link.
    globalThis.IntersectionObserver ??= class {
      observe() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;

    await TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers,
    }).compileComponents();
  });

  it('renders the skip link pointing at the main landmark', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const skip = el.querySelector<HTMLAnchorElement>('a.skip-link');
    expect(skip?.getAttribute('href')).toBe('#contenido');
    expect(el.querySelector('main#contenido')).toBeTruthy();
  });

  it('points every nav link at a section that exists', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const hrefs = [...el.querySelectorAll('nav a')].map((a) => a.getAttribute('href'));
    expect(hrefs.length).toBe(4);
    for (const href of hrefs) {
      expect(el.querySelector(`section${href}`), href ?? '').toBeTruthy();
    }
  });
});
