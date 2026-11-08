import { NavLink } from 'react-router'
import { useInventario } from '../context/inventario.js'
import { lineasCarrito, totalCarrito } from '../utils/selectores.js'

const claseEnlace = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
    isActive ? 'bg-white text-verde-900 shadow' : 'text-verde-50 hover:bg-white/15'
  }`

/* Texto oscuro sobre naranjo por contraste (WCAG) */
const claseContador = 'rounded-full bg-naranjo-500 px-2 text-xs text-slate-900'

/**
 * Menú de inventario: lleva al listado, al formulario de ingreso y al carrito.
 * Lee el estado global para mostrar cuántos artículos hay y cuántas unidades
 * tiene el carrito; los contadores se actualizan solos, sin pasar props entre páginas.
 */
function MenuInventario() {
  const { articulos, carrito } = useInventario()
  const { unidades } = totalCarrito(lineasCarrito(articulos, carrito))

  return (
    <nav className="bg-verde-900" aria-label="Menú de inventario">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2">
        <span className="mr-1 text-xs font-bold tracking-wider text-verde-100 uppercase">Inventario</span>
        {/* end: "Artículos" no queda activo cuando la URL es /inventario/nuevo */}
        <NavLink to="/inventario" end className={claseEnlace}>
          <span>Artículos</span>
          <span className={claseContador}>{articulos.length}</span>
        </NavLink>
        <NavLink to="/inventario/nuevo" className={claseEnlace}>
          + Agregar artículo
        </NavLink>
        <NavLink to="/carrito" className={claseEnlace}>
          <span>Carrito</span>
          <span className={claseContador}>
            {unidades}
            <span className="sr-only"> unidades</span>
          </span>
        </NavLink>
      </div>
    </nav>
  )
}

export default MenuInventario
