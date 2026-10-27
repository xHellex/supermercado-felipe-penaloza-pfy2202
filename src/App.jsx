import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import NuestrasTiendas from './pages/NuestrasTiendas.jsx'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx'
import NotFound from './pages/NotFound.jsx'
import BottomNav from './components/BottomNav.jsx'
import Encabezado from './components/Encabezado.jsx'

/**
 * Componente raíz de la aplicación.
 *
 * <BrowserRouter> habilita el enrutamiento del lado del cliente usando la
 * History API del navegador (URLs limpias, sin recargar la página).
 * <Routes> evalúa la URL actual y renderiza solo la <Route> que coincide.
 */
function App() {
  return (
    <BrowserRouter>
      {/* Barra superior con la marca: visible en todas las páginas */}
      <Encabezado />

      <main className="container py-3 py-md-4 contenido">
        <Routes>
          {/* Página principal (Home) */}
          <Route path="/" element={<Home />} />

          {/* Vistas adicionales elegidas: Nuestras tiendas y Preguntas frecuentes */}
          <Route path="/tiendas" element={<NuestrasTiendas />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />

          {/* Ruta comodín: cualquier URL no definida muestra la página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Menú inferior: fuera de <Routes> para que se vea en todas las páginas */}
      <BottomNav />
    </BrowserRouter>
  )
}

export default App