import { Link } from 'react-router-dom'

/**
 * Barra superior con la marca del sitio. El logo es un <Link> a "/",
 * por lo que volver al inicio tampoco recarga la página.
 */
function Encabezado() {
  return (
    <header className="navbar navbar-expand bg-white border-bottom sticky-top py-2 px-3 shadow-sm encabezado">
      <div className="container-fluid max-w-1100 px-0 px-md-3 d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none m-0">
          <span className="marca__logo d-inline-flex align-items-center justify-content-center text-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 9h14l-1.5 10a2 2 0 0 1-2 1.7h-7a2 2 0 0 1-2-1.7z" />
              <path d="M9 9 12 4l3 5M9.5 13v4M14.5 13v4" />
            </svg>
          </span>
          <span className="d-flex flex-column lh-1">
            <span className="fw-bold text-dark fs-5">Supermercado</span>
            <span className="text-secondary small">Gestión de Inventario</span>
          </span>
        </Link>

        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success-subtle text-success-emphasis border border-success-subtle d-none d-sm-inline-flex align-items-center gap-1">
            <span className="spinner-grow spinner-grow-sm text-success" style={{ width: '0.45rem', height: '0.45rem' }} role="status"></span>
            SPA Activa
          </span>
          <span className="badge bg-light text-secondary border d-none d-md-inline-block">
            React Router v7 + Bootstrap 5
          </span>
        </div>
      </div>
    </header>
  )
}

export default Encabezado