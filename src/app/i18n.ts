import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Service, Signal, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

export type Lang = 'es' | 'en';

const SITE = 'https://jhonmario.pages.dev';

/** Path of each language's page: English is the default at /. */
export const rutas: Record<Lang, string> = { en: '/', es: '/es' };

const seo = {
  es: {
    title: 'Jhon Mario Rodriguez · Desarrollador de Software',
    description:
      'Ingeniero de Sistemas y desarrollador de software con más de 3 años de experiencia. Creo aplicaciones y sitios web rápidos, accesibles y pensados para quienes los usan.',
    ogDescription: 'Ingeniero de Sistemas con más de 3 años de experiencia creando aplicaciones y sitios web rápidos, accesibles y fáciles de usar.',
    locale: 'es_CO',
    imageAlt: 'Jhon Mario Rodriguez, Desarrollador de Software en Neiva, Colombia, junto a su foto.',
    url: `${SITE}/es/`,
  },
  en: {
    title: 'Jhon Mario Rodriguez · Software Developer',
    description:
      'Systems Engineer and software developer with 3+ years of experience. I build fast, accessible web applications and websites designed for the people who use them.',
    ogDescription: 'Systems Engineer with 3+ years of experience building fast, accessible and easy-to-use web applications and websites.',
    locale: 'en_US',
    imageAlt: 'Jhon Mario Rodriguez, Software Developer in Neiva, Colombia, next to his photo.',
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
  private readonly inicial = langOf(inject(PlatformLocation).pathname);
  readonly lang = signal<Lang>(this.inicial);
  /** True once the reader switches language: sections still waiting to hydrate do it right away, so they swap too. */
  readonly cambiado = computed(() => this.lang() !== this.inicial);
  /** Prefix for in-page anchors: with <base href="/">, a bare "#id" would point at the English page. */
  readonly base = computed(() => (this.lang() === 'es' ? '/es' : ''));

  constructor() {
    // Only finished navigations: on NavigationStart router.url is still the previous URL ("/" on
    // the first load of /es/), which flipped the language for a moment and hydrated every section.
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.lang.set(langOf(e.urlAfterRedirects));
    });

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
      meta.updateTag({ property: 'og:image', content: `${SITE}/og/cover-${this.lang()}.jpg` });
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
