import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Encabezado from './Encabezado.jsx'
import MenuInventario from './MenuInventario.jsx'
import BottomNav from './BottomNav.jsx'

/**
 * Estructura común de todas las páginas. <Outlet> muestra la ruta hija activa;
 * <Suspense> cubre la carga diferida (React.lazy) de cada página.
 */
function Layout() {
  return (
    <>
      {/* Encabezado y menú de inventario quedan fijos juntos al hacer scroll */}
      <div className="sticky top-0 z-40">
        <Encabezado />
        <MenuInventario />
      </div>

      <main className="mx-auto max-w-6xl px-4 pt-6 pb-32">
        <Suspense
          fallback={
            <p role="status" className="py-16 text-center text-slate-500">
              Cargando página…
            </p>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <BottomNav />
    </>
  )
}

export default Layout
