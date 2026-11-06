import { Lang } from '../i18n';

const casoEs = {
  titulo: 'DATASSEQ – Plataforma ERP de MASSEQ',
  periodo: 'Jun 2024 – actualidad',
  datos: [
    { etiqueta: 'Empresa', valor: 'MASSEQ S.A.S.' },
    { etiqueta: 'Producto', valor: 'ERP de maquinaria, proyectos y licitaciones' },
    { etiqueta: 'Rol', valor: 'Profesional de Innovación y Desarrollo · Frontend Angular' },
  ],
  // Static copy rendered with [innerHTML]: <b> marks the highlights.
  aportes: [
    'Desarrollo y mantengo módulos de <b>Talento Humano, Nómina, Gestión de Combustible y Dashboards</b> en una plataforma con más de 10 módulos.',
    'Arquitectura modular con <b>lazy loading</b>, route guards e interceptores HTTP que centralizan la autenticación y el manejo de errores.',
    'Formularios complejos con <b>Reactive Forms</b> y validaciones personalizadas sobre APIs REST con HttpClient y RxJS.',
    'Tableros de indicadores con <b>ApexCharts, ECharts y Chart.js</b> sobre Angular Material, PrimeNG y NgBootstrap.',
    'Componentes reutilizables entre módulos, en sprints <b>Scrum</b> con GitHub y GitLab.',
  ],
  stack: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Angular Material', 'PrimeNG', 'ApexCharts', 'Scrum'],
  // Dark-background version of the company logo: its gray tagline recolored to warm white.
  logo: 'logos/masseq.webp',
  logoAlt: 'MASSEQ',
  imagen: 'datasseq',
  alt: 'Panel principal de DATASSEQ con el menú de módulos: Abastecimiento, Activos, Búsqueda Documental, Control Diario, Control Obra, Dashboards, Gestión Combustible, Licitaciones y Liquidaciones.',
};

