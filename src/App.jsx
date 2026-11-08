import { BrowserRouter } from 'react-router'
import InventarioProvider from './context/InventarioProvider.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

/**
 * Componente raíz.
 * <InventarioProvider> envuelve todo para que cualquier página lea y modifique
 * el estado global de artículos. <BrowserRouter> habilita la navegación sin recargar;
 * basename toma la base de Vite para que las rutas funcionen también en gh-pages.
 */
function App() {
  return (
    <InventarioProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
      </BrowserRouter>
    </InventarioProvider>
  )
}

export default App
