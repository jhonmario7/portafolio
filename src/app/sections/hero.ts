import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';
import { Download, Github, Linkedin, Mail } from '@animateicons/angular/lucide';
import { perfil } from '../data/perfil';
import { IconHover } from '../shared/icon-hover';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, AnimateIcons, IconHover],
  host: { class: 'block' },
  template: `
    <!--
      Phones: name, photo, skills card, extras (the left column wrapper becomes "contents" so the
      photo can sit between its children with order). Desktop: two columns, photo on the right.
    -->
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      class="section flex flex-col gap-8 max-lg:pt-24 lg:grid lg:min-h-dvh lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12"
    >
      <div class="max-lg:contents">
        <header class="order-1">
          <h1 id="inicio-titulo" class="text-4xl font-bold leading-tight sm:text-5xl lg:whitespace-nowrap lg:text-4xl xl:text-5xl">
            Hola, soy {{ p.nombreCorto }}
          </h1>
          <p class="mt-2 text-2xl font-bold sm:text-3xl">
            <span class="sr-only">{{ rolesText }}</span>
            <span class="role" aria-hidden="true">{{ typed() }}</span><span class="caret" aria-hidden="true"></span>
          </p>
        </header>

        <!--
          LiquidGlass root: the red glows are what the glass refracts (it only sees its root's
          children). Without WebGL, or before it starts, the card is CSS frosted glass over them.
          "isolate" keeps the library's z-index:-1 canvas inside the card.
        -->
        <div #glassRoot class="relative order-3 lg:mt-8">
          <!-- Opaque base: the library composes transparent areas over white, which washed the glass out. -->
          <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-card bg-bg" aria-hidden="true">
            <div class="absolute -left-4 top-0 size-40 rounded-full bg-brand/50 blur-2xl"></div>
            <div class="absolute bottom-0 right-6 size-36 rounded-full bg-accent/35 blur-2xl"></div>
          </div>
        <figure
          #glass
          class="relative isolate rounded-card border border-white/15 bg-surface/60 p-4 font-mono text-sm backdrop-blur-xl
            [&>canvas]:transition-opacity [&>canvas]:duration-700"
          [class]="glassOn() ? '[&>canvas]:opacity-100' : '[&>canvas]:opacity-0'"
        >
          <figcaption class="mb-3 flex items-center gap-2 text-xs text-text-muted">
            <span class="flex gap-2" aria-hidden="true">
              <span class="size-3 rounded-full bg-red-500"></span>
              <span class="size-3 rounded-full bg-amber-400"></span>
              <span class="size-3 rounded-full bg-green-500"></span>
            </span>
            <span class="ml-2">skills.ts</span>
          </figcaption>
          <pre class="whitespace-pre-wrap leading-relaxed"><code><span class="text-red-300">const</span> skills = [
<span class="block pl-4">@for (skill of p.skills; track skill; let last = $last) {<span class="text-amber-200">'{{ skill }}'</span>@if (!last) {<span class="text-text-muted">, </span>}}</span>];</code></pre>
        </figure>
        </div>

        <div class="order-4 lg:mt-6">
          <!-- Static copy from data/perfil.ts; [innerHTML] only to keep the <strong> highlights. -->
          <p class="max-w-2xl leading-relaxed text-text-muted [&_strong]:font-semibold [&_strong]:text-text" [innerHTML]="p.bio"></p>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">{{ p.bioExtra }}</p>

          <ul class="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
            <li>
              <a appIconHover [href]="p.cv" download class="group relative flex rounded-full bg-brand p-3 text-on-brand transition hover:bg-red-700">
                <animate-icons [icon]="icons.download" [size]="20" aria-hidden="true" />
                <span class="tip">Descargar CV</span>
              </a>
            </li>
            <li>
              <a appIconHover href="#contacto" class="group relative flex rounded-full border border-accent p-3 text-accent transition hover:bg-accent hover:text-bg">
                <animate-icons [icon]="icons.mail" [size]="20" aria-hidden="true" />
                <span class="tip">Hablemos</span>
              </a>
            </li>
            <li>
              <a appIconHover [href]="p.linkedin" target="_blank" rel="me noopener" class="group relative flex rounded-full border border-border p-3 text-text-muted transition hover:border-text-muted hover:text-text">
                <animate-icons [icon]="icons.linkedin" [size]="20" aria-hidden="true" />
                <span class="tip">LinkedIn<span class="sr-only"> (abre en otra pestaña)</span></span>
              </a>
            </li>
            <li>
              <a appIconHover [href]="p.github" target="_blank" rel="me noopener" class="group relative flex rounded-full border border-border p-3 text-text-muted transition hover:border-text-muted hover:text-text">
                <animate-icons [icon]="icons.github" [size]="20" aria-hidden="true" />
                <span class="tip">GitHub<span class="sr-only"> (abre en otra pestaña)</span></span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="relative order-2 self-center lg:justify-self-end">
        <div class="absolute inset-4 rounded-full bg-brand/25 blur-3xl" aria-hidden="true"></div>
        <img
          ngSrc="jhon-avatar"
          ngSrcset="640w, 960w, 1200w"
          sizes="(min-width: 1280px) 440px, (min-width: 1024px) 380px, 280px"
          width="640"
          height="640"
          priority
          alt="Jhon Mario Rodriguez sonriendo, de traje vinotinto y corbata roja, al aire libre entre árboles."
          class="relative size-[240px] rounded-full border-4 border-accent/30 object-cover shadow-2xl sm:size-[280px] lg:size-[380px] xl:size-[440px]"
        />
      </div>
    </section>
  `,
  styles: `
    .role {
      background: linear-gradient(90deg, var(--color-accent), #fca5a5);
      background-clip: text;
      color: transparent;
    }

    .caret {
      display: inline-block;
      width: 3px;
      height: 0.9em;
      margin-left: 4px;
      vertical-align: -0.1em;
      background: var(--color-accent);
      animation: blink 1s steps(1) infinite;
    }

    @keyframes blink {
      50% {
        opacity: 0;
      }
    }

    /* Icon buttons: the label is a tooltip above (and still the link's accessible name). */
    .tip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      z-index: 10;
      margin-bottom: 0.5rem;
      padding: 0.25rem 0.625rem;
      translate: -50% 0.25rem;
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      background: var(--color-surface-2);
      color: var(--color-text);
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition:
        opacity 150ms,
        translate 150ms;
    }

    .group:hover .tip,
    .group:focus-visible .tip {
      opacity: 1;
      translate: -50% 0;
    }
  `,
})
export class Hero {
  protected readonly p = perfil;
  protected readonly icons = { mail: Mail, download: Download, linkedin: Linkedin, github: Github };
  protected readonly rolesText = perfil.roles.join(', ');
  protected readonly typed = signal(perfil.roles[0]);
  protected readonly glassOn = signal(false);
  private readonly glassRoot = viewChild.required<ElementRef<HTMLElement>>('glassRoot');
  private readonly glass = viewChild.required<ElementRef<HTMLElement>>('glass');

