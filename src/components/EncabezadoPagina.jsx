import { useLocation } from 'react-router-dom'

/**
 * Banner con el título de cada página. Muestra la ruta actual con useLocation()
 * para evidenciar que la URL cambia sin recargar.
 */
function EncabezadoPagina({ antetitulo, titulo, children }) {
  const { pathname } = useLocation()

  return (
    <header className="relative mb-6 overflow-hidden rounded-3xl bg-linear-to-br from-verde-900 to-verde-700 p-6 text-white shadow-lg md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold tracking-widest text-verde-100 uppercase">{antetitulo}</p>
        <span className="rounded-full bg-white/85 px-2 py-0.5 text-xs text-slate-800">Ruta: {pathname}</span>
      </div>
      <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{titulo}</h1>
      {children && <p className="mt-2 max-w-2xl text-verde-50/90">{children}</p>}
    </header>
  )
}

export default EncabezadoPagina
