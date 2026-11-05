export interface Proyecto {
  nombre: string;
  descripcion: string;
  stack: string[];
  /**
   * Base name of the screenshots in public/img/: capture n is served as
   * `<imagen>-<n>-640.webp` and `<imagen>-<n>-1200.webp`.
   */
  imagen: string;
  /** One alt text per desktop screenshot; the first one is the laptop screen in the cover. */
  capturas: string[];
  /** Alt of the phone screenshot (<imagen>-movil-640/-1200.webp), shown on the cover's phone. */
  movil: string;
  demo?: string;
  codigo?: string;
}

export const proyectos: Proyecto[] = [
  {
    nombre: 'FisioYuli',
    descripcion:
      'Landing para una fisioterapeuta en Neiva, pensada para que los pacientes agenden por WhatsApp en un toque. Prerenderizada (SSG) con hidratación incremental y formulario con Signal Forms; marca PageSpeed 94–100 y cumple WCAG AA.',
    stack: ['Angular 22', 'TypeScript', 'SSG', 'Signal Forms'],
    imagen: 'fisioyuli',
    capturas: [
      'Inicio de fisioyuli.com con el titular, el botón para agendar por WhatsApp y la foto de la fisioterapeuta.',
      'Resultado de PageSpeed Insights en móvil: 92 en rendimiento y 100 en accesibilidad, buenas prácticas y SEO.',
    ],
    movil: 'fisioyuli.com en celular: foto de la fisioterapeuta, botón de WhatsApp y el titular "Vuelve a moverte sin dolor".',
    demo: 'https://fisioyuli.com',
  },
  {
    nombre: 'IUS Counter Consulting',
    descripcion:
      'Landing para una firma de asesoría contable, tributaria y legal, desarrollada por contrato. Incluye un carrusel accesible con sus 11 servicios, un formulario de contacto que llega por WhatsApp y prerenderizado (SSG) para posicionar en buscadores.',
    stack: ['Angular 22', 'TypeScript', 'SSG', 'Accesibilidad'],
    imagen: 'ius-counter',
    capturas: [
      'Inicio de iuscounterconsulting.com con el titular y los cinco servicios de la firma.',
      'Formulario de contacto con nombre, teléfono, servicio de interés y autorización de datos.',
    ],
    movil: 'iuscounterconsulting.com en celular: titular, botones para agendar y ver servicios, y las cinco áreas de la firma.',
    demo: 'https://iuscounterconsulting.com',
  },
  {
    nombre: 'King Padel',
    descripcion:
      'Panel para gestionar un club de pádel: calendario de reservas por cancha, ligas, torneos, ranking con puntos y saldo a favor por cliente, y la carta del restaurante, con roles de cliente y administrador.',
    stack: ['Angular 21', 'TypeScript', 'Standalone', 'Signals'],
    imagen: 'king-padel',
    capturas: [
      'Pantalla de inicio de sesión del panel de King Padel.',
      'Calendario semanal de reservas con filtros por cancha y el botón Nueva reserva.',
      'Carta del restaurante del club organizada por categorías, con precios.',
      'Perfil del cliente con su saldo de King Points y King Coin y sus datos personales de prueba.',
      'Formulario de registro para nuevos clientes del club.',
    ],
    movil: 'Inicio de sesión de King Padel en celular.',
  },
];
