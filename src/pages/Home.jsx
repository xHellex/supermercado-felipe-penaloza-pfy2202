import { Link } from 'react-router-dom'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import TarjetaResumen from '../components/TarjetaResumen.jsx'
import AlertaReposicion from '../components/AlertaReposicion.jsx'
import { useInventario } from '../context/inventario.js'
import { formatearNumero, formatearPrecio } from '../utils/formato.js'

/**
 * Página principal: indicadores y alertas de reposición calculados desde el
 * estado global, así que reflejan al instante los artículos agregados.
 */
function Home() {
  const { articulos } = useInventario()

  const totalUnidades = articulos.reduce((suma, a) => suma + a.stock, 0)
  const valorInventario = articulos.reduce((suma, a) => suma + a.stock * a.precio, 0)
  const tipos = new Set(articulos.map((a) => a.tipo))
  const porReponer = articulos.filter((a) => a.stock <= a.stockMinimo)

  return (
    <section className="motion-safe:animate-entrar">
      <EncabezadoPagina antetitulo="Panel de gestión" titulo="Inventario del supermercado">
        Revisa el estado general del stock, detecta lo que necesita reposición y administra los artículos desde el menú de inventario.
      </EncabezadoPagina>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TarjetaResumen titulo="Artículos" valor={formatearNumero(articulos.length)} detalle={`${tipos.size} tipos de producto`} />
        <TarjetaResumen titulo="Unidades en stock" valor={formatearNumero(totalUnidades)} detalle="Total en bodega" />
        <TarjetaResumen titulo="Valor del inventario" valor={formatearPrecio(valorInventario)} detalle="Stock × precio unitario" />
        <TarjetaResumen titulo="Por reponer" valor={formatearNumero(porReponer.length)} detalle="En o bajo el stock mínimo" variante="alerta" />
      </div>

      <AlertaReposicion articulos={porReponer} />

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/inventario"
          className="rounded-2xl bg-white p-6 no-underline shadow-sm ring-1 ring-slate-200 transition hover:ring-verde-500"
        >
          <h2 className="text-xl font-bold text-verde-900">Ver todos los artículos →</h2>
          <p className="mt-1 text-slate-600">Tabla con nombre, marca, tipo, stock y precio, con búsqueda y filtro.</p>
        </Link>
        <Link
          to="/inventario/nuevo"
          className="rounded-2xl bg-white p-6 no-underline shadow-sm ring-1 ring-slate-200 transition hover:ring-naranjo-500"
        >
          <h2 className="text-xl font-bold text-naranjo-600">Agregar un artículo →</h2>
          <p className="mt-1 text-slate-600">Formulario para ingresar productos nuevos al inventario.</p>
        </Link>
      </div>
    </section>
  )
}

export default Home
