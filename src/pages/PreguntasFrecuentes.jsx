import { useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import LlamadoAccion from '../components/LlamadoAccion.jsx'
import { preguntas } from '../data/faq.js'

/** Vista "Preguntas frecuentes": acordeón accesible con una respuesta abierta a la vez. */
function PreguntasFrecuentes() {
  /* id de la pregunta abierta; null = todas cerradas. */
  const [abierta, setAbierta] = useState(null)
  const alternar = (id) => setAbierta((actual) => (actual === id ? null : id))

  return (
    <section className="motion-safe:animate-entrar">
      <EncabezadoPagina antetitulo="Centro de ayuda" titulo="Preguntas frecuentes">
        Dudas comunes sobre inventario, compras, horarios y funcionamiento de nuestras sucursales.
      </EncabezadoPagina>

      <div className="mb-6 divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {preguntas.map(({ id, pregunta, respuesta }) => {
          const estaAbierta = abierta === id
          return (
            <div key={id}>
              <h2>
                <button
                  id={`pregunta-${id}`}
                  type="button"
                  aria-expanded={estaAbierta}
                  aria-controls={`respuesta-${id}`}
                  onClick={() => alternar(id)}
                  className={`flex w-full items-center gap-3 px-5 py-4 text-left font-sans font-semibold hover:bg-verde-50 ${
                    estaAbierta ? 'bg-verde-50 text-verde-900' : 'text-slate-800'
                  }`}
                >
                  <span className="font-bold text-verde-700">#{id}</span>
                  <span className="flex-1">{pregunta}</span>
                  <span className={`text-xl motion-safe:transition-transform ${estaAbierta ? 'rotate-45' : ''}`} aria-hidden="true">
                    +
                  </span>
                </button>
              </h2>
              <section
                id={`respuesta-${id}`}
                aria-labelledby={`pregunta-${id}`}
                hidden={!estaAbierta}
                className="bg-slate-50 px-5 py-4 text-slate-600"
              >
                {respuesta}
              </section>
            </div>
          )
        })}
      </div>

      <LlamadoAccion
        titulo="¿No encontraste lo que buscabas?"
        texto="Consulta en el mesón de atención de cualquiera de nuestras tiendas."
        to="/tiendas"
        etiqueta="Visita nuestras tiendas"
      />
    </section>
  )
}

export default PreguntasFrecuentes
