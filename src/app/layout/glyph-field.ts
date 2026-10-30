import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

const CELL = 22; // px between glyphs
const RADIUS = 150; // px of cursor influence
const GLYPHS = '01{}<>/=;()[]*+#$:.'.split('');
const BASE_ALPHA = 0.05; // resting glyphs: barely there, never competes with text
const PEAK_ALPHA = 0.5; // under the cursor

/**
 * Decorative field of code glyphs over the ember background; near the cursor they light up in the
 * accent red and scramble. Mouse-only, skipped under reduced motion, and the loop stops itself as
 * soon as the trail fades, so an idle page costs nothing. Loaded with @defer (on idle).
 */
@Component({
  selector: 'app-glyph-field',
  template: `<canvas #canvas aria-hidden="true" class="pointer-events-none fixed inset-0 z-[-1] size-full"></canvas>`,
})
export class GlyphField {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
      const canvas = this.canvas().nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resting glyphs live on an offscreen canvas painted once; each frame copies it and redraws
      // only the cells near the cursor (~150 instead of thousands on a large screen).
      const rest = document.createElement('canvas');
      const restCtx = rest.getContext('2d')!;
      const restColor = `rgb(245 245 244 / ${BASE_ALPHA})`;

      let cols = 0;
      let rows = 0;
      let chars: string[] = [];
      let heat = new Float32Array(0); // 0..1 per cell, decays each frame
      const hot = new Set<number>();
      let pointer = { x: -1e4, y: -1e4 };
      let frame = 0;

      const center = (i: number) => [(i % cols) * CELL + CELL / 2, Math.floor(i / cols) * CELL + CELL / 2];
      const paintRest = (i: number) => {
        const [x, y] = center(i);
        restCtx.clearRect(x - CELL / 2, y - CELL / 2, CELL, CELL);
        restCtx.fillText(chars[i], x, y);
      };

      const resize = () => {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        for (const [c, context] of [[canvas, ctx], [rest, restCtx]] as const) {
          c.width = innerWidth * dpr;
          c.height = innerHeight * dpr;
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          context.font = `13px 'JetBrains Mono Variable', ui-monospace, monospace`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
        }
        restCtx.fillStyle = restColor;
        cols = Math.ceil(innerWidth / CELL);
        rows = Math.ceil(innerHeight / CELL);
        chars = Array.from({ length: cols * rows }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]);
        heat = new Float32Array(cols * rows);
        hot.clear();
        for (let i = 0; i < chars.length; i++) paintRest(i);
        draw();
      };

      const draw = () => {
        // Cells inside the cursor's square join the hot set; the rest of the set is the fading trail.
        const c0 = Math.max(0, Math.floor((pointer.x - RADIUS) / CELL));
        const c1 = Math.min(cols - 1, Math.floor((pointer.x + RADIUS) / CELL));
        const r0 = Math.max(0, Math.floor((pointer.y - RADIUS) / CELL));
        const r1 = Math.min(rows - 1, Math.floor((pointer.y + RADIUS) / CELL));
        for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) hot.add(r * cols + c);

        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.drawImage(rest, 0, 0, innerWidth, innerHeight);
        for (const i of hot) {
          const [x, y] = center(i);
          const near = Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / RADIUS);
          const h = (heat[i] = Math.max(heat[i] * 0.92, near * near));
          if (h <= 0.01) {
            hot.delete(i);
            paintRest(i); // the glyph may have scrambled while hot
            continue;
          }
          if (Math.random() < h * 0.15) chars[i] = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          ctx.clearRect(x - CELL / 2, y - CELL / 2, CELL, CELL);
          ctx.fillStyle = `rgb(255 107 107 / ${BASE_ALPHA + h * (PEAK_ALPHA - BASE_ALPHA)})`;
          ctx.fillText(chars[i], x, y);
        }
        return hot.size > 0;
      };

      const loop = () => {
        frame = draw() ? requestAnimationFrame(loop) : 0;
      };
      const onMove = (event: PointerEvent) => {
        pointer = { x: event.clientX, y: event.clientY };
        if (!frame) frame = requestAnimationFrame(loop);
      };
      const onLeave = () => {
        pointer = { x: -1e4, y: -1e4 }; // let the trail fade out
      };

      let resizeTimer = 0;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(resize, 150);
      };

      void document.fonts.ready.then(resize);
      addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      addEventListener('resize', onResize);
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        clearTimeout(resizeTimer);
        removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
        removeEventListener('resize', onResize);
      });
    });
  }
}
