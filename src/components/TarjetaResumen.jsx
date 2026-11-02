/**
 * Tarjeta reutilizable para un indicador del inventario.
 *
 * @param {string} titulo   - Nombre del indicador.
 * @param {string} valor    - Valor ya formateado.
 * @param {string} detalle  - Texto de apoyo bajo el valor.
 * @param {string} variante - 'alerta' para destacarla en naranjo.
 */
function TarjetaResumen({ titulo, valor, detalle, variante }) {
  const esAlerta = variante === 'alerta'

  return (
    <article
      className={`flex flex-col justify-between rounded-2xl border-t-4 bg-white p-4 shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 ${
        esAlerta ? 'border-naranjo-500' : 'border-verde-500'
      }`}
    >
      <h2 className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">{titulo}</h2>
      <p className={`font-titulo text-3xl font-bold ${esAlerta ? 'text-naranjo-600' : 'text-verde-700'}`}>{valor}</p>
      {detalle && <p className="mt-1 text-sm text-slate-500">{detalle}</p>}
    </article>
  )
}

export default TarjetaResumen
