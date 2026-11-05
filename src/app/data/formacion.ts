/** A practice project (or group of them) built during a course, with its public code. */
export interface ProyectoCurso {
  nombre: string;
  stack: string;
  codigo: string;
  demo?: string;
}

/** A degree or certificate. `certificado` is the scan's base name in public/img/ (served as -640/-1200.webp). */
export interface Formacion {
  titulo: string;
  institucion: string;
  logo: string;
  periodo: string;
  tipo: 'Título' | 'Certificado';
  /** Shown under the title; certificates carry their hours. */
  duracion: string;
  /** Certified hours, summed into the stats row. */
  horas?: number;
  proyectos?: ProyectoCurso[];
  temas: string[];
  certificado: string;
  /** Public verification page, when the platform has one. */
  verificar?: string;
}

// Newest first within each group; add new courses at the top of the certificates.
export const formacion: Formacion[] = [
  {
    titulo: 'Ingeniería de Sistemas',
    institucion: 'CORHUILA',
    logo: 'logos/corhuila.webp',
    periodo: '2021 — 2023',
    tipo: 'Título',
    duracion: 'Pregrado profesional',
    temas: [
      'Ingeniería de software y arquitectura de aplicaciones',
      'Bases de datos relacionales y modelado de datos',
      'Gestión de proyectos de tecnología',
      'Redes, sistemas operativos e infraestructura',
    ],
    certificado: 'cert-corhuila',
  },
  {
    titulo: 'Tecnólogo en Análisis y Desarrollo de Sistemas de Información',
    institucion: 'SENA',
    logo: 'logos/sena.webp',
    periodo: '2018 — 2020',
    tipo: 'Título',
    duracion: 'Formación tecnológica',
    temas: [
      'Levantamiento y análisis de requerimientos',
      'Modelado UML y diseño de sistemas',
      'Desarrollo web y bases de datos SQL',
      'Pruebas e implantación de software',
    ],
    certificado: 'cert-sena',
  },
  {
    titulo: 'Programación para principiantes: primeros pasos',
    institucion: 'Udemy · DevTalles',
    logo: 'logos/udemy.webp',
    periodo: 'Agosto 2026',
    tipo: 'Certificado',
    duracion: '8 horas',
    horas: 8,
    temas: [
      'Lógica de programación y pensamiento algorítmico',
      'Variables, condicionales y ciclos',
      'Funciones y resolución de problemas',
    ],
    certificado: 'cert-programacion-principiantes',
    verificar: 'https://www.udemy.com/certificate/UC-96e0c4a6-1891-4689-b6f6-1339ba8d105f/',
  },
  {
    titulo: '+100 Proyectos de Desarrollo Web con HTML, CSS y JavaScript',
    institucion: 'Udemy',
    logo: 'logos/udemy.webp',
    periodo: 'Agosto 2026',
    tipo: 'Certificado',
    duracion: '31,5 horas',
    horas: 31.5,
    // One row per block of the repo (counts as of Nov 2026); add a demo link if they get hosted.
    proyectos: [
      {
        nombre: '25 proyectos con HTML',
        stack: 'HTML5, semántica',
        codigo: 'https://github.com/jhonmario7/100-proyectos-HTML-CSS-JS/tree/main/HTML',
      },
      {
        nombre: '25 proyectos con CSS',
        stack: 'CSS3, Flexbox, Grid',
        codigo: 'https://github.com/jhonmario7/100-proyectos-HTML-CSS-JS/tree/main/CSS',
      },
      {
        nombre: '43 proyectos con JavaScript',
        stack: 'JavaScript, DOM',
        codigo: 'https://github.com/jhonmario7/100-proyectos-HTML-CSS-JS/tree/main/JS',
      },
    ],
    temas: [
      'Maquetación con HTML semántico',
      'CSS moderno: Flexbox, Grid y diseño responsive',
      'JavaScript y manipulación del DOM',
      'Proyectos prácticos de principio a fin',
    ],
    certificado: 'cert-100-proyectos',
    verificar: 'https://www.udemy.com/certificate/UC-790fcff8-7658-4262-8610-30e3fbf21f71/',
  },
  {
    titulo: 'Programación Nivel Explorador',
    institucion: 'MinTIC · CUN',
    logo: 'logos/mintic.webp',
    periodo: 'Octubre 2025',
    tipo: 'Certificado',
    duracion: '164 horas · Bootcamp Talento Tech',
    horas: 164,
    temas: [
      'Fundamentos de programación y algoritmia',
      'Estructuras de datos básicas',
      'Buenas prácticas y control de versiones',
      'Trabajo por proyectos en equipo',
    ],
    certificado: 'cert-mintic',
  },
  {
    titulo: 'JavaScript Moderno: guía para dominar el lenguaje',
    institucion: 'DevTalles',
    logo: 'logos/devtalles.webp',
    periodo: 'Julio 2024',
    tipo: 'Certificado',
    duracion: 'Curso completo',
    temas: [
      'ES6+: desestructuración, módulos y clases',
      'Promesas, async/await y consumo de APIs',
      'Programación orientada a objetos en JavaScript',
      'Bundlers y flujo de trabajo moderno',
    ],
    certificado: 'cert-js-moderno',
    verificar: 'https://cursos.devtalles.com/certificates/a8zybgdqe9',
  },
];
