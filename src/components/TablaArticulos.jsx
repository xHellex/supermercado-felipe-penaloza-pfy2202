import { Link, useLocation } from 'react-router'
import { formatearNumero, formatearPrecio } from '../utils/formato.js'
import { estadoStock } from '../utils/stock.js'

/**
 * Tabla de artículos del inventario. El nombre lleva al detalle y le pasa
 * la URL actual (con su filtro) para que "Volver al listado" la recupere.
 *
 * @param {Array}    articulos  - Artículos a mostrar (ya filtrados).
 * @param {string}   destacado  - Nombre del artículo recién agregado, para resaltarlo.
 * @param {Function} onEliminar - Recibe el id del artículo a eliminar.
 */
function TablaArticulos({ articulos, destacado, onEliminar }) {
  const { pathname, search } = useLocation()

  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-slate-200">
      <table className="w-full min-w-180 text-left text-sm">
        <caption className="sr-only">Artículos del inventario</caption>
        <thead className="bg-verde-50 text-xs tracking-wider text-verde-900 uppercase">
          <tr>
            <th scope="col" className="px-4 py-3">Nombre</th>
            <th scope="col" className="px-4 py-3">Marca</th>
            <th scope="col" className="px-4 py-3">Tipo</th>
            <th scope="col" className="px-4 py-3 text-right">Stock</th>
            <th scope="col" className="px-4 py-3 text-right">Precio</th>
            <th scope="col" className="px-4 py-3 text-center">Estado</th>
            <th scope="col" className="px-4 py-3 text-center">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {articulos.map((a) => {
            const estado = estadoStock(a)
            return (
              <tr key={a.id} className={a.nombre === destacado ? 'bg-amber-50' : 'hover:bg-slate-50'}>
                <td className="px-4 py-3 font-medium">
                  <Link
                    to={`/inventario/${a.id}`}
                    state={{ volver: `${pathname}${search}` }}
                    className="text-verde-900 underline decoration-verde-100 underline-offset-4 hover:decoration-verde-700"
                  >
                    {a.nombre}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{a.marca}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{a.tipo}</span>
                </td>
                <td className="px-4 py-3 text-right font-semibold">{formatearNumero(a.stock)}</td>
                <td className="px-4 py-3 text-right text-slate-600">{formatearPrecio(a.precio)}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${estado.clases}`}>{estado.texto}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onEliminar(a.id)}
                    className="btn btn-peligro rounded-md px-2 py-1 text-xs"
                    aria-label={`Eliminar ${a.nombre}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          })}

          {articulos.length === 0 && (
            <tr>
              <td colSpan="7" className="px-4 py-10 text-center text-slate-500">
                No hay artículos que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TablaArticulos
