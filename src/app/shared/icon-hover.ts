import { Directive, contentChild } from '@angular/core';
import { AnimateIcons } from '@animateicons/angular';

/**
 * Plays the inner animated icon when the whole link/button is hovered or focused, not just the
 * icon itself. The library already skips the animation under prefers-reduced-motion.
 */
@Directive({
  selector: '[appIconHover]',
  host: { '(mouseenter)': 'play()', '(focus)': 'play()' },
})
export class IconHover {
  private readonly icon = contentChild(AnimateIcons);

  protected play(): void {
    this.icon()?.startAnimation();
  }
}
