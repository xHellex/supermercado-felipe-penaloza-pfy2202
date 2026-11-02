import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import FiltrosArticulos from '../components/FiltrosArticulos.jsx'
import TablaArticulos from '../components/TablaArticulos.jsx'
import { useInventario } from '../context/inventario.js'

/**
 * Lista en una tabla todos los artículos del estado global.
 * Si se llega desde el formulario, location.state trae el nombre del artículo recién agregado.
 */
function ListadoArticulos() {
  const { articulos, eliminarArticulo, reiniciarInventario } = useInventario()
  const location = useLocation()
  const agregado = location.state?.agregado

  /* Estado local: solo le importa a esta página. */
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState('Todos')

  const tipos = ['Todos', ...new Set(articulos.map((a) => a.tipo))]
  const texto = busqueda.trim().toLowerCase()
  const filtrados = articulos.filter(
    (a) =>
      (tipo === 'Todos' || a.tipo === tipo) &&
      (a.nombre.toLowerCase().includes(texto) || a.marca.toLowerCase().includes(texto)),
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
          onBusquedaChange={setBusqueda}
          tipo={tipo}
          onTipoChange={setTipo}
          tipos={tipos}
        />

        <TablaArticulos articulos={filtrados} destacado={agregado} onEliminar={eliminarArticulo} />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
          <p>
            Mostrando {filtrados.length} de {articulos.length} artículos.
          </p>
          <button type="button" onClick={reiniciarInventario} className="font-semibold text-verde-700 hover:underline">
            Restaurar inventario inicial
          </button>
        </div>
      </div>
    </section>
  )
}

export default ListadoArticulos
