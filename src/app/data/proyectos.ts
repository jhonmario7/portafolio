import { Lang } from '../i18n';

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

const proyectosEs: Proyecto[] = [
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

const proyectosEnTexto: Pick<Proyecto, 'descripcion' | 'capturas' | 'movil'>[] = [
  {
    descripcion:
      'Landing page for a physiotherapist in Neiva, built so patients can book over WhatsApp in one tap. Prerendered (SSG) with incremental hydration and a Signal Forms form; it scores PageSpeed 94–100 and meets WCAG AA.',
    capturas: [
      'fisioyuli.com home page with the headline, the WhatsApp booking button and a photo of the physiotherapist.',
      'PageSpeed Insights mobile result: 92 for performance and 100 for accessibility, best practices and SEO.',
    ],
    movil: 'fisioyuli.com on a phone: photo of the physiotherapist, WhatsApp button and the headline "Vuelve a moverte sin dolor".',
  },
  {
    descripcion:
      'Landing page for an accounting, tax and legal advisory firm, built under contract. It includes an accessible carousel with its 11 services, a contact form delivered through WhatsApp and prerendering (SSG) for search ranking.',
    capturas: [
      "iuscounterconsulting.com home page with the headline and the firm's five services.",
      'Contact form with name, phone, service of interest and data consent.',
    ],
    movil: "iuscounterconsulting.com on a phone: headline, buttons to book and see services, and the firm's five practice areas.",
  },
  {
    descripcion:
      "Dashboard to run a padel club: court booking calendar, leagues, tournaments, a points ranking and credit balance per customer, and the restaurant's menu, with customer and admin roles.",
    capturas: [
      'King Padel dashboard sign-in screen.',
      'Weekly booking calendar with court filters and the New booking button.',
      "The club restaurant's menu organized by category, with prices.",
      'Customer profile with King Points and King Coin balances and test personal data.',
      'Sign-up form for new club members.',
    ],
    movil: 'King Padel sign-in on a phone.',
  },
];

export const proyectos: Record<Lang, Proyecto[]> = {
  es: proyectosEs,
  en: proyectosEs.map((p, i) => ({ ...p, ...proyectosEnTexto[i] })),
};