// Newest first. Non-technical roles from the CV (billing, audit) are left out on purpose.
// resumen is always visible; "Ver detalles" opens detalles as two titled groups. logo: square tile (freelance uses the site mark).
const trayectoriaEs = [
  {
    rol: 'Desarrollador Frontend Freelance',
    lugar: 'Proyectos para clientes',
    logo: 'favicon.svg',
    periodo: 'May 2026 – actualidad',
    resumen:
      'Construyo y publico sitios y paneles para clientes, desde la propuesta hasta el despliegue, con foco en rendimiento, SEO y accesibilidad.',
    detalles: [
      {
        titulo: 'Landings para clientes',
        descripcion: 'Sitios rápidos y accesibles pensados para convertir visitas en contactos.',
        puntos: [
          'iuscounterconsulting.com (por contrato): landing de una firma contable con carrusel accesible de 11 servicios y formulario a WhatsApp, en Angular 22 SSG.',
          'fisioyuli.com: landing de una fisioterapeuta con SSG, hidratación incremental y Signal Forms; PageSpeed 94–100 y WCAG AA.',
        ],
      },
      {
        titulo: 'Paneles administrativos',
        descripcion: 'Herramientas para operar un negocio desde un solo lugar.',
        puntos: [
          'King Padel: panel en Angular 21 (standalone, signals) para un club de pádel.',
          'Calendario de reservas por cancha, ligas, torneos, ranking y la carta del restaurante.',
          'Roles de cliente y administrador, con saldos y puntos por cliente.',
        ],
      },
    ],
  },
  {
    rol: 'Profesional TICs',
    lugar: 'OPTISALUD',
    logo: 'logos/optisalud.webp',
    periodo: 'Oct 2023 – May 2024',
    resumen:
      'Apoyé la operación tecnológica de la empresa: soporte a usuarios, redes y gestión de incidencias de principio a fin.',
    detalles: [
      {
        titulo: 'Soporte y mantenimiento',
        descripcion: 'Mantuve funcionando los equipos y las herramientas de los usuarios.',
        puntos: [
          'Soporte técnico en hardware y software, resolviendo fallas a tiempo para no frenar la operación.',
          'Mantenimiento preventivo y correctivo: limpieza, diagnósticos, actualizaciones e instalación de software.',
          'Apoyo en el inventario de recursos tecnológicos.',
        ],
      },
      {
        titulo: 'Redes e incidencias',
        descripcion: 'Conectividad estable y cada caso con trazabilidad.',
        puntos: [
          'Configuración y administración de redes LAN/WAN; diagnóstico de routers, switches y puntos de red.',
          'Registro, seguimiento y cierre de incidencias con priorización y comunicación clara.',
          'Capacitaciones y acompañamiento en el uso de herramientas informáticas.',
        ],
      },
    ],
  },
  {
    rol: 'Desarrollador Junior y Auxiliar TICs',
    lugar: 'Corporación Universitaria del Huila',
    logo: 'logos/corhuila.webp',
    periodo: 'Feb 2023 – Ago 2023',
    resumen:
      'Desarrollé el frontend de un proyecto de laboratorio para el equipo de veterinaria, orientado a la extracción del subsuelo y a exámenes clínicos.',
    detalles: [
      {
        titulo: 'Desarrollo frontend',
        descripcion: 'Interfaces para un proyecto de laboratorio del área de veterinaria.',
        puntos: [
          'Funcionalidades con HTML, CSS, JavaScript y Angular a nivel junior.',
          'Optimización, pruebas y depuración de la interfaz.',
        ],
      },
      {
        titulo: 'Integración y trabajo en equipo',
        descripcion: 'Servicios conectados y entregas por sprints.',
        puntos: [
          'Integración de servicios con MySQL y pruebas de peticiones con Postman.',
          'Sprints junto a perfiles junior y senior, presentando los avances del proyecto.',
        ],
      },
    ],
  },
  {
    rol: 'Desarrollador Frontend Junior',
    lugar: 'ADN Training',
    logo: 'logos/adn-training.webp',
    periodo: 'Feb 2022 – May 2022',
    resumen:
      'Mi primer rol en desarrollo: llevé diseños de Adobe XD y Figma a interfaces responsive y di mis primeros pasos con TypeScript.',
    detalles: [
      {
        titulo: 'Del diseño al código',
        descripcion: 'Del prototipo a una interfaz responsive fiel al diseño.',
        puntos: [
          'Diseño y maquetación de pantallas en Adobe XD y Figma, llevadas a HTML y CSS responsive.',
          'Correcciones de estilo y validación visual frente al diseño.',
        ],
      },
      {
        titulo: 'Primeros pasos en desarrollo',
        descripcion: 'Interacción y tipado, con acompañamiento del equipo.',
        puntos: [
          'Interacciones sencillas con JavaScript.',
          'Ajustes y mejoras en TypeScript; organización de componentes.',
        ],
      },
    ],
  },
];

// English: same logos, images and links; only the copy is replaced.
const casoEn = {
  ...casoEs,
  titulo: 'DATASSEQ – MASSEQ ERP platform',
  periodo: 'Jun 2024 – present',
  datos: [
    { etiqueta: 'Company', valor: 'MASSEQ S.A.S.' },
    { etiqueta: 'Product', valor: 'ERP for machinery, projects and tenders' },
    { etiqueta: 'Role', valor: 'Innovation and Development Professional · Angular Frontend' },
  ],
  aportes: [
    'I build and maintain the <b>Human Resources, Payroll, Fuel Management and Dashboards</b> modules of a platform with 10+ modules.',
    'Modular architecture with <b>lazy loading</b>, route guards and HTTP interceptors that centralize authentication and error handling.',
    'Complex forms with <b>Reactive Forms</b> and custom validation over REST APIs with HttpClient and RxJS.',
    'KPI dashboards with <b>ApexCharts, ECharts and Chart.js</b> on Angular Material, PrimeNG and NgBootstrap.',
    'Components reused across modules, in <b>Scrum</b> sprints with GitHub and GitLab.',
  ],
  alt: 'DATASSEQ main panel with the module menu: Procurement, Assets, Document Search, Daily Control, Site Control, Dashboards, Fuel Management, Tenders and Settlements.',
};

