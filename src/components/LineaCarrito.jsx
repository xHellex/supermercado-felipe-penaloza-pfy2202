import { Link } from 'react-router'
import { formatearPrecio } from '../utils/formato.js'

/* Columnas compartidas con el encabezado de Carrito.jsx: desde md la lista se ve como tabla */
export const columnasCarrito = 'md:grid-cols-[1fr_7rem_9rem_7rem_5rem]'

/**
 * Una línea del carrito: tarjeta en el celular, fila desde md.
 * Las etiquetas "Precio" y "Subtotal" se ven en el celular y quedan solo para lectores de pantalla en md.
 *
 * @param {object}   linea       - { articulo, cantidad, subtotal }.
 * @param {Function} onAumentar  - Mueve 1 unidad del stock al carrito.
 * @param {Function} onDisminuir - Devuelve 1 unidad al stock.
 * @param {Function} onQuitar    - Devuelve todas las unidades al stock.
 */
function LineaCarrito({ linea, onAumentar, onDisminuir, onQuitar }) {
  const { articulo, cantidad, subtotal } = linea

  return (
    <li className={`grid grid-cols-2 items-center gap-3 rounded-2xl bg-white p-4 shadow-sm md:gap-4 md:rounded-none md:shadow-none ${columnasCarrito}`}>
      <div className="col-span-2 md:col-span-1">
        <Link to={`/inventario/${articulo.id}`} className="font-semibold text-verde-900 hover:underline">
          {articulo.nombre}
        </Link>
        <p className="text-sm text-slate-500">
          {articulo.marca} · quedan {articulo.stock} en stock
        </p>
      </div>

      <p className="text-sm md:text-right">
        <span className="text-slate-500 md:sr-only">Precio: </span>
        {formatearPrecio(articulo.precio)}
      </p>

      <div className="flex items-center justify-end gap-2 md:justify-center">
        {/* Con 1 unidad, disminuir saca la línea del carrito: la etiqueta lo dice */}
        <button
          type="button"
          onClick={onDisminuir}
          className="btn btn-secundario size-9 px-0"
          aria-label={cantidad === 1 ? `Quitar ${articulo.nombre} del carrito` : `Disminuir ${articulo.nombre}`}
        >
          −
        </button>
        <span className="w-8 text-center font-bold">
          {cantidad}
          <span className="sr-only"> unidades de {articulo.nombre}</span>
        </span>
        <button
          type="button"
          onClick={onAumentar}
          disabled={articulo.stock === 0}
          className="btn btn-secundario size-9 px-0"
          aria-label={`Aumentar ${articulo.nombre}`}
        >
          +
        </button>
      </div>

      <p className="font-semibold md:text-right">
        <span className="font-normal text-slate-500 md:sr-only">Subtotal: </span>
        {formatearPrecio(subtotal)}
      </p>

      <div className="text-right">
        <button type="button" onClick={onQuitar} className="btn btn-peligro rounded-md px-2 py-1 text-xs" aria-label={`Quitar ${articulo.nombre} del carrito`}>
          Quitar
        </button>
      </div>
    </li>
  )
}

export default LineaCarrito
