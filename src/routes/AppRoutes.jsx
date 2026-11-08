import { lazy } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '../components/Layout.jsx'

/* Carga diferida: cada página se descarga solo cuando se visita por primera vez. */
const Home = lazy(() => import('../pages/Home.jsx'))
const NuestrasTiendas = lazy(() => import('../pages/NuestrasTiendas.jsx'))
const PreguntasFrecuentes = lazy(() => import('../pages/PreguntasFrecuentes.jsx'))
const ListadoArticulos = lazy(() => import('../pages/ListadoArticulos.jsx'))
const NuevoArticulo = lazy(() => import('../pages/NuevoArticulo.jsx'))
const DetalleArticulo = lazy(() => import('../pages/DetalleArticulo.jsx'))
const Carrito = lazy(() => import('../pages/Carrito.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

/**
 * Todas las rutas del sitio en un solo lugar. Las páginas son hijas de <Layout>,
 * que pone el encabezado, los menús y el <Outlet> donde se muestra cada una.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tiendas" element={<NuestrasTiendas />} />
        <Route path="preguntas-frecuentes" element={<PreguntasFrecuentes />} />

        <Route path="inventario">
          <Route index element={<ListadoArticulos />} />
          <Route path="nuevo" element={<NuevoArticulo />} />
          {/* La ruta estática "nuevo" le gana a ":id" por especificidad, sin depender del orden */}
          <Route path=":id" element={<DetalleArticulo />} />
        </Route>

        <Route path="carrito" element={<Carrito />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
