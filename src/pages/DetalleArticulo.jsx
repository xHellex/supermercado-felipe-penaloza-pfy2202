import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import { useInventario } from '../context/inventario.js'
import { formatearNumero, formatearPrecio } from '../utils/formato.js'
import { estadoStock } from '../utils/stock.js'

/**
 * Detalle de un artículo (/inventario/:id). Permite agregarlo al carrito:
 * las unidades agregadas se restan del stock en el estado global.
 * location.state.volver trae el listado con su filtro, para regresar sin perderlo.
 */
function DetalleArticulo() {
  const { id } = useParams()
  const location = useLocation()
  const volver = location.state?.volver ?? '/inventario'
  const { articulos, carrito, agregarAlCarrito } = useInventario()

  const [cantidad, setCantidad] = useState('1')
  const [aviso, setAviso] = useState('')

  const articulo = articulos.find((a) => a.id === Number(id))

  if (!articulo) {
    return (
      <section className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold">Artículo no encontrado</h1>
        <p className="mt-2 mb-6 text-slate-600">No existe un artículo con el código {id} o fue eliminado del inventario.</p>
        <Link to={volver} className="btn btn-primario rounded-full">
          Volver al listado
        </Link>
      </section>
    )
  }

  const estado = estadoStock(articulo)
  const enCarrito = carrito.find((l) => l.id === articulo.id)?.cantidad ?? 0
  const sinStock = articulo.stock === 0

  const agregar = (e) => {
    e.preventDefault()
    /* Se acota al rango válido aunque el usuario escriba otro número */
    const unidades = Math.min(Math.max(1, Math.trunc(Number(cantidad)) || 1), articulo.stock)
    agregarAlCarrito(articulo.id, unidades)
    setAviso(`Se ${unidades === 1 ? 'agregó 1 unidad' : `agregaron ${unidades} unidades`} de ${articulo.nombre} al carrito.`)
    setCantidad('1')
  }

  const datos = [
    ['Marca', articulo.marca],
    ['Tipo de producto', articulo.tipo],
    ['Precio unitario', formatearPrecio(articulo.precio)],
    ['Stock disponible', `${formatearNumero(articulo.stock)} unidades`],
    ['Stock mínimo', `${formatearNumero(articulo.stockMinimo)} unidades`],
    ['En tu carrito', `${formatearNumero(enCarrito)} unidades`],
  ]

  return (
    <section className="motion-safe:animate-entrar">
      <Link to={volver} className="mb-4 inline-block font-semibold text-verde-700 hover:underline">
        ← Volver al listado
      </Link>

      <EncabezadoPagina antetitulo={articulo.tipo} titulo={articulo.nombre}>
        {articulo.marca}
      </EncabezadoPagina>

      <div className="grid gap-6 md:grid-cols-[1fr_20rem]">
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-verde-900">Información del artículo</h2>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${estado.clases}`}>{estado.texto}</span>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {datos.map(([etiqueta, valor]) => (
              <div key={etiqueta} className="rounded-xl bg-slate-50 p-3">
                <dt className="text-xs font-semibold text-slate-500 uppercase">{etiqueta}</dt>
                <dd className="mt-1 font-semibold text-slate-900">{valor}</dd>
              </div>
            ))}
          </dl>
        </article>

        <form onSubmit={agregar} className="self-start rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-verde-900">Agregar al carrito</h2>
          <label htmlFor="cantidad" className="mb-1 block text-sm font-semibold text-slate-700">
            Cantidad (máximo {formatearNumero(articulo.stock)})
          </label>
          <input
            id="cantidad"
            type="number"
            inputMode="numeric"
            min="1"
            max={articulo.stock}
            step="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            disabled={sinStock}
            className="control mb-4"
          />
          <button type="submit" disabled={sinStock} className="btn btn-primario w-full">
            {sinStock ? 'Sin stock disponible' : 'Agregar al carrito'}
          </button>

          {aviso && (
            <p role="status" className="mt-4 rounded-xl bg-verde-50 px-3 py-2 text-sm text-verde-900 ring-1 ring-verde-100">
              ✓ {aviso}{' '}
              <Link to="/carrito" className="font-semibold underline">
                Ver carrito
              </Link>
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default DetalleArticulo