const trayectoriaEnTexto = [
  {
    rol: 'Freelance Frontend Developer',
    lugar: 'Client projects',
    periodo: 'May 2026 – present',
    resumen:
      'I build and ship websites and dashboards for clients, from the proposal to deployment, focused on performance, SEO and accessibility.',
    detalles: [
      {
        titulo: 'Client landing pages',
        descripcion: 'Fast, accessible sites designed to turn visits into leads.',
        puntos: [
          'iuscounterconsulting.com (contract work): landing page for an accounting firm with an accessible carousel of 11 services and a WhatsApp contact form, in Angular 22 SSG.',
          'fisioyuli.com: landing page for a physiotherapist with SSG, incremental hydration and Signal Forms; PageSpeed 94–100 and WCAG AA.',
        ],
      },
      {
        titulo: 'Admin dashboards',
        descripcion: 'Tools to run a business from a single place.',
        puntos: [
          'King Padel: Angular 21 dashboard (standalone, signals) for a padel club.',
          'Court booking calendar, leagues, tournaments, rankings and the restaurant menu.',
          'Customer and admin roles, with balances and points per customer.',
        ],
      },
    ],
  },
  {
    rol: 'IT Professional',
    lugar: 'OPTISALUD',
    periodo: 'Oct 2023 – May 2024',
    resumen:
      "I supported the company's technology operations: user support, networking and end-to-end incident management.",
    detalles: [
      {
        titulo: 'Support and maintenance',
        descripcion: "I kept users' equipment and tools running.",
        puntos: [
          'Hardware and software support, fixing issues in time so operations never stalled.',
          'Preventive and corrective maintenance: cleaning, diagnostics, updates and software installation.',
          'Help with the inventory of technology assets.',
        ],
      },
      {
        titulo: 'Networks and incidents',
        descripcion: 'Stable connectivity and every case traceable.',
        puntos: [
          'LAN/WAN setup and administration; diagnosis of routers, switches and network points.',
          'Logging, tracking and closing incidents with clear priorities and communication.',
          'Training and guidance on using IT tools.',
        ],
      },
    ],
  },
  {
    rol: 'Junior Developer and IT Assistant',
    lugar: 'Corporación Universitaria del Huila',
    periodo: 'Feb 2023 – Aug 2023',
    resumen:
      "I built the frontend of a lab project for the veterinary team, focused on subsoil extraction and clinical tests.",
    detalles: [
      {
        titulo: 'Frontend development',
        descripcion: 'Interfaces for a lab project in the veterinary department.',
        puntos: [
          'Features with HTML, CSS, JavaScript and Angular at a junior level.',
          'Interface optimization, testing and debugging.',
        ],
      },
      {
        titulo: 'Integration and teamwork',
        descripcion: 'Connected services and sprint-based delivery.',
        puntos: [
          'Service integration with MySQL and request testing with Postman.',
          'Sprints alongside junior and senior developers, presenting project progress.',
        ],
      },
    ],
  },
  {
    rol: 'Junior Frontend Developer',
    lugar: 'ADN Training',
    periodo: 'Feb 2022 – May 2022',
    resumen:
      'My first development role: I turned Adobe XD and Figma designs into responsive interfaces and took my first steps with TypeScript.',
    detalles: [
      {
        titulo: 'From design to code',
        descripcion: 'From prototype to a responsive interface true to the design.',
        puntos: [
          'Screen design and layout in Adobe XD and Figma, built in responsive HTML and CSS.',
          'Style fixes and visual checks against the design.',
        ],
      },
      {
        titulo: 'First steps in development',
        descripcion: 'Interaction and typing, with guidance from the team.',
        puntos: ['Simple interactions with JavaScript.', 'TypeScript tweaks and improvements; component organization.'],
      },
    ],
  },
];

export const experiencia: Record<Lang, { caso: typeof casoEs; trayectoria: typeof trayectoriaEs }> = {
  es: { caso: casoEs, trayectoria: trayectoriaEs },
  en: { caso: casoEn, trayectoria: trayectoriaEs.map((item, i) => ({ ...item, ...trayectoriaEnTexto[i] })) },
};
