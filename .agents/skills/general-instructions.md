# PediWell — Manual Técnico para Desarrollo

### Basado en el mockup visual final (`PediWell_Mockup_Visual.pdf`) y su código fuente de referencia

## ⚠️ Léase primero: esto es un piso, no un techo

Este mockup y este manual son el **punto de partida**, no el diseño final a copiar pixel por pixel. Se construyó con herramientas de renderizado básicas (CSS plano, sin librerías de animación, con fotos reales pero genéricas) para comunicar dirección de marca, estructura y tono — no para ser la versión definitiva.

**Lo que se espera del programador a partir de aquí:**

- Mejorar la fotografía donde sea posible (esto ya está marcado sección por sección — ver punto 5)
- Implementar animaciones reales y pulidas (el mockup es estático; el punto 6 da la dirección de comportamiento, pero el detalle de la ejecución — easing, micro-interacciones, transiciones entre páginas — queda a su criterio técnico y buen ojo)
- Afinar espaciados, proporciones y detalles finos que solo se ven bien probando en navegador real, con Astro/Tailwind, en distintos tamaños de pantalla
- Proponer mejoras donde vea una oportunidad — esto no es una orden de "hacerlo así", es la base de la que partir hacia algo mejor

Los valores exactos de las secciones siguientes (colores, tamaños, sombras) son la **base de marca que sí debe respetarse** — eso es lo no negociable. Todo lo demás (calidad de ejecución, animaciones, refinamiento visual) se espera que el programador lo lleve más lejos de lo que este mockup logra mostrar con sus herramientas limitadas.

**Esto también aplica a la estructura, no solo al pulido visual.** El orden de secciones, los componentes (hero full-bleed, tarjeta de cifras, franja oscura, etc.) y la forma de resolver cada bloque son una propuesta funcional, no la única forma correcta de hacerlo. Si el programador conoce un patrón de UI mejor, una plantilla premium, una librería de animación (GSAP, Framer Motion o equivalente en Astro), o una forma distinta de resolver una sección que se vea y funcione mejor, tiene total libertad de proponerla y usarla — siempre que respete la identidad de marca (colores, tipografía, tono) definida en este documento. No se trata de reproducir este esqueleto tal cual, sino de usarlo como piso estructurado desde el cual construir algo de mayor calidad.

---

**Cómo usar el resto de este manual:** el PDF del mockup muestra el **qué** (cómo se ve cada pantalla, como punto de partida). Este documento da el **cómo** de esa base (valores exactos de código: colores, tipografía, sombras, espaciados) para que la implementación en Astro + Tailwind arranque desde ahí, no desde cero ni adivinando.

Junto a este manual se entrega `PediWell_Mockup_Codigo_Fuente.zip`, con el HTML y CSS reales que generaron el PDF. **No es el código final** (está hecho con CSS plano para renderizar el mockup, no con Tailwind/Astro), pero cada valor de color, sombra, radio y tamaño de fuente en ese CSS es el valor definitivo a usar — el programador puede copiar los números directamente en vez de medirlos desde una imagen.

---

## 0. Datos de negocio (recordatorio)

| Campo        | Valor                                               |
| ------------ | --------------------------------------------------- |
| WhatsApp     | +593 999 000 656 → `https://wa.me/593999000656`     |
| Dirección    | Av. Oswaldo Guayasamín S/N, Cumbayá, Quito, Ecuador |
| Razón social | PASEOSALUD S.A.S.                                   |

## 1. Sitemap real (4 páginas, confirmado contra el sitio actual)

```
/               → Nosotros (funciona como home / landing)
/servicios      → Catálogo completo de tratamientos
/contacto       → Ubicación + formulario + WhatsApp (fusiona contacto y ubicación)
/blog           → Índice de artículos
```

El botón **"Reservar cita"** vive en el header de las 4 páginas y apunta a `/contacto`. No es una pestaña de navegación.

---

## 2. Design tokens — copiar tal cual

