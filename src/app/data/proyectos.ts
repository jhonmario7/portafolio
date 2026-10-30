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
  /** Full screenshots for the dialog, served as `<imagen>-<n>-640.webp` / `-1200.webp`. */
  galeria: Captura[];
}

export interface Captura {
  alt: string;
  /** Intrinsic size of the 1200 px version, so the dialog reserves the right box. */
  height: number;
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
    galeria: [
      { alt: 'Inicio de fisioyuli.com con el titular, el botón para agendar por WhatsApp y la foto de la fisioterapeuta.', height: 670 },
      { alt: 'Resultado de PageSpeed Insights en móvil: 92 en rendimiento y 100 en accesibilidad, buenas prácticas y SEO.', height: 705 },
    ],
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
    galeria: [
      { alt: 'Inicio de iuscounterconsulting.com con el titular y los cinco servicios de la firma.', height: 658 },
      { alt: 'Formulario de contacto con nombre, teléfono, servicio de interés y autorización de datos.', height: 597 },
    ],
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
    galeria: [
      { alt: 'Calendario semanal de reservas con filtros por cancha y el botón Nueva reserva.', height: 542 },
      { alt: 'Carta del restaurante del club organizada por categorías, con precios.', height: 543 },
      { alt: 'Perfil del cliente con su saldo de King Points y King Coin y sus datos personales de prueba.', height: 542 },
      { alt: 'Pantalla de inicio de sesión del panel de King Padel.', height: 576 },
      { alt: 'Formulario de registro para nuevos clientes del club.', height: 556 },
    ],
  },
];
