# Supermercado: gestión de inventario y carrito (SPA)

> **Actividad sumativa semana 3: Desarrollando sitios web con React avanzado**
> **Asignatura:** Desarrollo Frontend II (`PFY2202`)
> **Estudiante:** Felipe Peñaloza
> **Repositorio:** `supermercado-felipe-penaloza-pfy2202`
> **Sitio publicado (gh-pages):** <https://xhellex.github.io/supermercado-felipe-penaloza-pfy2202/>

---

## Descripción

Este proyecto continúa la formativa 2. Es un sitio de gestión de inventario para un supermercado, hecho con **React 19**, **React Router v7** y **Tailwind CSS v4**, y probado con **Vitest**.

Esta semana se agregó:

- **Filtro por categoría** en el listado. Se guarda en la URL y nunca modifica el inventario original.
- **Detalle de artículo**: se abre desde la tabla y permite agregar el artículo al carrito. Las unidades agregadas se descuentan del stock.
- **Carrito de compras**: una pantalla para aumentar, disminuir o quitar unidades. Cada cambio se refleja al mismo tiempo en el inventario.

## Cumplimiento de la pauta

| # | Criterio | Pts | Dónde se cumple |
| :-: | :--- | :-: | :--- |
| 1 | Pantalla de listado | 15 | `ListadoArticulos` + `TablaArticulos`: nombre (enlace al detalle), marca, tipo, stock, precio, estado de stock y acción. Muestra un conteo "Mostrando X de Y" y tiene `caption` y `scope` para accesibilidad. |
| 2 | Filtro con actualización dinámica del estado | 15 | `FiltrosArticulos` + `useSearchParams` (`?tipo=Lácteos&q=leche`). La lista se deriva con `filtrarArticulos()`, que no modifica el arreglo original (lo cubre una prueba). El filtro se mantiene al ir al detalle y volver. |
| 3 | Pantalla de detalle | 15 | `DetalleArticulo` en `/inventario/:id` con `useParams`. Muestra los datos completos, el estado de stock y las unidades en el carrito. La cantidad se limita al stock disponible y hay un aviso `role="status"`. Un id inexistente muestra "Artículo no encontrado". |
| 4 | Modificación con actualización del inventario | 15 | El reducer tiene las acciones `agregarAlCarrito`, `aumentar`, `disminuir` y `quitarDelCarrito`, que mueven unidades entre el stock y el carrito en una sola operación. Hay una prueba que comprueba que **stock + carrito se mantiene igual** después de cada acción. |
| 5 | Framework CSS y diseño responsive | 15 | Tailwind CSS v4 (`@tailwindcss/vite`), con el tema en `@theme` y componentes de estilo con `@apply` (`.control`, `.btn-*`). Usa utilidades responsivas (`sm:`, `md:`, `lg:`). El carrito se ve como tarjetas en el celular y como tabla desde `md:`. No hay estilos en línea. |
| 6 | Código modular y reutilizable | 15 | Carpetas `pages`, `components`, `context`, `routes`, `utils` y `data`. Los selectores y las validaciones se comparten entre páginas, y hay componentes reutilizables (`EncabezadoPagina`, `CampoFormulario`, `LineaCarrito`, `LlamadoAccion`, `Layout`). 89 pruebas unitarias. |
| 7 | GitHub, documentación y gh-pages | 10 | Este README y el sitio publicado con `npm run deploy` (rama `gh-pages`). Las rutas abiertas directamente funcionan gracias a `404.html`. |

## Rutas

Todas están definidas en `src/routes/AppRoutes.jsx`, anidadas bajo `Layout` (`<Outlet>`) y cargadas con `React.lazy` + `Suspense`.

| Ruta | Página |
| :--- | :--- |
| `/` | Inicio: indicadores y alertas de reposición |
| `/tiendas` | Nuestras tiendas |
| `/preguntas-frecuentes` | Preguntas frecuentes |
| `/inventario` | Listado con filtro por categoría y búsqueda |
| `/inventario/nuevo` | Agregar artículo (formulario validado) |
| `/inventario/:id` | **Detalle del artículo** y agregar al carrito |
| `/carrito` | **Carrito de compras** |
| `*` | Página 404 |

## Estado global

Usa Context API + `useReducer` (`src/context/`):

```text
{ articulos: [...], carrito: [{ id, cantidad }], siguienteId }
```

| Acción | Efecto |
| :--- | :--- |
| `agregarAlCarrito(id, n)` | Mueve `min(n, stock)` unidades del stock al carrito. Si no hay stock, no cambia nada. |
| `aumentar(id)` / `disminuir(id)` | Mueve de a 1 unidad. La línea sale del carrito cuando llega a 0. |
| `quitarDelCarrito(id)` | Devuelve todas las unidades al stock. |
| `agregar` / `eliminar` / `restaurar` / `reiniciar` | Alta con id único, baja (también del carrito), deshacer la baja y volver al inventario inicial. |