### Colores (variables CSS ya definidas, usar como `--color-*` en Tailwind config)

```css
--terracota: #e2a996; /* CTAs, acentos, links activos, íconos */
--arena: #ffe7d7; /* fondos de sección alterna */
--marron: #7f655e; /* texto de énfasis, headers, footer, franjas oscuras */
--rosa: #e0b6a5; /* formas decorativas, hover, quote marks */
--gris: #919191; /* texto secundario, metadatos */
--fondo-base: #fffaf6; /* fondo general del body — NUNCA #FFFFFF puro */
--ink: #3a2e2b; /* texto de cuerpo por defecto */
```

⚠️ **Importante:** el fondo del `<body>` es `#FFFAF6`, no blanco puro. Este detalle es intencional — el blanco puro se veía "vacío/clínico" en las primeras iteraciones del mockup; el tono cálido es lo que da la sensación premium.

### Tipografía

| Uso                                | Familia                   | Fallback en el mockup                           |
| ---------------------------------- | ------------------------- | ----------------------------------------------- |
| Cuerpo, UI, botones, menús         | DM Sans (todos los pesos) | Poppins (usado en el mockup por disponibilidad) |
| Titulares grandes (H1, H2, cifras) | George Town / Bochan      | Lora (usado en el mockup por disponibilidad)    |

**Escala tipográfica exacta usada en el mockup:**

| Elemento                                     | Tamaño                   | Line-height | Notas                                      |
| -------------------------------------------- | ------------------------ | ----------- | ------------------------------------------ |
| H1 hero full-bleed                           | 66px                     | 1.08        | `letter-spacing: -.5px`                    |
| H1 hero interior (si no es full-bleed)       | 62px                     | 1.1         |                                            |
| H2 de sección (`.section-head h2`)           | 42px                     | 1.2         | `letter-spacing: -.3px`                    |
| H1 de page-hero (subpáginas)                 | 42px                     | normal      |                                            |
| Cifra grande (`.dark-band .num`)             | 52px                     | —           | familia display                            |
| Cifra tarjeta flotante (`.stats-float .num`) | 40px                     | —           | familia display                            |
| Título de card de servicio                   | 21px                     | —           | familia display                            |
| Eyebrow (antetítulo)                         | 13px                     | —           | uppercase, `letter-spacing: 3px`, bold 700 |
| Body / párrafo                               | 15.5–19px según contexto | 1.6–1.7     | Poppins/DM Sans regular                    |

### Sombras (todas con tinte de marca, nunca gris puro)

```css
/* Botón primario */
box-shadow: 0 10px 24px -8px rgba(226, 169, 150, 0.75);
/* Botón WhatsApp */
box-shadow: 0 10px 24px -8px rgba(37, 211, 102, 0.55);
/* Cards de servicio */
box-shadow: 0 16px 40px -12px rgba(127, 101, 94, 0.28);
/* Foto en split (Nosotros/Servicios) */
box-shadow: 0 26px 50px -20px rgba(127, 101, 94, 0.4);
/* Tarjeta de cifras flotante sobre el hero */
box-shadow: 0 30px 60px -20px rgba(58, 46, 43, 0.35);
```

### Radios de borde

| Elemento                       | Radio          |
| ------------------------------ | -------------- |
| Botones                        | 30px (píldora) |
| Cards, fotos grandes, mapa     | 20–24px        |
| Tarjeta de cifras flotante     | 22px           |
| Badge circular de paso (steps) | 50% (círculo)  |

---

## 3. Componentes — especificación por pieza

### 3.1 Header / navegación

- Fondo blanco sólido, `padding: 22px 64px`
- Logo a la izquierda (usar `logo_color_crop.png` del paquete de assets — extraído directo del brandbook)
- Nav: Nosotros · Servicios · Contacto · Blog — pestaña activa con `color: var(--terracota)` y `border-bottom: 2px solid`
- Botón "Reservar cita" siempre visible a la derecha, estilo `.btn-primary`

