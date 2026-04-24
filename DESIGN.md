# HAH — Design System

> Guía de diseño para la interfaz de HAH. Toda UI generada — por humanos o agentes — debe seguir este documento para mantener coherencia visual.

---

## Principios

1. **Información primero.** El diseño sirve al dato, no al revés. Si un elemento no comunica nada útil, no existe.
2. **Precisión, no decoración.** Sin sombras innecesarias, gradientes, ilustraciones ni animaciones llamativas. El rigor visual transmite confianza.
3. **Densidad intencional.** Las pantallas deben sentirse llenas de información sin sentirse abrumadoras. Spacing constante, no generoso.
4. **Monocromo con color semántico.** La paleta base es casi sin color. El color aparece para comunicar estado (éxito, error, advertencia, información), nunca solo para decorar.
5. **Tipografía como jerarquía.** `Geist Mono` para datos, labels, métricas, nav. `Geist` para texto de lectura. El tipo de fuente comunica el tipo de contenido.

---

## Color

Todos los colores se usan vía CSS variables definidas en `src/shared/assets/css/main.css`. **Nunca** hardcodear valores hex en componentes.

### Base (neutros)

| Variable      | Valor     | Uso                                              |
|---------------|-----------|--------------------------------------------------|
| `--bg`        | `#f7f7f5` | Fondo de página principal                        |
| `--bg2`       | `#ffffff` | Fondo de secciones elevadas (nav, cards, footer) |
| `--ink`       | `#0f0f0e` | Texto principal, fondos oscuros (hero dark)      |
| `--ink2`      | `#6b6b68` | Texto secundario, labels, subtítulos             |
| `--ink3`      | `#a8a8a5` | Texto terciario, placeholders, timestamps        |
| `--border`    | `#e2e2de` | Bordes estándar — dividers, secciones            |
| `--border2`   | `#c8c8c4` | Bordes enfatizados — botones ghost               |

### Semánticos

Cada color semántico tiene 4 variantes: fondo (`-bg`), borde medio (`-mid`), texto/icono base, y oscuro (`-dk`) donde aplica.

| Nombre   | Base      | `-bg`     | `-mid`    | Uso                                   |
|----------|-----------|-----------|-----------|---------------------------------------|
| `green`  | `#16a34a` | `#f0fdf4` | `#bbf7d0` | Éxito, hábitos positivos, streak      |
| `amber`  | `#d97706` | `#fffbeb` | `#fde68a` | Advertencia, work-in-progress, alerta |
| `red`    | `#dc2626` | `#fef2f2` | `#fecaca` | Error, hábitos negativos, relapse     |
| `blue`   | `#2563eb` | `#eff6ff` | `#bfdbfe` | Información, links, Firebase          |
| `purple` | `#7c3aed` | `#f5f3ff` | `#ddd6fe` | Frecuencias, programación             |

**Regla de uso semántico:**
- Un badge que diga "work in progress" es `amber`, no `blue`.
- Un estado de error es siempre `red`.
- Una confirmación o streak activo es siempre `green`.
- Información neutral es `blue`.
- Nunca usar colores semánticos como decoración sin un estado real detrás.

### Contexto oscuro (hero dark)

El hero de la landing usa `background: var(--ink)`. Dentro de ese contexto:
- Texto: `#fff` / `rgba(255,255,255,0.5)` / `rgba(255,255,255,0.25)`
- Bordes: `#2e2e2b` / `#2a2a28`
- Fondos de panel: `#1a1a18`
- El verde del streak: `#22c55e` (nivel 3), `#15803d` (nivel 2), `#166534` (nivel 1)

---

## Tipografía

### Fuentes

```css
--mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
--sans: 'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif;
```

Cargadas desde Google Fonts en `main.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&family=Geist:wght@300;400;500;600&display=swap');
```

### Cuándo usar cada una

| Contexto                              | Fuente       |
|---------------------------------------|--------------|
| Navegación, labels, eyebrows, chips   | `Geist Mono` |
| Títulos de hero y secciones clave     | `Geist Mono` |
| Métricas, valores numéricos           | `Geist Mono` |
| Descripciones, cuerpo de texto        | `Geist`      |
| Pasos, features text                  | `Geist`      |

### Escala de tamaños

**Regla obligatoria:** no hardcodear `font-size` en componentes. Toda escala tipográfica debe salir de variables globales definidas en `main.css`.

