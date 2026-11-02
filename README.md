# Supermercado - Gestión de Inventario (SPA)

> **Actividad Formativa 2: Implementando gestión de estado en componentes frontend con React**
> **Asignatura:** Desarrollo Frontend II (`PFY2202`)
> **Estudiante:** Felipe Peñaloza
> **Repositorio de entrega:** `supermercado-felipe-penaloza-pfy2202`

---

## Descripción

Continuación de la Formativa 1: sitio de gestión de inventario de un supermercado hecho con **React 19**, **React Router v7** y **Tailwind CSS v4**.

Esta semana se agregó:

- Un **menú de inventario** nuevo, que lleva a dos páginas: el listado de artículos y el formulario de ingreso.
- Un **estado global** (Context API + `useReducer`) con la lista de artículos. Cada uno tiene nombre, marca y tipo de producto, además de stock, stock mínimo y precio.
- Un **formulario** para agregar artículos, con validación.
- Una **tabla** con todos los artículos del inventario, con búsqueda por nombre o marca y filtro por tipo.
- **Tailwind CSS** como framework de estilos en todo el sitio. Reemplaza a Bootstrap, que se usó en la semana 1.

## Cumplimiento de la pauta

| Criterio | Puntaje | Implementación |
| :--- | :---: | :--- |
| **1. Navegación y gestión de estados con tecnologías de React** | 40 | **Navegación:** `BrowserRouter`, `Routes` y `Route` en `App.jsx`; `NavLink` con ruta activa en los tres menús; `Link`; `useNavigate()` para ir al listado después de guardar, pasando el nombre del artículo por `state`; `useLocation()` para leer ese `state` y mostrar la ruta actual. **Estado global:** `InventarioContext` + `useReducer` (acciones `agregar`, `eliminar` y `reiniciar`), expuesto con el hook `useInventario()` y persistido en `localStorage`. Lo leen el menú (contador), el inicio (indicadores), el listado y el formulario. |
| **2. Framework CSS** | 20 | Tailwind CSS v4 con el plugin `@tailwindcss/vite`. El tema extendido con la paleta del sitio está en `@theme` dentro de `index.css`. Todo el sitio usa utilidades: responsivas (`md:`, `lg:`), de estado (`hover:`, `focus:`, `aria-*`) y `motion-safe:` para respetar la preferencia de reducir animaciones. |
| **3. Componente que responde a todos los requerimientos** | 40 | Nuevo menú → `MenuInventario.jsx`. Página para ingresar artículos → `NuevoArticulo.jsx`. Estado global con nombre, marca y tipo → `context/`. Tabla con todo el inventario → `ListadoArticulos.jsx`. Framework CSS → Tailwind. |

## Rutas

| Ruta | Página | Menú |
| :--- | :--- | :--- |
| `/` | Inicio: indicadores y alertas de reposición calculados desde el estado global | Sitio |
| `/tiendas` | Nuestras tiendas | Sitio |
| `/preguntas-frecuentes` | Preguntas frecuentes | Sitio |
| `/inventario` | **Listado de artículos** (tabla) | **Inventario** |
| `/inventario/nuevo` | **Agregar artículo** (formulario) | **Inventario** |
| `*` | Página 404 | — |

## Estado global

```text
context/
├── inventario.js           createContext, reducer y hook useInventario()
└── InventarioProvider.jsx  useReducer + persistencia en localStorage
```

El reducer nunca modifica el arreglo anterior: devuelve uno nuevo, y por eso React vuelve a renderizar los componentes que usan el contexto. Al agregar un artículo, el contador del menú, los indicadores del inicio y la tabla se actualizan sin pasar props entre páginas.

**Validaciones del formulario:** el nombre debe tener al menos 3 caracteres; la marca y el tipo son obligatorios; el stock y el stock mínimo deben ser enteros mayores o iguales a 0; el precio debe ser un entero mayor a 0; y no se acepta un artículo con el mismo nombre y marca que uno existente. Los errores se muestran bajo cada campo, con `aria-invalid` y `aria-describedby`.

## Estructura

```text
src/
├── App.jsx                     Provider + router + layout
├── context/                    Estado global del inventario
├── components/
│   ├── Encabezado.jsx          Marca + menú del sitio (tablet/desktop)
│   ├── MenuInventario.jsx      Menú nuevo: Artículos / Agregar artículo
│   ├── BottomNav.jsx           Menú inferior del sitio
│   ├── EncabezadoPagina.jsx    Banner de título reutilizable
│   ├── LlamadoAccion.jsx       Bloque de llamado a la acción (Tiendas y FAQ)
│   ├── TarjetaResumen.jsx      Tarjeta de indicador
│   ├── AlertaReposicion.jsx    Aviso de artículos bajo el stock mínimo (Inicio)
│   ├── FiltrosArticulos.jsx    Búsqueda y filtro por tipo (Listado)
│   └── TablaArticulos.jsx      Tabla de artículos (Listado)
├── pages/                      Home, ListadoArticulos, NuevoArticulo, NuestrasTiendas, PreguntasFrecuentes, NotFound
├── data/                       Rutas del menú, artículos iniciales, tiendas y preguntas
└── utils/                      Formato CLP y estado de stock
```

## Mejoras según la retroalimentación de la Semana 1

| Observación del docente | Cómo se abordó |
| :--- | :--- |
| `Encabezado` y `BottomNav` repetían los mismos `NavLink` | Las rutas están en un arreglo compartido (`data/rutas.js`) que ambos menús recorren con `map`. `BottomNav` solo agrega el ícono de cada ruta. |
| Antetítulo, badge de ruta, título y bajada repetidos en cada página | Se creó `EncabezadoPagina`, que recibe `antetitulo`, `titulo` y la bajada como `children`. Lo usan las cinco páginas con banner. |
| Llamado a la acción con gradiente duplicado en Tiendas y FAQ | Se creó `LlamadoAccion`, que recibe `titulo`, `texto`, `to` y `etiqueta`. Ya no quedan estilos en línea. |
| `Home` mezclaba métricas, alerta, filtros y tabla (~180 líneas) | Se separaron `AlertaReposicion`, `FiltrosArticulos` y `TablaArticulos`. `Home` queda en ~55 líneas y `ListadoArticulos` en ~65, cada una solo con su estado y su composición. |
| Mezcla de Bootstrap, `index.css` de 761 líneas y `style` en línea | Se usa una sola estrategia, Tailwind CSS. `index.css` queda en 46 líneas (tema y estilos base) y no hay ningún atributo `style` en el código. |
| Revisar recorridos, incluidas las rutas inexistentes | Ruta comodín `*` → `NotFound`, con un enlace de vuelta al inicio. Desde el formulario, guardar lleva al listado con `useNavigate` + `state`. |

## Cómo ejecutar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build de producción en dist/
npm run lint
```

El botón **Restaurar inventario inicial**, al pie del listado, vuelve a los 14 artículos de ejemplo.
