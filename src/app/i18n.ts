import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Service, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export type Lang = 'es' | 'en';

const SITE = 'https://jhonmario.pages.dev';

const seo = {
  es: {
    title: 'Jhon Mario Rodriguez · Desarrollador Frontend Angular',
    description:
      'Desarrollador Frontend Semi-Senior en Angular y TypeScript. 3 años construyendo un ERP empresarial y landings con SSG, PageSpeed 94–100 y WCAG AA.',
    ogDescription: 'Angular y TypeScript: ERP empresarial con más de 10 módulos y landings rápidas y accesibles.',
    locale: 'es_CO',
    url: `${SITE}/es/`,
  },
  en: {
    title: 'Jhon Mario Rodriguez · Angular Frontend Developer',
    description:
      'Mid-level Frontend Developer in Angular and TypeScript. 3 years building an enterprise ERP and landing pages with SSG, PageSpeed 94–100 and WCAG AA.',
    ogDescription: 'Angular and TypeScript: an enterprise ERP with 10+ modules and fast, accessible landing pages.',
    locale: 'en_US',
    url: `${SITE}/`,
  },
};

/**
 * Each language is its own prerendered page (/ in English, the default, and /es/), so the language is fixed for the
 * page's lifetime: read once from the URL, the same on the server and in the browser.
 * Switching languages is a plain link to the other page.
 */
@Service()
export class I18n {
  readonly lang: Lang = inject(PlatformLocation).pathname.startsWith('/es') ? 'es' : 'en';
  /** Prefix for in-page anchors: with <base href="/">, a bare "#id" would point at the English page. */
  readonly base = this.lang === 'es' ? '/es' : '';

  constructor() {
    const s = seo[this.lang];
    const doc = inject(DOCUMENT);
    const meta = inject(Meta);
    doc.documentElement.lang = this.lang;
    inject(Title).setTitle(s.title);
    meta.updateTag({ name: 'description', content: s.description });
    meta.updateTag({ property: 'og:title', content: s.title });
    meta.updateTag({ property: 'og:description', content: s.ogDescription });
    meta.updateTag({ property: 'og:locale', content: s.locale });
    meta.updateTag({ property: 'og:url', content: s.url });
    doc.querySelector('link[rel="canonical"]')?.setAttribute('href', s.url);
  }

  /** The current language's entry of a { es, en } record. */
  pick<T>(record: Record<Lang, T>): T {
    return record[this.lang];
  }
}
