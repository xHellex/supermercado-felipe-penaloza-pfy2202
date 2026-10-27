import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { preguntas } from '../data/faq.js'

/**
 * Vista "Preguntas frecuentes": acordeón accesible con Bootstrap
 * donde solo una respuesta permanece abierta a la vez.
 * Utiliza Link y useLocation de React Router.
 */
function PreguntasFrecuentes() {
  const location = useLocation()
  /* Guarda el id de la pregunta abierta; null significa que todas están cerradas. */
  const [abierta, setAbierta] = useState(null)

  /* Si se hace clic en la pregunta ya abierta, se cierra; si no, se abre esa. */
  const alternar = (id) => setAbierta((actual) => (actual === id ? null : id))

  return (
    <section className="pagina container-fluid px-0">
      <header className="pagina__encabezado mb-4 shadow">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p className="pagina__antetitulo mb-0">Centro de ayuda y soporte</p>
          <span className="badge bg-white text-dark opacity-75 small">Ruta: {location.pathname}</span>
        </div>
        <h1 className="mt-2">Preguntas frecuentes</h1>
        <p className="pagina__bajada">
          Resolvemos las dudas más comunes sobre inventario, compras, horarios y funcionamiento de nuestras sucursales.
        </p>
      </header>

      {/* Acordeón responsivo de Bootstrap */}
      <div className="accordion mb-4 shadow-sm rounded-3 overflow-hidden border" id="acordeonFAQ">
        {preguntas.map(({ id, pregunta, respuesta }) => {
          const estaAbierta = abierta === id
          return (
            <div key={id} className="accordion-item border-0 border-bottom">
              <h2 className="accordion-header" id={`heading-${id}`}>
                <button
                  id={`pregunta-${id}`}
                  type="button"
                  className={`accordion-button fw-semibold py-3 px-4 ${estaAbierta ? '' : 'collapsed'}`}
                  aria-expanded={estaAbierta}
                  aria-controls={`collapse-${id}`}
                  onClick={() => alternar(id)}
                >
                  <span className="me-2 text-success fw-bold">#{id}</span>
                  {pregunta}
                </button>
              </h2>
              <div
                id={`collapse-${id}`}
                role="region"
                aria-labelledby={`heading-${id}`}
                className={`accordion-collapse collapse ${estaAbierta ? 'show' : ''}`}
              >
                <div className="accordion-body px-4 py-3 bg-light text-secondary">
                  {respuesta}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card text-white p-4 p-md-5 shadow-sm border-0 rounded-4 mb-5 llamado" style={{ background: 'linear-gradient(135deg, #0f3d2e, #18553f)' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h2 className="h4 fw-bold mb-1">¿No encontraste lo que buscabas?</h2>
            <p className="text-white-50 mb-0">Puedes visitarnos presencialmente o consultar en el mesón de atención de cualquiera de nuestras tiendas.</p>
          </div>
          {/* <Link> navega a otra ruta de la SPA sin recargar la página */}
          <Link to="/tiendas" className="btn btn-warning fw-bold rounded-pill px-4 py-2 text-dark shadow-sm align-self-start align-self-md-center flex-shrink-0 text-decoration-none">
            Visita nuestras tiendas
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PreguntasFrecuentes