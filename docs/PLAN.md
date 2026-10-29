# Plan de ejecución — Portafolio personal

> Estrategia: **el concepto visual de Candela Landi (`referencias/landing-referencia-3`), reinterpretado con identidad propia, construido con la ingeniería de Adrian Cabello (`referencias/landing-referencia-1`)**.
> Ningún texto, foto, logo ni código sin licencia de las referencias entra a este repo.

---

## 0. Supuestos (corrígelos si no aplican)

| Tema | Supuesto | Impacto si cambia |
|---|---|---|
| Objetivo | **Empleo remoto como Frontend Angular** (principal) + clientes freelance de landings (secundario) | Si es solo freelance, el hero y el CTA giran a "cotiza tu landing" y entra WhatsApp como CTA principal |
| Idioma | **Solo español** en el MVP; contenido en archivos de datos para poder sumar inglés después | Inglés = Fase 4 (rutas `/es` y `/en` prerenderizadas) |
| Proyectos | 3–4 proyectos con captura y permiso para mostrarlos | Si no hay permiso, se muestran como caso anónimo ("Clínica dental, Bogotá") sin capturas |
| Hosting | Estático (sin servidor). Repo público → GitHub Pages; privado → Cloudflare Pages / Netlify | Ninguno en el código, solo el workflow de deploy |

---

## 1. Arquitectura de secciones

Una sola página, lectura en patrón Z en escritorio y vertical en móvil. Cada sección tiene **una** acción clara.

| # | Sección (`id`) | Propósito | Contenido | Acción |
|---|---|---|---|---|
| — | **Navegación** | Orientarse y saltar | Escritorio: sidebar de íconos fijo a la izquierda. Móvil: **barra inferior** de 4–5 pestañas (alcance del pulgar) | Enlaces `#seccion` con `aria-current` |
| 1 | **Hero** (`inicio`) | En 5 segundos: quién eres, qué haces, por qué tú | Línea superior "Hola, soy [Nombre] · Frontend Angular" · **H1 = propuesta de valor** · 1 párrafo · tarjeta de código `perfil.ts` · foto · insignia "Disponible" · 3–4 métricas reales (`<dl>`) | **Contactar** (primario) · Descargar CV (secundario) · LinkedIn / GitHub (texto) |
| 2 | **Experiencia** (`experiencia`) | Prueba profesional | 1 **caso destacado** (cliente, rol, problema → solución → impacto, stack, imagen) + línea de tiempo compacta del resto | Ver proyectos |
| 3 | **Proyectos** (`proyectos`) | Evidencia de lo que construyes | 3–4 proyectos en zigzag: 1 portada, descripción orientada a resultado, stack, "Ver demo" / "Código". Galería completa en `<dialog>` bajo demanda | Ver demo |
| 4 | **Formación** (`formacion`) | Respaldo, sin protagonismo | Ingeniería de Sistemas primero + 3–4 certificaciones relevantes. Lista compacta, sin contadores | — |
| 5 | **Contacto** (`contacto`) | Convertir | Pastilla "Disponible para…" · título · tarjetas: Email (`mailto:` + botón copiar con confirmación accesible) · CV · (WhatsApp si freelance) | Escribirme |
| — | **Footer** | Cierre | Nombre, año, enlaces sociales | — |

**Descartado a propósito** (y por qué): texto que rota tipo máquina de escribir (mensaje inestable) · contadores animados (poco valor, fallan) · carrusel con Swiper y precarga de todas las imágenes (rendimiento) · canvas de glifos (CPU/batería) · proyectos desde una API (no indexable, dependencia externa) · sección "Skills" separada (la cubre `perfil.ts`).

---

## 2. Estructura de carpetas y componentes

```
src/app/
├── app.ts / app.html            # shell: skip link + <app-nav> + <main> + <app-footer>
├── app.routes.ts                # '' → pages/home (lazy)
├── data/                        # TODO el contenido vive aquí, tipado (reutilizable e i18n-ready)
│   ├── types.ts                 # Perfil, Experiencia, Proyecto, Formacion
│   ├── perfil.ts
│   ├── experiencia.ts
│   ├── proyectos.ts
│   └── formacion.ts
├── core/
│   ├── seo.ts                   # title, description, canonical, OG/Twitter, JSON-LD Person
│   └── active-section.ts        # signal con la sección visible (IntersectionObserver, solo navegador)
├── layout/
│   ├── nav.ts                   # sidebar (lg+) y barra inferior (móvil) desde la misma lista
│   └── footer.ts
├── pages/
│   └── home.ts                  # compone las secciones
├── sections/
│   ├── hero.ts                  # + code-card.ts (perfil.ts como <pre><code>)
│   ├── experience.ts            # + featured-case.ts
│   ├── projects.ts              # + project-gallery.ts (<dialog>, @defer on interaction)
│   ├── education.ts
│   └── contact.ts               # + copiar email (signal idle/copied)
└── shared/
    └── reveal.ts                # directiva de aparición; contenido VISIBLE por defecto
```

Convenciones (ver `CLAUDE.md`): standalone, `input()`/`output()`, signals/`computed()`, control flow nativo, `inject()`, `NgOptimizedImage` en todas las imágenes, sin `CommonModule`, plantillas inline en componentes pequeños.

Assets en `public/`: `img/` (AVIF/WebP en 2–3 anchos), `cv/`, `og/cover.jpg` (1200×630), `robots.txt`, `sitemap.xml`, favicon SVG.

---

## 3. Design tokens

