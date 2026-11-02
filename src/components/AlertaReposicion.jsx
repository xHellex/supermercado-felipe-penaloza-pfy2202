/**
 * Aviso con los artículos que están en o bajo su stock mínimo.
 * No se muestra si no hay nada que reponer.
 *
 * @param {Array} articulos - Artículos que requieren reposición.
 */
function AlertaReposicion({ articulos }) {
  if (articulos.length === 0) return null

  return (
    <aside className="mb-6 rounded-2xl border-l-4 border-naranjo-500 bg-amber-50 p-4 shadow-sm" aria-labelledby="titulo-reponer">
      <h2 id="titulo-reponer" className="mb-2 font-bold text-amber-900">
        Artículos que requieren reposición
      </h2>
      <ul className="grid list-disc gap-1 pl-5 text-slate-700 md:grid-cols-2">
        {articulos.map((a) => (
          <li key={a.id}>
            <strong>{a.nombre}</strong> ({a.marca}): {a.stock} unidades, mínimo {a.stockMinimo}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default AlertaReposicion