```css
--text-xs: 0.75rem; /* 12px */
--text-xs--line-height: calc(1 / 0.75);
--text-sm: 0.875rem; /* 14px */
--text-sm--line-height: calc(1.25 / 0.875);
--text-base: 1rem; /* 16px */
--text-base--line-height: calc(1.5 / 1);
--text-lg: 1.125rem; /* 18px */
--text-lg--line-height: calc(1.75 / 1.125);
--text-xl: 1.25rem; /* 20px */
--text-xl--line-height: calc(1.75 / 1.25);
--text-2xl: 1.5rem; /* 24px */
--text-2xl--line-height: calc(2 / 1.5);
--text-3xl: 1.875rem; /* 30px */
--text-3xl--line-height: calc(2.25 / 1.875);
--text-4xl: 2.25rem; /* 36px */
--text-4xl--line-height: calc(2.5 / 2.25);
--text-5xl: 3rem; /* 48px */
--text-5xl--line-height: 1;
--text-6xl: 3.75rem; /* 60px */
--text-6xl--line-height: 1;
--text-7xl: 4.5rem; /* 72px */
--text-7xl--line-height: 1;
--text-8xl: 6rem; /* 96px */
--text-8xl--line-height: 1;
--text-9xl: 8rem; /* 128px */
--text-9xl--line-height: 1;
```

| Uso                         | Tamaño | Peso | Notas                              |
|-----------------------------|--------|------|------------------------------------|
| Eyebrow / label / chip      | `--text-xs` / `--text-sm` | 500–600 | Uppercase, letter-spacing 0.1–0.14em |
| Nav links                   | `--text-xs` / `--text-sm` | 500 | Mono                               |
| Body / descriptions         | `--text-sm` / `--text-base` | 400 | Sans, line-height 1.65           |
| Feature labels / step desc  | `--text-sm` / `--text-base` | 600 / 400 |                           |
| Hero title                  | `--text-5xl` / `--text-6xl` | 600 | Mono, letter-spacing -0.02 a -0.03em |
| CTA title                   | `--text-xl` / `--text-2xl` | 600 | Mono                               |
| Métricas                    | `--text-xl`                | 600 | Mono, letter-spacing -0.02em       |
| Paso numérico (01, 02…)     | `--text-4xl`              | 600 | Mono, color `--border2`            |

---

## Layout y espaciado

```css
--max:    1200px;   /* ancho máximo del contenido */
--gutter: 24px;     /* padding lateral del wrap */
```

### Alturas fijas (elementos de chrome)

| Elemento           | Altura |
|--------------------|--------|
| Nav principal      | 44px   |
| Footer             | 44px   |
| Tech ribbon        | 44px   |
| Crumb bar          | 36px   |
| Section eyebrow    | 40px   |

### Padding de secciones

| Tipo de sección             | Padding vertical |
|-----------------------------|------------------|
| Hero (dark)                 | 72px top, 64px bottom |
| Secciones de contenido      | 56px arriba y abajo |
| Secciones compactas         | 32px             |

### Grids principales

| Grid                         | Columnas          | Responsivo                  |
|------------------------------|-------------------|-----------------------------|
| Hero (copy + visual)         | `1fr 380px`       | 1 col en < 860px            |
| Métricas                     | `repeat(4, 1fr)`  | 2 col en < 640px            |
| Features                     | `repeat(3, 1fr)`  | 2 en < 768px, 1 en < 480px  |
| Steps "How it works"         | `repeat(3, 1fr)`  | 1 col en < 640px            |
| Log / activity               | `flex row`        | —                           |

### Divisores en lugar de cards

Las secciones se separan con `border-bottom: 1px solid var(--border)`, no con cards con sombra.  
Los grids internos usan `border-right` entre columnas en lugar de `gap`.

```css
/* ✅ Correcto */
.metric { border-right: 1px solid var(--border); }
.metric:last-child { border-right: none; }

/* ❌ Incorrecto */
.metric { box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; }
```

---

## Border radius

| Contexto                     | Valor |
|------------------------------|-------|
| Botones                      | 2px   |
| Chips / badges               | 2px   |
| Iconos cuadrados             | 2px   |
| Streak cells                 | 1px   |
| Paneles (streak-panel, widget)| 3px  |
| Todo lo demás                | 0px   |

**Regla:** nunca usar `rounded-lg`, `rounded-xl` ni valores superiores a 3px. El look es preciso, no suave.

---

## Componentes

### Nav

```
┌──────────────┬─────────────────────────────┬──────────────────┐
│ ◆ HAH        │ Overview  Features  Activity │   Sign in  CTA → │
│  (logo + mono)│ (border-right entre links)  │ (border-left)    │
└──────────────┴─────────────────────────────┴──────────────────┘
                                44px height
```