Definidos en `src/styles.css` (`@theme`), Tailwind los convierte en utilidades. Los actuales son **provisionales**.

### Color — elegir uno como acento (todos verificados WCAG AA sobre el fondo)

| Opción | Acento | Contraste sobre `#07060d` | Carácter |
|---|---|---|---|
| A · Lavanda | `#b9a4ff` | 9.43 : 1 | La familia morada que te gustó, sin ser el `purple-600` de Tailwind de Candela (3.75 : 1, no pasa AA) |
| B · Índigo | `#8b9cff` | 7.97 : 1 | Más técnico y frío, se separa más de la referencia |
| C · Magenta | `#f07ccf` | 8.16 : 1 | Más cálido y memorable, menos común en portafolios dev |

Base común: fondo `#07060d`, superficie `#100e1a` / `#181528`, borde `#2a2540`, texto `#ece9f5` (16.9 : 1), texto secundario `#a7a1bd` (8.1 : 1). Botón primario: texto oscuro sobre el acento (≥ 7 : 1).

### Tipografía (autoalojada, `font-display: swap`, subset latino, sin Google Fonts)
- **Display** (H1/H2): una grotesca con carácter — propuesta *Space Grotesk* o *Sora*.
- **Texto**: *Inter* variable o fuente del sistema.
- **Código** (tarjeta `perfil.ts`): *JetBrains Mono*.

### Escala
- Espaciado: escala de 4 px de Tailwind; ritmo vertical entre secciones `py-24` (móvil `py-16`).
- Tipos: `text-sm`→`text-base` cuerpo, H2 `text-3xl/4xl`, H1 `text-4xl → text-6xl` con `text-balance`.
- Radios: `--radius-card: 1rem`, botones `rounded-full`.
- Sombras: mínimas; profundidad con bordes y superficies, no con glow.

---

## 4. Fases

### Fase 0 — Fundaciones ✅ parcial
- [x] Angular 22 + Tailwind 4 + zoneless + prerender estático
- [x] Shell accesible (skip link, `<main>`), estilos base (foco, reduced-motion)
- [ ] Repo en GitHub + **deploy automático desde el día 1** (GitHub Actions)
- [ ] Tokens finales (color + fuentes autoalojadas)
- [ ] `core/seo.ts` + `robots.txt` + `sitemap.xml` + favicon + JSON-LD `Person`

**Terminado cuando:** cada push a `main` publica el sitio y la URL pública responde.

### Fase 1 — MVP publicable
- [ ] `data/` con contenido real (perfil, 1 experiencia, 3 proyectos)
- [ ] `nav` (sidebar + barra inferior) con `active-section`
- [ ] `hero` + `code-card`
- [ ] `experience` (caso destacado)
- [ ] `projects` (portadas, sin galería aún)
- [ ] `contact` + copiar email
- [ ] `footer`

**Terminado cuando:** el sitio se puede enviar a un reclutador; Lighthouse móvil ≥ 90 en las 4 categorías; 0 errores axe.

### Fase 2 — Contenido completo
- [ ] Galería de proyecto en `<dialog>` con teclado y `@defer`
- [ ] Línea de tiempo del resto de la experiencia
- [ ] `education`
- [ ] Imagen OG 1200×630 y verificación de vista previa en LinkedIn/WhatsApp

### Fase 3 — Pulido
- [ ] Directiva `reveal` (progresiva, respeta reduced-motion)
- [ ] Microinteracciones de hover/foco
- [ ] Lighthouse 100 en SEO / Accesibilidad / Buenas prácticas; Rendimiento ≥ 95
- [ ] Pruebas unitarias de la lógica: `active-section`, copiar email, `seo`

### Fase 4 — Opcional
- [ ] Inglés (`/es`, `/en`, `hreflang`)
- [ ] Dominio propio
- [ ] Analítica sin cookies (p. ej. Cloudflare Web Analytics)
- [ ] Páginas de caso de estudio por proyecto

---

## 5. Contenido que necesito de ti

- [ ] Nombre como quieres que aparezca y rol (ej. "Frontend Developer · Angular")
- [ ] Propuesta de valor en una frase (te propongo 3 versiones si me cuentas tu experiencia)
- [ ] Años de experiencia y 3–4 datos para las métricas del hero
- [ ] Foto (la optimizo a AVIF/WebP)
- [ ] CV en PDF
- [ ] **1 experiencia destacada**: empresa/cliente, rol, período, problema, qué hiciste, impacto (números si hay), stack, imagen
- [ ] Resto de experiencia (empresa, rol, período, 1 línea)
- [ ] 3–4 proyectos: nombre, captura, descripción, stack, demo, repo, permiso
- [ ] Formación: título universitario + certificaciones relevantes
- [ ] Email, LinkedIn, GitHub, (WhatsApp)
- [ ] Opción de color (A / B / C) y si te gusta la propuesta de fuentes

---

## 6. Criterios de calidad (no negociables)

| Métrica | Objetivo |
|---|---|
| Lighthouse móvil | ≥ 90 en todo; meta 100 en SEO / A11y / BP |
| LCP · CLS · INP | < 2.5 s · < 0.1 · < 200 ms |
| JS inicial transferido | < 150 KB (hoy 64 KB) |
| Accesibilidad | 0 violaciones axe, navegación completa por teclado, contraste AA |
| SEO | HTML prerenderizado con todo el contenido, canonical correcto, OG con URL absoluta |
| Seguridad | `npm audit` en 0 antes de cada release |