**Regla que siempre se cumple:** para cada artículo, stock + cantidad en el carrito = total. El carrito vive en el mismo reducer que el inventario porque depende del stock; así cada movimiento es una sola acción y no hay estados desincronizados. La búsqueda y el filtro no son estado global: viven en la URL del listado.

**Persistencia** (`almacenamiento.js`): el estado se guarda en `localStorage` con el formato `{ version: 2, ... }`. Al leerlo se valida la forma de cada artículo y del carrito. Si encuentra el formato de la semana 2 (un arreglo simple), lo migra. Si el JSON está dañado o es de otra versión, parte con el inventario inicial en vez de romper el sitio.

## Mejoras según la retroalimentación

### Semana 2

| Observación del docente | Cómo se abordó |
| :--- | :--- |
| Migrar a `react-router` | La dependencia y las 11 importaciones pasaron de `react-router-dom` a `react-router` (v7.18). |
| Expresiones regulares en `validar()` | Patrones con bandera `u` para nombre, marca, stock, stock mínimo y precio. Rechazan, por ejemplo, `-5`, `1.5`, `1e3`, `0100` y `<script>`. |
| Extraer reglas y esquema, con pruebas | `utils/validaciones.js` (`esquemaArticulo` + `validar`) con 38 pruebas. `NuevoArticulo` recorre el esquema con `map`. |
| Estilos de controles duplicados | `.control` y `.btn-*` con `@apply` en `index.css`. El borde de error sale de `aria-invalid`. |
| Separar `Campo` | Ahora es `components/CampoFormulario.jsx`. |
| Selectores compartidos | `utils/selectores.js` (`resumenInventario`, `tiposDisponibles`, `filtrarArticulos`, `lineasCarrito`, `totalCarrito`) con pruebas. Lo usan Home, el listado, el carrito y el menú. |
| Confirmar eliminación y avisar | `window.confirm` antes de eliminar (avisa si el artículo está en el carrito) y un aviso `role="status"` con **Deshacer**. Restaurar el inventario también pide confirmación. |
| Versionar y validar `localStorage` | Formato v2 con migración desde la S2. Ante datos dañados, vuelve al inventario inicial. 22 pruebas. |

### Semana 1 (resuelta en la semana 2 y mantenida)

| Observación | Estado |
| :--- | :--- |
| Rutas repetidas entre Encabezado y BottomNav | `data/rutas.js`, recorrido con `map` por ambos menús. |
| Encabezados de página repetidos | Componente `EncabezadoPagina`. |
| Llamado a la acción duplicado | Componente `LlamadoAccion`. |
| Home con demasiadas responsabilidades | `AlertaReposicion`, `FiltrosArticulos` y `TablaArticulos`. |
| Bootstrap, CSS extenso y `style` en línea | Solo Tailwind: `index.css` de 78 líneas (tema, base y componentes) y ningún `style=`. |

## Estructura

```text
src/
├── App.jsx                   Provider + BrowserRouter (basename para gh-pages)
├── routes/AppRoutes.jsx      Todas las rutas, anidadas bajo Layout, con lazy
├── context/
│   ├── inventario.js         Contexto, reducer (artículos + carrito) y useInventario()
│   ├── InventarioProvider.jsx useReducer + persistencia
│   └── almacenamiento.js     Formato versionado, migración y validación
├── components/               Layout, menús, EncabezadoPagina, CampoFormulario,
│                             FiltrosArticulos, TablaArticulos, LineaCarrito, ...
├── pages/                    Home, ListadoArticulos, DetalleArticulo, Carrito,
│                             NuevoArticulo, NuestrasTiendas, PreguntasFrecuentes, NotFound
├── utils/                    selectores, validaciones, formato CLP, estado de stock
└── data/                     Artículos iniciales, tipos, rutas del menú, tiendas, FAQ
```

Las pruebas (`*.test.js`) están junto al módulo que prueban.

## Cómo ejecutar

```bash
npm install
npm run dev       # http://localhost:5173/supermercado-felipe-penaloza-pfy2202/
npm test          # Vitest en modo watch (npm test -- --run para una sola pasada)
npm run lint
npm run build     # dist/ + 404.html
npm run preview   # sirve el build localmente
npm run deploy    # build y publicación en la rama gh-pages
```

El botón **Restaurar inventario inicial**, al pie del listado, vuelve a los 14 artículos de ejemplo y vacía el carrito.
