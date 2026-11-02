import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import LlamadoAccion from '../components/LlamadoAccion.jsx'
import { tiendas } from '../data/tiendas.js'

/** Vista "Nuestras tiendas": sucursales con dirección, horario, teléfono y servicios. */
function NuestrasTiendas() {
  return (
    <section className="motion-safe:animate-entrar">
      <EncabezadoPagina antetitulo={`${tiendas.length} sucursales disponibles`} titulo="Nuestras tiendas">
        Encuentra la sucursal más cercana, revisa sus horarios de atención y los servicios disponibles.
      </EncabezadoPagina>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {tiendas.map((tienda) => (
          <article key={tienda.id} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm motion-safe:transition-shadow hover:shadow-md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-verde-900">
              <span className="grid size-8 place-items-center rounded-full bg-verde-50 text-verde-700" aria-hidden="true">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
              </span>
              {tienda.nombre}
            </h2>

            <dl className="mb-4 space-y-2 text-sm">
              <div>
                <dt className="text-xs font-semibold text-slate-500 uppercase">Dirección</dt>
                <dd>{tienda.direccion}, {tienda.comuna}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500 uppercase">Horario</dt>
                <dd>{tienda.horario}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500 uppercase">Teléfono</dt>
                <dd>
                  <a href={`tel:${tienda.telefono.replaceAll(' ', '')}`} className="font-medium text-verde-700 hover:underline">
                    {tienda.telefono}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-auto border-t border-slate-100 pt-3">
              <p className="mb-2 text-sm font-semibold text-slate-500">Servicios en sucursal:</p>
              <ul className="flex flex-wrap gap-2" aria-label="Servicios">
                {tienda.servicios.map((servicio) => (
                  <li key={servicio} className="rounded-full bg-verde-50 px-3 py-1 text-xs font-medium text-verde-900 ring-1 ring-verde-100">
                    {servicio}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <LlamadoAccion
        titulo="¿Tienes dudas sobre retiro en tienda o medios de pago?"
        texto="Revisa la sección de preguntas frecuentes."
        to="/preguntas-frecuentes"
        etiqueta="Ver preguntas frecuentes"
      />
    </section>
  )
}

export default NuestrasTiendas
