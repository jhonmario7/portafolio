import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  async function clickCopy(writeText: () => Promise<void>) {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    el.querySelector<HTMLButtonElement>('button')!.click();
    await fixture.whenStable();
    return el.querySelector('[aria-live]')!.textContent!.trim();
  }

  it('confirms when the email was copied', async () => {
    expect(await clickCopy(() => Promise.resolve())).toBe('Correo copiado');
  });

  it('shows the email instead when the clipboard is denied', async () => {
    const message = await clickCopy(() => Promise.reject(new Error('denied')));
    expect(message).toContain('No se pudo copiar');
    expect(message).toContain('@');
  });
});
