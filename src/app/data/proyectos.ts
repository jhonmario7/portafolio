export interface Proyecto {
  nombre: string;
  tipo: string;
  descripcion: string;
  logros: string[];
  stack: string[];
  /** Base name in public/img/, served as `<imagen>-640.webp` and `<imagen>-1200.webp`. */
  imagen: string;
  alt: string;
  demo?: string;
  nota?: string;
}

export const proyectos: Proyecto[] = [
  {
    nombre: 'FisioYuli',
    tipo: 'Landing · Fisioterapia',
    descripcion:
      'Sitio para una fisioterapeuta en Neiva, pensado para que los pacientes agenden por WhatsApp en un toque.',
    logros: [
      'PageSpeed 94–100 y WCAG AA',
      'SSG con hidratación incremental',
      'Formulario con Signal Forms',
    ],
    stack: ['Angular 22', 'SSG', 'Signal Forms'],
    imagen: 'fisioyuli',
    alt: 'Inicio de fisioyuli.com: titular "Vuelve a moverte sin dolor" junto a la foto de la fisioterapeuta.',
    demo: 'https://fisioyuli.com',
  },
  {
    nombre: 'IUS Counter Consulting',
    tipo: 'Landing · Firma contable',
    descripcion:
      'Landing de una firma de asesoría contable, tributaria y legal, desarrollada por contrato.',
    logros: [
      'Carrusel accesible con 11 servicios',
      'Formulario de contacto que llega por WhatsApp',
      'Prerenderizada (SSG) para SEO',
    ],
    stack: ['Angular 22', 'SSG', 'Accesibilidad'],
    imagen: 'ius-counter',
    alt: 'Inicio de iuscounterconsulting.com: titular "Asesoría contable, tributaria y legal" en azul oscuro y dorado.',
    demo: 'https://iuscounterconsulting.com',
  },
  {
    nombre: 'King Padel',
    tipo: 'Panel administrativo · Club de pádel',
    descripcion:
      'Panel para gestionar un complejo de pádel: reservas por cancha, ligas, torneos, ranking y la carta del restaurante.',
    logros: [
      'Calendario semanal de reservas filtrable por cancha',
      'Ranking con puntos y saldo a favor por cliente',
      'Roles de cliente y administrador',
    ],
    stack: ['Angular 21', 'Standalone', 'Signals'],
    imagen: 'king-padel',
    alt: 'Calendario de reservas del panel de King Padel con filtros por cancha y vista semanal.',
    nota: 'Proyecto privado del cliente',
  },
];
