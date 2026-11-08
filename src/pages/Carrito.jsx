import { Link } from 'react-router'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import LineaCarrito, { columnasCarrito } from '../components/LineaCarrito.jsx'
import { useInventario } from '../context/inventario.js'
import { formatearNumero, formatearPrecio } from '../utils/formato.js'
import { lineasCarrito, totalCarrito } from '../utils/selectores.js'

/**
 * Carrito de compras. Cada botón despacha una acción del estado global que mueve
 * unidades entre el carrito y el stock, así el inventario se actualiza a la vez.
 */
function Carrito() {
  const { articulos, carrito, aumentar, disminuir, quitarDelCarrito } = useInventario()
  const lineas = lineasCarrito(articulos, carrito)
  const { unidades, total } = totalCarrito(lineas)

  return (
    <section className="motion-safe:animate-entrar">
      <EncabezadoPagina antetitulo="Inventario" titulo="Carrito de compras">
        Ajusta las cantidades: cada unidad que agregas o quitas se descuenta o se devuelve al stock del inventario.
      </EncabezadoPagina>

      {lineas.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-verde-900">Tu carrito está vacío</h2>
          <p className="mt-2 mb-6 text-slate-600">Entra al detalle de un artículo desde el listado para agregarlo.</p>
          <Link to="/inventario" className="btn btn-primario rounded-full">
            Ir al listado de artículos
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="md:overflow-hidden md:rounded-2xl md:bg-white md:shadow-sm">
            {/* Encabezado visual de la "tabla" desde md; cada celda tiene su etiqueta para lectores de pantalla */}
            <div
              className={`hidden gap-4 bg-verde-50 px-4 py-3 text-xs font-semibold tracking-wider text-verde-900 uppercase md:grid ${columnasCarrito}`}
              aria-hidden="true"
            >
              <span>Artículo</span>
              <span className="text-right">Precio</span>
              <span className="text-center">Cantidad</span>
              <span className="text-right">Subtotal</span>
              <span />
            </div>
            <ul className="grid gap-3 md:gap-0 md:divide-y md:divide-slate-100" aria-label="Artículos en el carrito">
              {lineas.map((linea) => (
                <LineaCarrito
                  key={linea.articulo.id}
                  linea={linea}
                  onAumentar={() => aumentar(linea.articulo.id)}
                  onDisminuir={() => disminuir(linea.articulo.id)}
                  onQuitar={() => quitarDelCarrito(linea.articulo.id)}
                />
              ))}
            </ul>
          </div>

          <aside className="self-start rounded-2xl bg-white p-6 shadow-sm" aria-labelledby="titulo-resumen">
            <h2 id="titulo-resumen" className="mb-4 text-lg font-bold text-verde-900">
              Resumen
            </h2>
            <dl className="space-y-2" aria-live="polite">
              <div className="flex justify-between">
                <dt className="text-slate-600">Unidades</dt>
                <dd className="font-semibold">{formatearNumero(unidades)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-lg">
                <dt className="font-semibold">Total</dt>
                <dd className="font-titulo font-bold text-verde-700">{formatearPrecio(total)}</dd>
              </div>
            </dl>
            <Link to="/inventario" className="btn btn-secundario mt-6 w-full">
              Seguir agregando artículos
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Carrito
