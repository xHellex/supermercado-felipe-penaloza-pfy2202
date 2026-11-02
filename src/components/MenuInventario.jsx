import { NavLink } from 'react-router-dom'
import { useInventario } from '../context/inventario.js'

const claseEnlace = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
    isActive ? 'bg-white text-verde-900 shadow' : 'text-verde-50 hover:bg-white/15'
  }`

/**
 * Menú de inventario: lleva al listado de artículos y al formulario de ingreso.
 * Lee el estado global para mostrar cuántos artículos hay; el contador se
 * actualiza solo al agregar uno, sin pasar props entre páginas.
 */
function MenuInventario() {
  const { articulos } = useInventario()

  return (
    <nav className="bg-verde-900" aria-label="Menú de inventario">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2">
        <span className="mr-1 text-xs font-bold tracking-wider text-verde-100 uppercase">Inventario</span>
        {/* end: "Artículos" no queda activo cuando la URL es /inventario/nuevo */}
        <NavLink to="/inventario" end className={claseEnlace}>
          Artículos
          <span className="rounded-full bg-naranjo-500 px-2 text-xs text-white">{articulos.length}</span>
        </NavLink>
        <NavLink to="/inventario/nuevo" className={claseEnlace}>
          + Agregar artículo
        </NavLink>
      </div>
    </nav>
  )
}

export default MenuInventario
