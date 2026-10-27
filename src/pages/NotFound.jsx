import { Link } from 'react-router-dom'

/** Página 404: se muestra cuando la URL no coincide con ninguna ruta. */
function NotFound() {
  return (
    <section className="pagina container text-center py-5">
      <div className="card shadow-sm border-0 p-5 rounded-4 mx-auto" style={{ maxWidth: '600px' }}>
        <p className="display-1 fw-bold text-success mb-2" aria-hidden="true">404</p>
        <h1 className="h3 fw-bold text-dark mb-3">Página no encontrada</h1>
        <p className="text-secondary mb-4">
          La ruta a la que intentas acceder no existe en la aplicación SPA o fue reubicada.
        </p>
        <div>
          {/* <Link> navega sin recargar la página, a diferencia de <a href> */}
          <Link to="/" className="btn btn-success fw-semibold rounded-pill px-4 py-2 shadow-sm text-decoration-none">
            Volver al inicio del inventario
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound