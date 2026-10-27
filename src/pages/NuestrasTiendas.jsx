import { useNavigate, useLocation } from 'react-router-dom'
import { tiendas } from '../data/tiendas.js'

/**
 * Vista "Nuestras tiendas": listado de sucursales con dirección,
 * horario, teléfono y servicios disponibles.
 * Utiliza useNavigate y useLocation de React Router.
 */
function NuestrasTiendas() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <section className="pagina container-fluid px-0">
      <header className="pagina__encabezado mb-4 shadow">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p className="pagina__antetitulo mb-0">{tiendas.length} sucursales disponibles</p>
          <span className="badge bg-white text-dark opacity-75 small">Ruta: {location.pathname}</span>
        </div>
        <h1 className="mt-2">Nuestras tiendas</h1>
        <p className="pagina__bajada">
          Encuentra la sucursal más cercana a tu ubicación, revisa sus horarios de atención continua y servicios disponibles.
        </p>
      </header>

      {/* Grilla responsiva con Bootstrap */}
      <div className="row g-4 mb-4">
        {tiendas.map((tienda) => (
          <div key={tienda.id} className="col-12 col-md-6">
            <article className="card h-100 shadow-sm border-0 tienda rounded-3">
              <div className="card-body d-flex flex-column p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="p-2 bg-success-subtle text-success rounded-circle d-inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                  </span>
                  <h2 className="h5 fw-bold mb-0 text-success-emphasis">{tienda.nombre}</h2>
                </div>

                <dl className="mb-4 text-secondary small">
                  <div className="mb-2">
                    <dt className="fw-semibold text-uppercase text-muted">Dirección</dt>
                    <dd className="mb-0 text-dark">{tienda.direccion}, {tienda.comuna}</dd>
                  </div>
                  <div className="mb-2">
                    <dt className="fw-semibold text-uppercase text-muted">Horario</dt>
                    <dd className="mb-0 text-dark">{tienda.horario}</dd>
                  </div>
                  <div className="mb-0">
                    <dt className="fw-semibold text-uppercase text-muted">Teléfono</dt>
                    <dd className="mb-0">
                      <a href={`tel:${tienda.telefono.replaceAll(' ', '')}`} className="text-decoration-none fw-medium text-success">
                        {tienda.telefono}
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto pt-3 border-top">
                  <p className="fw-semibold small text-muted mb-2">Servicios en sucursal:</p>
                  <div className="d-flex flex-wrap gap-2" aria-label="Servicios">
                    {tienda.servicios.map((servicio) => (
                      <span key={servicio} className="badge rounded-pill bg-success-subtle text-success-emphasis border border-success-subtle px-3 py-2">
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="card text-white p-4 p-md-5 shadow-sm border-0 rounded-4 mb-5 llamado" style={{ background: 'linear-gradient(135deg, #0f3d2e, #18553f)' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h2 className="h4 fw-bold mb-1">¿Tienes dudas sobre retiro en tienda o medios de pago?</h2>
            <p className="text-white-50 mb-0">Revisa nuestra sección de preguntas frecuentes para resolver cualquier consulta rápidamente.</p>
          </div>
          <button
            id="ir-preguntas"
            type="button"
            className="btn btn-warning fw-bold rounded-pill px-4 py-2 text-dark shadow-sm align-self-start align-self-md-center flex-shrink-0"
            onClick={() => navigate('/preguntas-frecuentes')}
          >
            Ver preguntas frecuentes
          </button>
        </div>
      </div>
    </section>
  )
}

export default NuestrasTiendas