### 3.2 Hero full-bleed (usado en las 4 páginas)

Este es el componente más importante del rediseño — reemplaza el hero dividido (foto a un lado) del mockup inicial.

- Foto de fondo a **ancho completo**, `background-size: cover`
- Overlay oscuro obligatorio para legibilidad — **usar este gradiente exacto**, no un overlay plano:
  ```css
  background: linear-gradient(
    100deg,
    rgba(42, 32, 29, 0.92) 0%,
    rgba(42, 32, 29, 0.82) 38%,
    rgba(42, 32, 29, 0.55) 62%,
    rgba(42, 32, 29, 0.25) 100%
  );
  ```
  (De oscuro a la izquierda donde va el texto, a más transparente a la derecha donde se ve la foto.)
- Texto en blanco / `#F3E4DB` para el subtítulo
- Altura mínima 780px en desktop; en el home (`/`) lleva además la tarjeta de cifras flotante superpuesta (ver 3.3)
- En subpáginas (Servicios, Contacto, Blog) puede ser más bajo (~420–460px) y sin la tarjeta de cifras

**Nota técnica de implementación:** si se usa Tailwind con un overlay vía pseudo-elemento, evitar la propiedad shorthand `inset: 0` si se necesita compatibilidad con herramientas de renderizado antiguas — usar `top/right/bottom/left: 0` explícitos. En Astro/Tailwind moderno esto no aplica, es solo una nota de la limitación que tuvimos al generar el PDF del mockup.

### 3.3 Tarjeta de cifras flotante (solo en Nosotros/Home)

- Se monta con `margin-top: -70px` sobre el borde inferior del hero, fondo blanco, `border-radius: 22px`
- 3 columnas iguales, separadas por borde vertical `1px solid #F1E4DC`
- Cifras actuales a usar: **10+ años de experiencia · 2.000+ pacientes atendidos · 4.9★ satisfacción promedio**

### 3.4 Franja oscura de marca (`.dark-band`)

Elemento de contraste — usar entre 1 y 2 veces por sitio, no abusar (pierde impacto si se repite mucho). En el mockup aparece una vez, en Nosotros, entre "Quiénes somos" y los servicios destacados.

- Fondo `var(--marron)` sólido, `padding: 100px 64px`
- Título centrado en blanco, tamaño 40px, familia display
- Fila de 3 cifras en `var(--rosa)`, tamaño 52px

### 3.5 Cards de servicio

- Foto real como fondo del `.thumb` (230px alto) con degradado oscuro inferior (`linear-gradient(180deg, transparent 55%, rgba(58,46,43,.55) 100%)`) para que el título se lea encima de la foto, no debajo en texto plano
- Título superpuesto en la esquina inferior izquierda de la foto (blanco, bold)
- Cuerpo de card: solo descripción corta + link, sin repetir el título

### 3.6 Placeholder de "foto pendiente" (para servicios/artículos sin foto real aún)

No usar bloques de color plano. Usar:

- Degradado de marca: `linear-gradient(150deg, #F3DFD2 0%, #E7C3AF 45%, #D9A98F 100%)`
- Ícono de huella en trazo blanco fino centrado (SVG incluido en el código fuente entregado)
- Etiqueta pequeña "Foto pendiente" en la esquina superior izquierda (fondo blanco 85% opacidad, texto marrón, todo mayúsculas, `border-radius: 20px`)

### 3.7 Reseñas

- Comilla decorativa grande (`font-size: 54px`, color `var(--rosa)`, familia display) antes de las estrellas
- Estrellas en `var(--terracota)`
- Cita en itálica

### 3.8 Formas decorativas orgánicas (clase `.deco` / `::before` y `::after`)

Presentes en casi todas las secciones (hero, page-hero, secciones de cards, franja oscura) para evitar sensación de vacío:

