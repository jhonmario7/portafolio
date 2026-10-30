import { TestBed } from '@angular/core/testing';
import { IMAGE_LOADER } from '@angular/common';
import { proyectos } from '../data/proyectos';
import { ProjectGallery } from './project-gallery';

describe('ProjectGallery', () => {
  beforeEach(() => {
    // jsdom has no modal dialogs.
    HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    };
    TestBed.configureTestingModule({
      providers: [{ provide: IMAGE_LOADER, useValue: () => 'img/test.webp' }],
    });
  });

  it('opens on the first screenshot and stays within bounds', async () => {
    const proyecto = proyectos.find((p) => p.galeria.length > 2)!;
    const fixture = TestBed.createComponent(ProjectGallery);
    fixture.componentRef.setInput('proyecto', proyecto);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const counter = () => el.querySelector('[aria-live]')!.textContent!.trim();
    const [prev, next] = el.querySelectorAll<HTMLButtonElement>('footer button');

    expect(counter()).toBe(`1 de ${proyecto.galeria.length}`);
    expect(prev.disabled).toBe(true);

    for (let i = 0; i < proyecto.galeria.length + 2; i++) next.click();
    await fixture.whenStable();
    expect(counter()).toBe(`${proyecto.galeria.length} de ${proyecto.galeria.length}`);
    expect(next.disabled).toBe(true);
  });
});