- Sticky, `z-index: 50`, fondo `--bg2`, `border-bottom`
- Logo: icono azul (`--blue`) + wordmark mono 12px tracking 0.12em
- Links: mono 11–12px, `--ink2`, hover cambia a `--ink` + `--bg` de fondo
- Separadores verticales: `border-right: 1px solid var(--border)` entre zonas
- Acciones: `border-left` para separar del nav
- **Responsive (< 600px):** se ocultan los links de nav y el botón "Sign in". Solo permanecen brand + botón CTA principal.

### Botones

| Variante     | Fondo         | Borde          | Texto  | Altura | Uso                      |
|--------------|---------------|----------------|--------|--------|--------------------------|
| Primary      | `--ink`       | `--ink`        | `#fff` | 34–38px | Acción principal        |
| Ghost        | transparente  | `--border2`    | `--ink2`| 34px  | Acción secundaria       |
| White        | `#fff`        | `#fff`         | `--ink`| 36px   | Sobre fondo oscuro (hero)|
| Light (CTA)  | `#fff`        | `#fff`         | `--ink`| 36–38px| Sobre dark band         |

Todos: `font-family: var(--mono)`, `font-size: 12px`, `font-weight: 500`, `border-radius: 2px`, `disabled: opacity 0.4`.

### Chips / badges

```css
.chip {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 2px;
}
```

| Variante     | bg            | border         | color            |
|--------------|---------------|----------------|------------------|
| `chip-flat`  | `--bg`        | `--border`     | `--ink3`         |
| `chip-green` | `--green-bg`  | `--green-mid`  | `--green-dk`     |
| `chip-amber` | `--amber-bg`  | `--amber-mid`  | `--amber`        |
| `chip-red`   | `--red-bg`    | `--red-mid`    | `--red`          |
| `chip-blue`  | `--blue-bg`   | `--blue-mid`   | `--blue`         |

### Iconos cuadrados (feature-icon / log-icon)

```css
.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30–32px;
  height: 30–32px;
  border-radius: 2px;
  border: 1px solid {color}-mid;
  background: {color}-bg;
  color: {color};
}
```

Colores disponibles: `green`, `red`, `blue`, `purple`, `amber` (usando las variables semánticas).

### Section eyebrow

Barra de 10px uppercase mono que encabeza cada sección de contenido:

```css
.section-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink3);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 32px;
}
```

### Pasos numerados (01 / 02 / 03)

```css
.step-number { font-family: var(--mono); font-size: 32px; font-weight: 600; color: var(--border2); }
.step-label  { font-size: 14px; font-weight: 600; color: var(--ink); }
.step-desc   { font-size: 13px; color: var(--ink2); line-height: 1.65; }
```

Los pasos se dividen con `border-right: 1px solid var(--border)` y tienen padding lateral simétrico.

---

## Contextos de página

### Landing (usuario no autenticado)

- Estructura: `AppLayout` → Hero dark | Ribbon | Steps | Features | CTA
- Hero: fondo `var(--ink)`, tipografía blanca, streak grid visual
- Resto: alternancia `--bg` / `--bg2` entre secciones, separadas por `border-bottom`
- CTA: sin dark-band completo; se integra en el flujo con fondo `--bg2`

### App autenticada (futuro)

- Mismo sistema de color y tipografía
- Nav igual, pero con avatar/nombre en lugar de "Sign in / Get started"
- Contenido en grids con `border-right` como divisores entre columnas de datos
- Métricas siempre en grid de 4 col con bordes, nunca en cards flotantes

---

## Anti-patterns

Nunca hacer esto en HAH:

```
❌ border-radius mayor a 3px en cualquier componente
❌ box-shadow salvo max: 0 0 0 1px var(--border) (outline sutil)
❌ gradientes de fondo decorativos
❌ colores semánticos (green, amber, red) para decorar sin estado real
❌ tipografía sans para labels, métricas o nav — eso es territorio mono
❌ gap en grids de métricas o features — usar border-right como divisor
❌ secciones sin border-bottom entre ellas
❌ padding vertical mayor a 72px en secciones interiores
❌ ilustraciones SVG decorativas
❌ animaciones de entrada (fade-in, slide, etc.) — el contenido aparece, no anima
```

---

## Archivos clave

| Archivo                                        | Rol                                              |
|------------------------------------------------|--------------------------------------------------|
| `src/shared/assets/css/main.css`               | CSS variables globales, fuentes, reset           |
| `src/shared/components/AppHeader.vue`          | Nav principal — referencia para el patrón de nav |
| `src/shared/components/AppLayout.vue`          | Shell de página con header y footer              |
| `src/pages/index.vue`                          | Landing — referencia completa del sistema visual |
