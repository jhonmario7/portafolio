export const casoDestacado = {
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
  alt: 'Pantalla de inicio de sesión de DATASSEQ, la aplicación administrativa de MASSEQ.',
};

// Newest first. Non-technical roles from the CV (billing, audit) are left out on purpose.
// resumen is always visible; detalles opens with "Ver detalles".
export const trayectoria = [
  {
    rol: 'Desarrollador Frontend Freelance',
    lugar: 'Proyectos para clientes',
    periodo: 'May 2026 – actualidad',
    resumen:
      'Construyo y publico sitios y paneles para clientes, desde la propuesta hasta el despliegue, con foco en rendimiento, SEO y accesibilidad.',
    detalles: [
      'iuscounterconsulting.com (por contrato): landing de una firma contable con carrusel accesible de 11 servicios y formulario a WhatsApp, en Angular 22 SSG.',
      'fisioyuli.com: landing de una fisioterapeuta con SSG, hidratación incremental y Signal Forms; PageSpeed 94–100 y WCAG AA.',
      'King Padel: panel administrativo en Angular 21 (standalone, signals) con reservas, canchas, clientes y usuarios.',
    ],
  },
  {
    rol: 'Profesional TICs',
    lugar: 'OPTISALUD',
    periodo: 'Oct 2023 – May 2024',
    resumen:
      'Apoyé la operación tecnológica de la empresa: soporte a usuarios, redes y gestión de incidencias de principio a fin.',
    detalles: [
      'Soporte técnico en hardware y software, con mantenimiento preventivo y correctivo de equipos.',
      'Configuración y administración de redes LAN/WAN, diagnóstico de routers, switches y puntos de red.',
      'Registro, seguimiento y cierre de incidencias con trazabilidad y priorización.',
      'Capacitaciones y acompañamiento a usuarios en herramientas informáticas.',
    ],
  },
  {
    rol: 'Desarrollador Junior y Auxiliar TICs',
    lugar: 'Corporación Universitaria del Huila',
    periodo: 'Feb 2023 – Ago 2023',
    resumen:
      'Desarrollé el frontend de un proyecto de laboratorio para el equipo de veterinaria, orientado a la extracción del subsuelo y a exámenes clínicos.',
    detalles: [
      'Funcionalidades frontend con HTML, CSS, JavaScript y Angular a nivel junior.',
      'Optimización, pruebas y depuración; integración de servicios con MySQL y pruebas de peticiones con Postman.',
      'Trabajo por sprints junto a perfiles junior y senior, presentando avances del proyecto.',
    ],
  },
  {
    rol: 'Desarrollador Frontend Junior',
    lugar: 'ADN Training',
    periodo: 'Feb 2022 – May 2022',
    resumen:
      'Mi primer rol en desarrollo: llevé diseños de Adobe XD y Figma a interfaces responsive y di mis primeros pasos con TypeScript.',
    detalles: [
      'Diseño y maquetación de pantallas en Adobe XD y Figma, convertidas a HTML y CSS responsive.',
      'Interacciones sencillas con JavaScript y ajustes en TypeScript con acompañamiento del equipo.',
      'Correcciones de estilo, organización de componentes y validación visual frente al diseño.',
    ],
  },
];
