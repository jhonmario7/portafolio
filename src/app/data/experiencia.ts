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
export const trayectoria = [
  {
    rol: 'Desarrollador Frontend Freelance',
    lugar: 'Proyectos para clientes',
    periodo: 'May 2026 — actualidad',
    resumen: 'Landings en Angular 22 con SSG y un panel administrativo en Angular 21.',
  },
  {
    rol: 'Profesional TICs',
    lugar: 'OPTISALUD',
    periodo: 'Oct 2023 — May 2024',
    resumen: 'Soporte técnico, redes LAN/WAN y gestión de incidencias con trazabilidad.',
  },
  {
    rol: 'Desarrollador Junior y Auxiliar TICs',
    lugar: 'Corporación Universitaria del Huila',
    periodo: 'Feb 2023 — Ago 2023',
    resumen: 'Frontend con HTML, CSS, JavaScript y Angular para un proyecto de laboratorio veterinario.',
  },
  {
    rol: 'Desarrollador Frontend Junior',
    lugar: 'ADN Training',
    periodo: 'Feb 2022 — May 2022',
    resumen: 'Maquetación responsive desde Figma y Adobe XD; primeros pasos con TypeScript.',
  },
];
