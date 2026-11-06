import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Service, Signal, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export type Lang = 'es' | 'en';

const SITE = 'https://jhonmario.pages.dev';

/** Path of each language's page: English is the default at /. */
export const rutas: Record<Lang, string> = { en: '/', es: '/es' };

const seo = {
  es: {
    title: 'Jhon Mario Rodriguez · Desarrollador Frontend Angular',
    description:
      'Desarrollador Frontend Semi-Senior en Angular y TypeScript. 3 años construyendo un ERP empresarial y landings con SSG, PageSpeed 94–100 y WCAG AA.',
    ogDescription: 'Angular y TypeScript: ERP empresarial con más de 10 módulos y landings rápidas y accesibles.',
    locale: 'es_CO',
    imageAlt: 'Jhon Mario Rodriguez, Frontend Angular en Neiva, Colombia, junto a su foto.',
    url: `${SITE}/es/`,
  },
  en: {
    title: 'Jhon Mario Rodriguez · Angular Frontend Developer',
    description:
      'Mid-level Frontend Developer in Angular and TypeScript. 3 years building an enterprise ERP and landing pages with SSG, PageSpeed 94–100 and WCAG AA.',
    ogDescription: 'Angular and TypeScript: an enterprise ERP with 10+ modules and fast, accessible landing pages.',
    locale: 'en_US',
    imageAlt: 'Jhon Mario Rodriguez, Angular Frontend Developer in Neiva, Colombia, next to his photo.',
    url: `${SITE}/`,
  },
};

/**
 * Each language is its own prerendered page (/ and /es/), so search engines index both. In the
 * browser, switching languages is a router navigation: the URL changes and the copy swaps in
 * place, with no reload and no scroll. Copy comes from { es, en } records through pick().
 */
@Service()
export class I18n {
  private readonly router = inject(Router);
  readonly lang = signal<Lang>(langOf(inject(PlatformLocation).pathname));
  /** Prefix for in-page anchors: with <base href="/">, a bare "#id" would point at the English page. */
  readonly base = computed(() => (this.lang() === 'es' ? '/es' : ''));

  constructor() {
    this.router.events.subscribe(() => this.lang.set(langOf(this.router.url)));

    const doc = inject(DOCUMENT);
    const meta = inject(Meta);
    const title = inject(Title);
    effect(() => {
      const s = seo[this.lang()];
      doc.documentElement.lang = this.lang();
      title.setTitle(s.title);
      meta.updateTag({ name: 'description', content: s.description });
      meta.updateTag({ property: 'og:title', content: s.title });
      meta.updateTag({ property: 'og:description', content: s.ogDescription });
      meta.updateTag({ property: 'og:locale', content: s.locale });
      meta.updateTag({ property: 'og:url', content: s.url });
      meta.updateTag({ property: 'og:image:alt', content: s.imageAlt });
      doc.querySelector('link[rel="canonical"]')?.setAttribute('href', s.url);
    });
  }

  /** The current language's entry of a { es, en } record, as a signal. */
  pick<T>(record: Record<Lang, T>): Signal<T> {
    return computed(() => record[this.lang()]);
  }

  /** Switch in place: the router doesn't scroll (anchorScrolling is off), so the reader stays put. */
  cambiar(lang: Lang, seccion?: string): void {
    void this.router.navigateByUrl(rutas[lang] + (seccion ? `#${seccion}` : ''));
  }
}

function langOf(path: string): Lang {
  return path.startsWith('/es') ? 'es' : 'en';
}
