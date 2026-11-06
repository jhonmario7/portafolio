import { Lang } from '../i18n';

// Copy that doesn't change with the language. Translated copy lives in the { es, en } records.
export const perfil = {
  nombre: 'Jhon Mario Rodriguez',
  nombreCorto: 'Jhon Mario',
  // The hero types these one after another; screen readers get the whole list once.
  roles: ['Frontend Developer', 'Web Developer', 'Full Stack Developer', 'Web Designer'],
  email: 'jmrodriguezramirez4@gmail.com',
  // ponytail: one CV in Spanish for both pages; add an English PDF here when there is one.
  cv: 'cv/jhon-rodriguez-cv.pdf',
  linkedin: 'https://www.linkedin.com/in/jmariorodri',
  github: 'https://github.com/jhonmario7',
  skills: [
    'Angular',
    'TypeScript',
    'JavaScript',
    'RxJS',
    'Signals',
    'NgRx',
    'Angular Material',
    'PrimeNG',
    'Tailwind CSS',
    'REST APIs',
    'Firebase',
    'Ionic',
    'Git',
    'Figma',
  ],
};

// Hero bio: facts first, soft skills shown through them instead of listed. <strong> marks highlights.
export const bio: Record<Lang, { bio: string; bioExtra: string }> = {
  es: {
    bio: 'Soy desarrollador frontend con <strong>3 años de experiencia</strong> construyendo aplicaciones en Angular y TypeScript. Hoy desarrollo módulos de <strong>un ERP empresarial con más de 10 módulos</strong> y, como freelance, publico landings y paneles para clientes.',
    bioExtra:
      'Cuido el rendimiento y la accesibilidad (mis landings marcan PageSpeed 94–100 y WCAG AA), trabajo en equipos Scrum y me mantengo al día: he llevado proyectos desde Angular 14 hasta 22.',
  },
  en: {
    bio: "I'm a frontend developer with <strong>3 years of experience</strong> building applications in Angular and TypeScript. Today I build modules for <strong>an enterprise ERP with 10+ modules</strong> and, as a freelancer, I ship landing pages and dashboards for clients.",
    bioExtra:
      'I care about performance and accessibility (my landing pages score PageSpeed 94–100 and meet WCAG AA), I work in Scrum teams and I keep up to date: I have taken projects from Angular 14 all the way to 22.',
  },
};
