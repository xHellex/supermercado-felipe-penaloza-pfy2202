import { Link } from 'react-router'

/**
 * Búsqueda por nombre o marca y filtro por tipo del listado.
 * Es un componente controlado: el estado vive en la página y llega por props.
 *
 * @param {string}   busqueda          - Texto buscado.
 * @param {Function} onBusquedaChange  - Recibe el texto nuevo.
 * @param {string}   tipo              - Tipo seleccionado ('Todos' = sin filtro).
 * @param {Function} onTipoChange      - Recibe el tipo nuevo.
 * @param {string[]} tipos             - Opciones del filtro.
 */
function FiltrosArticulos({ busqueda, onBusquedaChange, tipo, onTipoChange, tipos }) {
  return (
    <div className="mb-4 grid gap-3 md:grid-cols-[1fr_16rem_auto] md:items-end">
      <div>
        <label htmlFor="buscar" className="mb-1 block text-sm font-semibold text-slate-600">
          Buscar por nombre o marca
        </label>
        <input
          id="buscar"
          type="search"
          placeholder="Ej: Leche, Carozzi..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          className="control"
        />
      </div>
      <div>
        <label htmlFor="filtro-tipo" className="mb-1 block text-sm font-semibold text-slate-600">
          Tipo de producto
        </label>
        <select id="filtro-tipo" value={tipo} onChange={(e) => onTipoChange(e.target.value)} className="control">
          {tipos.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <Link to="/inventario/nuevo" className="btn btn-acento px-4">
        + Agregar artículo
      </Link>
    </div>
  )
}

export default FiltrosArticulos