  constructor() {
    const destroyRef = inject(DestroyRef);
    this.startLiquidGlass(destroyRef);
    // Typewriter over the roles. The prerendered HTML already shows the first one in full.
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const roles = perfil.roles;
      let role = 0;
      let length = roles[0].length;
      let deleting = true;
      let timer = 0;

      const tick = () => {
        if (deleting) {
          length--;
          if (length === 0) {
            deleting = false;
            role = (role + 1) % roles.length;
          }
        } else {
          length++;
        }
        this.typed.set(roles[role].slice(0, length));
        const written = !deleting && length === roles[role].length;
        if (written) deleting = true;
        timer = window.setTimeout(tick, written ? 1800 : deleting ? 40 : 80);
      };

      timer = window.setTimeout(tick, 2200);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }

  /**
   * WebGL liquid glass over the skills card, desktop only. Its scene capture is ~1 s of main-thread
   * work, so it waits for the first interaction; the CSS frost shows until it fades in.
   */
  private startLiquidGlass(destroyRef: DestroyRef): void {
    afterNextRender(() => {
      const desktop = matchMedia('(min-width: 1024px)');
      let instance: { destroy(): void } | undefined;
      let starting = false;

      const sync = async () => {
        if (desktop.matches && !instance && !starting) {
          starting = true;
          try {
            await document.fonts.ready; // captured text falls back to system fonts otherwise
            const { LiquidGlass } = await import('../vendor/liquidglass/index.js');
            this.glass().nativeElement.dataset['config'] = JSON.stringify(glassConfig);
            instance = await LiquidGlass.init({
              root: this.glassRoot().nativeElement,
              glassElements: [this.glass().nativeElement],
            });
            this.glassOn.set(true);
          } catch {
            // No WebGL or capture failed: the CSS frost stays.
          } finally {
            starting = false;
          }
        } else if (!desktop.matches && instance) {
          instance.destroy();
          instance = undefined;
          this.glassOn.set(false);
        }
      };

      const interactions = ['pointermove', 'keydown', 'scroll', 'touchstart'] as const;
      const start = () => {
        for (const type of interactions) removeEventListener(type, start);
        void sync();
        desktop.addEventListener('change', sync);
      };
      for (const type of interactions) addEventListener(type, start, { once: true, passive: true });

      destroyRef.onDestroy(() => {
        for (const type of interactions) removeEventListener(type, start);
        desktop.removeEventListener('change', sync);
        instance?.destroy();
      });
    });
  }
}

// Measured on the rendered canvas: brightness -0.15 keeps the brightest pixel behind the code at
// luminance ~0.03, so even the muted gray text stays above 4.5:1 (5.2:1). Higher washes it out.
const glassConfig = {
  cornerRadius: 16,
  zRadius: 24,
  blurAmount: 0.6,
  brightness: -0.15,
  saturation: 0.2,
  refraction: 0.7,
  chromAberration: 0.05,
  edgeHighlight: 0.15,
  shadowOpacity: 0.4,
};