- Círculos grandes (360–700px de diámetro), `border-radius: 50%`, opacidad entre .04 y .35 según el fondo
- Colores: `var(--rosa)` sobre fondos claros, blanco a 4% sobre la franja oscura
- Posicionados parcialmente fuera del contenedor (`top: -180px`, etc.) para que se vean como un recorte, no un círculo completo

### 3.9 Footer

- Fondo `var(--marron)` sólido
- Logo en versión blanca/negativa (`logo_white_on_black.png`)
- 4 columnas: marca+descripción / navegación / contacto / redes

### 3.10 Botón flotante de WhatsApp

- Círculo 62px, fondo `#25D366`, ícono blanco, fijo en esquina inferior derecha
- Link: `https://wa.me/593999000656?text=Hola%20PediWell%2C%20quiero%20agendar%20una%20cita`

---

## 4. Composición por página (orden real de secciones)

### `/` — Nosotros (home)

1. Hero full-bleed + tarjeta de cifras flotante
2. Split "Quiénes somos" (foto + texto de filosofía)
3. **Franja oscura** de compromiso/cifras
4. 3 cards de servicios prioritarios (Profilaxis, Hongos, Uñas encarnadas)
5. Reseñas (3 cards curadas manualmente)
6. Split de ubicación resumida (mapa placeholder + "Cómo llegar" → enlaza a `/contacto`)
7. CTA de cierre a pantalla completa (foto real + botón)
8. Footer

### `/servicios`

1. Hero full-bleed (más bajo, sin tarjeta de cifras)
2. 3 bloques `.split` alternados (foto real izq/der) para los 3 tratamientos prioritarios, cada uno con CTA propio
3. Catálogo completo — 6 cards restantes con placeholder de "foto pendiente"
4. FAQ (dentro de una franja `.alt` color arena, NUNCA flotando en blanco — ver nota abajo)
5. CTA de cierre a pantalla completa
6. Footer

### `/contacto`

1. Hero full-bleed (bajo)
2. Split: mapa (placeholder, reemplazar por embed real de Google Maps) + datos (dirección, horarios pendientes, botones Maps/WhatsApp)
3. Formulario (nombre, teléfono, motivo) dentro de franja `.alt` — el botón real de envío debe ser WhatsApp, no un submit tradicional
4. Footer

### `/blog`

1. Hero full-bleed (bajo)
2. Grid de artículos (cards con placeholder "foto pendiente" hasta tener imágenes propias por artículo)
3. Footer

**Nota sobre la sección FAQ de Servicios:** en una iteración anterior del mockup, el FAQ vivía centrado sobre fondo blanco con mucho margen vacío a los lados — se sentía "vacío". La corrección fue envolverlo en una franja `.alt` (arena) de ancho completo, con el contenido centrado en un `max-width: 800px` por legibilidad. Aplicar el mismo criterio a cualquier bloque de texto angosto: **el fondo debe llenar el ancho completo aunque el texto no lo haga.**

---

## 5. Inventario de assets

### Ya disponibles (reales, extraídos del brandbook — en el .zip adjunto)

| Archivo                   | Uso en el mockup                                | Origen                                       |
| ------------------------- | ----------------------------------------------- | -------------------------------------------- |
| `logo_color_crop.png`     | Header, logo principal                          | Brandbook, página de identidad corporativa   |
| `logo_white_on_black.png` | Footer (fondo oscuro)                           | Brandbook, página de aplicaciones cromáticas |
| `hero_cover.jpg`          | Hero de Nosotros/Home                           | Brandbook, portada                           |
| `closing_feet.jpg`        | CTA de cierre, hero de Servicios (recorte)      | Brandbook, página final                      |
| `real_heel_arch.jpg`      | Card "Profilaxis Podal", hero de Blog (recorte) | Recorte propio de `hero_cover.jpg`           |
| `real_toes.jpg`           | Card "Tratamiento de Hongos"                    | Recorte propio de `hero_cover.jpg`           |
| `real_soles.jpg`          | Card "Uñas Encarnadas", hero de Servicios       | Recorte propio de `closing_feet.jpg`         |
| `real_ankles.jpg`         | Hero de Contacto                                | Recorte propio de `closing_feet.jpg`         |

⚠️ Estas son fotos reales de PediWell pero **genéricas** (no documentan un tratamiento específico) — sirven para lanzar con una estética consistente, pero deben reemplazarse por fotografía real de cada procedimiento en cuanto esté lista la sesión profesional.

### Pendientes de sesión fotográfica profesional

- Las 6 categorías restantes del catálogo de Servicios (Podología general, Quiropodia, Pie diabético, Plantillas, Podología deportiva, Domicilio)
- Fotos de equipo/staff para Nosotros
- Imagen destacada por artículo de Blog
- Mapa: reemplazar el placeholder por el embed real de Google Maps con la dirección confirmada

---

## 6. Animaciones (el mockup es estático — esto es la especificación de comportamiento)

| Elemento                   | Comportamiento                                                                  |
| -------------------------- | ------------------------------------------------------------------------------- |
| Secciones al hacer scroll  | Fade-in + desplazamiento vertical de 16–24px, 400–600ms, ease-out, una sola vez |
| Botones                    | Transición de color/sombra en hover, 200ms                                      |
| Fotos de cards             | Zoom leve (`scale(1.03–1.05)`) en hover, `overflow: hidden` en el contenedor    |
| Botón flotante de WhatsApp | Pulso sutil cada 8–10 segundos                                                  |

---

## 7. SEO técnico — checklist

- [ ] Corregir `canonical` (actualmente apunta a `astrowind.vercel.app` en el sitio en vivo — crítico)
- [ ] Meta title/description únicos por página (ver tabla abajo)
- [ ] Schema.org `MedicalClinic` + `LocalBusiness` con dirección, teléfono, geo-coordenadas
- [ ] Alt text descriptivo en cada imagen real (no "foto1.jpg")
- [ ] Sitemap.xml actualizado con las 4 URLs reales

| Página       | Title                                            | Meta description                                                                                                          |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `/`          | PediWell — Clínica Podológica Premium en Cumbayá | Cuidado experto para tus pies en Cumbayá. Profilaxis podal, tratamiento de hongos y uñas encarnadas con equipo colegiado. |
| `/servicios` | Servicios de Podología en Cumbayá \| PediWell    | Profilaxis podal, tratamiento de hongos, uñas encarnadas y más. Conoce todos los servicios de PediWell.                   |
| `/contacto`  | Cómo Llegar y Contactar a PediWell \| Cumbayá    | Visita PediWell en Av. Oswaldo Guayasamín S/N, Cumbayá, o agenda tu cita por WhatsApp.                                    |
| `/blog`      | Blog de Salud Podológica \| PediWell Cumbayá     | Consejos y guías sobre el cuidado de tus pies, del equipo de PediWell.                                                    |

---

## 8. Contenido de la entrega

- `PediWell_Mockup_Visual.pdf` — referencia visual pixel-perfect de las 4 páginas
- `PediWell_Mockup_Codigo_Fuente.zip` — HTML + CSS que generó ese PDF (`nosotros.html`, `servicios.html`, `contacto.html`, `blog.html`, `style.css`, carpeta `assets/` con las fotos reales listas para usar)
- Este manual — valores exactos y justificación de cada decisión

**Nota final:** las etiquetas negras/verdes/azules con ✎ que aparecen en el PDF (ej. "H1 con servicio + ciudad → SEO") son anotaciones de diseño para este handoff — **no van en el sitio real**, se eliminan al implementar. En el código fuente del .zip corresponden a la clase `.note` — se puede borrar ese bloque completo del CSS al construir el sitio final.

**Recordatorio:** este documento define la base de marca (colores, tipografía, estructura). La calidad final del sitio — fotografía, animaciones, pulido de detalle — depende del criterio y ejecución del programador a partir de aquí. El objetivo es que el sitio en vivo se vea **mejor** que este mockup, no idéntico a él.
