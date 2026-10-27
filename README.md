# Supermercado - Gestión de Inventario (SPA)

> **Actividad Formativa 1: Utilizando tecnologías avanzadas de React en sitios web**  
> **Asignatura:** Desarrollo Frontend II (`PFY2202`)  
> **Estudiante:** Felipe Peñaloza  
> **Repositorio de entrega:** `supermercado-felipe-penaloza-pfy2202`  

---

## 📋 Descripción del Proyecto

Aplicación web de página única (**Single Page Application - SPA**) para la gestión y monitoreo del inventario de un supermercado, desarrollada con **React**, **React Router v7** y estilizada de forma responsiva mediante **Bootstrap 5** y CSS personalizado.

El sistema permite navegar de manera fluida entre distintas vistas sin recargar el navegador, garantizando un rendimiento óptimo mediante renderizado del lado del cliente y una interfaz adaptable a dispositivos móviles y de escritorio.

---

## 🎯 Cumplimiento de la Pauta de Evaluación

| Criterio de Evaluación | Puntaje | Implementación en este proyecto |
|---|:---:|---|
| **1. Configura la navegación usando tecnologías de React** | **50 pts** (100% CL) | Se configuró `<BrowserRouter>`, `<Routes>` y `<Route>` en `App.jsx`. La navegación se realiza efectivamente mediante `<NavLink>` (con detección de ruta activa `isActive`), `<Link>` para saltos entre secciones sin recarga, y el hook `useNavigate()` para redirección programática desde eventos de usuario. Además, se emplea el hook `useLocation()` para reflejar el estado actual de la ruta en la interfaz. |
| **2. Desarrolla un componente frontend que da respuesta a todos los requerimientos** | **50 pts** (100% CL) | Se desarrollaron todos los componentes exigidos: vista principal **Home** (panel con métricas, alertas de stock mínimo, tabla y filtros reactivos), **Menú de navegación inferior fijo** (`BottomNav`) y las **dos vistas adicionales** seleccionadas de la lista oficial (**Nuestras tiendas** y **Preguntas frecuentes**), complementadas con una vista para rutas no encontradas (**NotFound 404**). |

---

## 🧭 Estructura de Rutas y Navegación

| Ruta | Componente / Vista | Descripción |
|---|---|---|
| `/` | `Home.jsx` | **Página principal:** Panel de control de existencias, tarjetas de métricas globales, alerta de reposición urgente, buscador por texto y filtro reactivo por categoría. |
| `/tiendas` | `NuestrasTiendas.jsx` | **Vista adicional 1:** Catálogo de sucursales con dirección, horarios, teléfonos de contacto y servicios en tienda (retiro, estacionamiento, etc.). Incluye navegación programática hacia FAQ mediante `useNavigate()`. |
| `/preguntas-frecuentes` | `PreguntasFrecuentes.jsx` | **Vista adicional 2:** Centro de ayuda con acordeón interactivo y accesible (`aria-expanded`) sobre políticas de stock, compras y sucursales. Incluye enlace `<Link>` directo hacia tiendas. |
| `*` | `NotFound.jsx` | **Manejo 404:** Vista amigable para URLs no definidas en el enrutador con botón de retorno a Inicio. |

---

## 🧩 Componentes Principales

- **`App.jsx`**: Componente raíz con el contenedor `<BrowserRouter>` y el mapa de rutas `<Routes>`. Mantiene el encabezado superior y el menú inferior fuera de las rutas para persistencia constante.
- **`Encabezado.jsx`**: Barra superior sticky con identidad corporativa, enlace directo a `/` y badges informativos de SPA activa.
- **`BottomNav.jsx`**: Menú inferior fijo (`position: fixed; bottom: 0;`) implementado con `<NavLink>`. Cumple el requerimiento de navegación accesible y visualización de la pestaña activa.
- **`TarjetaResumen.jsx`**: Componente reutilizable basado en Cards de Bootstrap para presentar métricas de inventario (productos, unidades, valor total y alertas).

---

## 🛠️ Tecnologías y Librerías Utilizadas

- **React 19** (Biblioteca para interfaces de usuario basada en componentes y Virtual DOM).
- **React Router 7 (`react-router-dom`)** (Enrutamiento cliente para SPAs: `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useNavigate`, `useLocation`).
- **Bootstrap 5** (Diseño responsivo, sistema de grillas `row`/`col`, tablas responsivas, cards, badges y acordeones).
- **Vite 8** (Entorno de desarrollo ultra rápido y empaquetador para producción).
- **ESLint** (Reglas de buenas prácticas y prevención de errores).

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/xHellex/supermercado-felipe-penaloza-pfy2202.git
   cd supermercado-felipe-penaloza-pfy2202
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Verificar calidad de código y compilación:**
   ```bash
   npm run lint
   npm run build
   ```
