import { Link } from 'react-router-dom'

/** Página 404: se muestra cuando la URL no coincide con ninguna ruta. */
function NotFound() {
  return (
    <section className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
      <p className="font-titulo text-7xl font-extrabold text-verde-500" aria-hidden="true">404</p>
      <h1 className="mt-2 text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-2 mb-6 text-slate-600">La ruta a la que intentas acceder no existe o fue reubicada.</p>
      {/* <Link> navega sin recargar la página, a diferencia de <a href> */}
      <Link to="/" className="rounded-full bg-verde-700 px-5 py-2 font-semibold text-white no-underline hover:bg-verde-900">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound
