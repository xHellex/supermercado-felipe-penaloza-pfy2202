import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import FiltrosArticulos from '../components/FiltrosArticulos.jsx'
import TablaArticulos from '../components/TablaArticulos.jsx'
import { useInventario } from '../context/inventario.js'
import { filtrarArticulos, tiposDisponibles } from '../utils/selectores.js'

/**
 * Lista en una tabla todos los artículos del estado global.
 * Si se llega desde el formulario, location.state trae el nombre del artículo recién agregado.
 *
 * El filtro vive en la URL (?tipo=Lácteos&q=leche): se conserva al ir al detalle y volver,
 * y se puede compartir. La lista mostrada se deriva; el estado global nunca se modifica.
 */
function ListadoArticulos() {
  const { articulos, carrito, eliminarArticulo, restaurarArticulo, reiniciarInventario } = useInventario()
  const location = useLocation()
  const agregado = location.state?.agregado
  const [params, setParams] = useSearchParams()

  const tipos = tiposDisponibles(articulos)
  /* Un tipo que no existe (URL editada a mano o artículo eliminado) se trata como "Todos". */
  const tipo = tipos.includes(params.get('tipo')) ? params.get('tipo') : 'Todos'
  const busqueda = params.get('q') ?? ''
  const filtrados = filtrarArticulos(articulos, { tipo, texto: busqueda })

  /* Datos para deshacer la última eliminación; null = sin aviso. */
  const [eliminado, setEliminado] = useState(null)

  /* El aviso de deshacer se cierra solo a los 8 s; el cleanup cancela el timer si cambia antes. */
  useEffect(() => {
    if (!eliminado) return
    const timer = setTimeout(() => setEliminado(null), 8000)
    return () => clearTimeout(timer)
  }, [eliminado])

  const eliminar = (id) => {
    const articulo = articulos.find((a) => a.id === id)
    const enCarrito = carrito.some((l) => l.id === id) ? ' También se quitará del carrito.' : ''
    if (!window.confirm(`¿Eliminar ${articulo.nombre} del inventario?${enCarrito}`)) return
    setEliminado(eliminarArticulo(id))
  }

  const deshacer = () => {
    restaurarArticulo(eliminado)
    setEliminado(null)
  }

  const reiniciar = () => {
    if (!window.confirm('¿Restaurar el inventario inicial? Se perderán los artículos agregados y el carrito.')) return
    reiniciarInventario()
    setEliminado(null)
  }

  /* Quita el parámetro cuando vuelve a su valor por defecto; replace evita una entrada de historial por tecla. */
  const cambiarParametro = (clave, valor, porDefecto) =>
    setParams(
      (anteriores) => {
        const siguientes = new URLSearchParams(anteriores)
        if (valor.trim() === '' || valor === porDefecto) siguientes.delete(clave)
        else siguientes.set(clave, valor)
        return siguientes
      },
      { replace: true, state: location.state },
    )

  return (
    <section className="motion-safe:animate-entrar">
      <EncabezadoPagina antetitulo="Inventario" titulo="Artículos en inventario">
        Todos los artículos registrados actualmente, incluidos los que se agregan desde el formulario.
      </EncabezadoPagina>

      {agregado && (
        <p role="status" className="mb-4 rounded-xl bg-verde-50 px-4 py-3 font-medium text-verde-900 ring-1 ring-verde-100">
          ✓ Se agregó <strong>{agregado}</strong> al inventario.
        </p>
      )}

      <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
        <FiltrosArticulos
          busqueda={busqueda}
          onBusquedaChange={(valor) => cambiarParametro('q', valor, '')}
          tipo={tipo}
          onTipoChange={(valor) => cambiarParametro('tipo', valor, 'Todos')}
          tipos={tipos}
        />

        <TablaArticulos articulos={filtrados} destacado={agregado} onEliminar={eliminar} />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
          <p aria-live="polite">
            Mostrando {filtrados.length} de {articulos.length} artículos.
          </p>
          <button type="button" onClick={reiniciar} className="font-semibold text-verde-700 hover:underline">
            Restaurar inventario inicial
          </button>
        </div>
      </div>

      {/* Región siempre presente: los lectores de pantalla anuncian el texto cuando aparece */}
      <div role="status" aria-live="polite" className="fixed inset-x-4 bottom-28 z-50 mx-auto max-w-md">
        {eliminado && (
          <p className="flex items-center justify-between gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
            <span>
              Se eliminó <strong>{eliminado.articulo.nombre}</strong> del inventario.
            </span>
            <button type="button" onClick={deshacer} className="btn btn-acento shrink-0 px-3 py-1 text-sm">
              Deshacer
            </button>
          </p>
        )}
      </div>
    </section>
  )
}

export default ListadoArticulos
