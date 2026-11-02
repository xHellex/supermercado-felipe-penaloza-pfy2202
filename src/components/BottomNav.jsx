import { NavLink } from 'react-router-dom'
import { rutasSitio } from '../data/rutas.js'

/*
 * Íconos SVG en línea (sin librerías externas). aria-hidden="true" porque
 * el texto de cada opción ya describe el destino para lectores de pantalla.
 */
const IconoInicio = () => (
  <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
)

const IconoTiendas = () => (
  <path d="M4 4h16l1 5a3 3 0 0 1-5 2.2A3 3 0 0 1 12 12a3 3 0 0 1-4-.8A3 3 0 0 1 3 9zM5 13.5V20h14v-6.5" />
)

const IconoPreguntas = () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" />
  </>
)

/* Las rutas vienen del arreglo compartido con Encabezado; aquí solo se agrega el ícono de cada una. */
const iconos = {
  '/': IconoInicio,
  '/tiendas': IconoTiendas,
  '/preguntas-frecuentes': IconoPreguntas,
}

/**
 * Menú inferior fijo del sitio. <NavLink> cambia la URL sin recargar y
 * entrega isActive para destacar la opción de la ruta actual.
 */
function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgb(15_61_46/0.12)] backdrop-blur-md"
      aria-label="Navegación principal"
    >
      <ul className="mx-auto flex max-w-xl gap-1">
        {rutasSitio.map(({ ruta, texto, end }) => {
          const Icono = iconos[ruta]
          return (
            <li key={ruta} className="flex-1">
              <NavLink
                to={ruta}
                end={end}
                className={({ isActive }) =>
                  `group relative flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-center text-xs no-underline transition-colors ${
                    isActive
                      ? 'bg-verde-100 font-bold text-verde-900 shadow-sm before:absolute before:inset-x-1/4 before:top-0 before:h-0.75 before:rounded-b before:bg-verde-700'
                      : 'font-medium text-slate-500 hover:bg-verde-50 hover:text-verde-700'
                  }`
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-6 fill-none stroke-current stroke-2 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <Icono />
                </svg>
                <span>{texto}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BottomNav
