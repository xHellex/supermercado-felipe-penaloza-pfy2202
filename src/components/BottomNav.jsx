import { NavLink } from 'react-router-dom'
import './BottomNav.css'

/*
 * Íconos SVG en línea (sin librerías externas). aria-hidden="true" porque
 * el texto de cada opción ya describe el destino para lectores de pantalla.
 */
const IconoInicio = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </svg>
)

const IconoTiendas = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h16l1 5a3 3 0 0 1-5 2.2A3 3 0 0 1 12 12a3 3 0 0 1-4-.8A3 3 0 0 1 3 9zM5 13.5V20h14v-6.5" />
  </svg>
)

const IconoPreguntas = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" />
  </svg>
)

/*
 * Lista de opciones del menú. Tenerlas en un arreglo permite agregar o
 * quitar pantallas en un solo lugar; el JSX las recorre con .map().
 * "end" en la ruta "/" hace que Inicio solo quede activo en la URL exacta "/".
 */
const opciones = [
  { ruta: '/', texto: 'Inicio', Icono: IconoInicio, end: true },
  { ruta: '/tiendas', texto: 'Nuestras tiendas', Icono: IconoTiendas },
  { ruta: '/preguntas-frecuentes', texto: 'Preguntas frecuentes', Icono: IconoPreguntas },
]

/**
 * Menú de navegación inferior, fijo en la parte baja de la pantalla.
 * Usa <NavLink> de React Router: cambia la URL sin recargar la página y
 * permite saber cuál opción corresponde a la ruta actual (isActive).
 */
function BottomNav() {
  return (
    <nav className="fixed-bottom bottom-nav" aria-label="Navegación principal">
      <div className="container px-2">
        <ul className="bottom-nav__lista nav nav-pills nav-justified mx-auto">
          {opciones.map(({ ruta, texto, Icono, end }) => (
            <li key={ruta} className="nav-item">
              <NavLink
                to={ruta}
                end={end}
                className={({ isActive }) =>
                  `nav-link d-flex flex-column align-items-center bottom-nav__link ${
                    isActive ? 'bottom-nav__link--activo active' : ''
                  }`
                }
              >
                <Icono />
                <span className="small">{texto}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default BottomNav