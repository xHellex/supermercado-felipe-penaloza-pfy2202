/**
 * Tarjeta reutilizable para mostrar un indicador del inventario.
 * Recibe los datos por props, por lo que la misma pieza sirve para
 * cualquier métrica (total de productos, unidades, alertas, etc.).
 *
 * @param {string} titulo  - Nombre del indicador.
 * @param {string} valor   - Valor ya formateado a mostrar.
 * @param {string} detalle - Texto de apoyo bajo el valor.
 * @param {string} variante - Modificador visual opcional ('alerta').
 */
function TarjetaResumen({ titulo, valor, detalle, variante }) {
  const esAlerta = variante === 'alerta'
  const bordeClase = esAlerta ? 'border-warning border-top-4' : 'border-success border-top-4'

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <article className={`card h-100 shadow-sm tarjeta-resumen ${esAlerta ? 'tarjeta-resumen--alerta' : ''} ${bordeClase}`}>
        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div>
            <h2 className="tarjeta-resumen__titulo text-uppercase mb-2">{titulo}</h2>
            <p className={`tarjeta-resumen__valor mb-1 ${esAlerta ? 'text-warning-emphasis' : 'text-success-emphasis'}`}>{valor}</p>
          </div>
          {detalle && <p className="tarjeta-resumen__detalle text-muted mb-0 small">{detalle}</p>}
        </div>
      </article>
    </div>
  )
}

export default TarjetaResumen