import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InventarioProvider from './context/InventarioProvider.jsx'
import Encabezado from './components/Encabezado.jsx'
import MenuInventario from './components/MenuInventario.jsx'
import BottomNav from './components/BottomNav.jsx'
import Home from './pages/Home.jsx'
import NuestrasTiendas from './pages/NuestrasTiendas.jsx'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx'
import ListadoArticulos from './pages/ListadoArticulos.jsx'
import NuevoArticulo from './pages/NuevoArticulo.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * Componente raíz.
 * <InventarioProvider> envuelve todo para que cualquier página lea y modifique
 * el estado global de artículos. <BrowserRouter> habilita la navegación sin recargar.
 */
function App() {
  return (
    <InventarioProvider>
      <BrowserRouter>
        {/* Encabezado y menú de inventario quedan fijos juntos al hacer scroll */}
        <div className="sticky top-0 z-40">
          <Encabezado />
          {/* Menú nuevo de esta semana: lleva a las dos páginas de inventario */}
          <MenuInventario />
        </div>

        <main className="mx-auto max-w-6xl px-4 pt-6 pb-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tiendas" element={<NuestrasTiendas />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />

            {/* Páginas de inventario (Semana 2) */}
            <Route path="/inventario" element={<ListadoArticulos />} />
            <Route path="/inventario/nuevo" element={<NuevoArticulo />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <BottomNav />
      </BrowserRouter>
    </InventarioProvider>
  )
}

export default App
