import { Link } from 'react-router-dom'

/**
 * Bloque de llamado a la acción al pie de una página. Reúne la estructura y
 * el estilo compartidos; cada página solo entrega su texto y destino.
 *
 * @param {string} titulo   - Pregunta o frase principal.
 * @param {string} texto    - Texto de apoyo bajo el título.
 * @param {string} to       - Ruta a la que lleva el botón.
 * @param {string} etiqueta - Texto del botón.
 */
function LlamadoAccion({ titulo, texto, to, etiqueta }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-linear-to-br from-verde-900 to-verde-700 p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
      <div>
        <h2 className="text-xl font-bold">{titulo}</h2>
        <p className="text-verde-100">{texto}</p>
      </div>
      <Link
        to={to}
        className="shrink-0 self-start rounded-full bg-naranjo-500 px-5 py-2 font-bold text-slate-900 no-underline shadow-sm hover:bg-amber-400 md:self-center"
      >
        {etiqueta}
      </Link>
    </div>
  )
}

export default LlamadoAccion
