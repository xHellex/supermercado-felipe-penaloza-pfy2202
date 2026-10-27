import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import TarjetaResumen from '../components/TarjetaResumen.jsx'
import { productos } from '../data/productos.js'
import { formatearNumero, formatearPrecio } from '../utils/formato.js'

/* Lista de categorías sin repetir, calculada una sola vez a partir de los datos. */
const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria))]

/** Devuelve el estado de stock de un producto para mostrarlo como badge de Bootstrap. */
function estadoStock(producto) {
  if (producto.stock === 0) {
    return { texto: 'Sin stock', badgeClass: 'bg-danger-subtle text-danger-emphasis border border-danger-subtle' }
  }
  if (producto.stock <= producto.stockMinimo) {
    return { texto: 'Stock bajo', badgeClass: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle' }
  }
  return { texto: 'Disponible', badgeClass: 'bg-success-subtle text-success-emphasis border border-success-subtle' }
}

/**
 * Página principal: resumen del inventario, alertas de reposición y
 * tabla de productos con búsqueda y filtro por categoría.
 * Utiliza useLocation() de React Router según lo enseñado en la materia.
 */
function Home() {
  const location = useLocation()

  /* Estado local: lo que el usuario escribe y la categoría elegida. */
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  /* Indicadores calculados a partir de los datos (se recalculan en cada render). */
  const totalUnidades = productos.reduce((suma, p) => suma + p.stock, 0)
  const valorInventario = productos.reduce((suma, p) => suma + p.stock * p.precio, 0)
  const porReponer = productos.filter((p) => p.stock <= p.stockMinimo)

  /* Productos que cumplen la búsqueda y el filtro de categoría. */
  const texto = busqueda.trim().toLowerCase()
  const productosFiltrados = productos.filter(
    (p) =>
      (categoria === 'Todas' || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(texto),
  )

  return (
    <section className="pagina container-fluid px-0">
      <header className="pagina__encabezado mb-4 shadow">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p className="pagina__antetitulo mb-0">Panel de gestión</p>
          <span className="badge bg-white text-dark opacity-75 small">Ruta: {location.pathname}</span>
        </div>
        <h1 className="mt-2">Inventario del supermercado</h1>
        <p className="pagina__bajada">
          Revisa el stock de tus productos, detecta lo que necesita reposición y filtra por categoría de manera dinámica.
        </p>
      </header>

      {/* Tarjetas de resumen en grilla responsiva de Bootstrap */}
      <div className="row g-3 mb-4">
        <TarjetaResumen titulo="Productos" valor={formatearNumero(productos.length)} detalle={`${categorias.length - 1} categorías registradas`} />
        <TarjetaResumen titulo="Unidades en stock" valor={formatearNumero(totalUnidades)} detalle="Total en bodega física" />
        <TarjetaResumen titulo="Valor del inventario" valor={formatearPrecio(valorInventario)} detalle="Stock × precio unitario" />
        <TarjetaResumen
          titulo="Por reponer"
          valor={formatearNumero(porReponer.length)}
          detalle="En o bajo el stock mínimo"
          variante="alerta"
        />
      </div>

      {porReponer.length > 0 && (
        <aside className="alert alert-warning border-start border-warning border-4 shadow-sm mb-4" role="alert" aria-label="Productos por reponer">
          <div className="d-flex align-items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill text-warning flex-shrink-0" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <h2 className="h6 mb-0 fw-bold text-warning-emphasis">Atención: Productos que requieren reposición urgente</h2>
          </div>
          <ul className="mb-0 ps-3 row g-2">
            {porReponer.map((p) => (
              <li key={p.id} className="col-12 col-md-6 text-dark-emphasis">
                <strong>{p.nombre}</strong>: {p.stock} unidades (mínimo exigido: {p.stockMinimo})
              </li>
            ))}
          </ul>
        </aside>
      )}

      <section className="card shadow-sm border-0 p-3 p-md-4 mb-5 inventario" aria-labelledby="titulo-inventario">
        <h2 id="titulo-inventario" className="h4 fw-bold mb-3 text-success-emphasis">Catálogo y Control de Existencias</h2>

        {/* Filtros responsivos con formularios de Bootstrap */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-7">
            <label htmlFor="buscar-producto" className="form-label fw-semibold small text-secondary">
              Buscar por nombre de producto
            </label>
            <input
              id="buscar-producto"
              type="search"
              className="form-control"
              placeholder="Ej: Leche, Arroz, Aceite..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-5">
            <label htmlFor="filtro-categoria" className="form-label fw-semibold small text-secondary">
              Filtrar por categoría
            </label>
            <select
              id="filtro-categoria"
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla responsiva de Bootstrap */}
        <div className="table-responsive border rounded-3 mb-2">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-success text-uppercase small">
              <tr>
                <th scope="col" className="py-3 ps-3">Producto</th>
                <th scope="col" className="py-3">Categoría</th>
                <th scope="col" className="py-3 text-end">Stock actual</th>
                <th scope="col" className="py-3 text-end">Precio CLP</th>
                <th scope="col" className="py-3 text-center pe-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((p) => {
                const estado = estadoStock(p)
                return (
                  <tr key={p.id}>
                    <td className="ps-3 fw-medium text-dark">{p.nombre}</td>
                    <td><span className="badge bg-light text-dark border">{p.categoria}</span></td>
                    <td className="text-end fw-semibold">{formatearNumero(p.stock)}</td>
                    <td className="text-end text-secondary">{formatearPrecio(p.precio)}</td>
                    <td className="text-center pe-3">
                      <span className={`badge rounded-pill px-3 py-2 ${estado.badgeClass}`}>
                        {estado.texto}
                      </span>
                    </td>
                  </tr>
                )
              })}

              {productosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No se encontraron productos que coincidan con el criterio de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="table-light">
              <tr>
                <td colSpan="5" className="ps-3 py-3 text-secondary small fw-medium">
                  Mostrando {productosFiltrados.length} de {productos.length} productos en catálogo.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </section>
  )
}

export default Home