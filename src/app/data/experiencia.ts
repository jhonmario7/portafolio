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
  alt: 'Panel principal de DATASSEQ con el menú de módulos: Abastecimiento, Activos, Búsqueda Documental, Control Diario, Control Obra, Dashboards, Gestión Combustible, Licitaciones y Liquidaciones.',
};

// Newest first. Non-technical roles from the CV (billing, audit) are left out on purpose.
// resumen is always visible; "Ver detalles" opens detalles as two titled groups. logo: square tile (freelance uses the site mark).
export const trayectoria = [
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
