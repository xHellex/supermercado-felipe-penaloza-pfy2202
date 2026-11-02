import { Link, NavLink } from 'react-router-dom'
import { rutasSitio } from '../data/rutas.js'

/** Clases de un enlace del menú superior según si su ruta está activa. */
const claseEnlace = ({ isActive }) =>
  `rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
    isActive ? 'bg-verde-700 text-white shadow-sm' : 'text-slate-600 hover:bg-verde-50 hover:text-verde-700'
  }`

/**
 * Barra superior con la marca. En tablet y desktop (md:) muestra el menú
 * del sitio; en móvil esas opciones están en el menú inferior (BottomNav).
 */
function Encabezado() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-verde-500 to-verde-900 text-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 9h14l-1.5 10a2 2 0 0 1-2 1.7h-7a2 2 0 0 1-2-1.7z" />
              <path d="M9 9 12 4l3 5M9.5 13v4M14.5 13v4" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-titulo text-lg font-bold text-slate-900">Supermercado</span>
            <span className="text-xs text-slate-500">Gestión de Inventario</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Menú del sitio">
          {rutasSitio.map(({ ruta, texto, end }) => (
            <NavLink key={ruta} to={ruta} end={end} className={claseEnlace}>
              {texto}
            </NavLink>
          ))}
        </nav>

        <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500 lg:inline">
          Tailwind CSS + Router v7
        </span>
      </div>
    </header>
  )
}

export default Encabezado
