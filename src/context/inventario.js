import { createContext, useContext } from 'react'

/**
 * Estado global del inventario con Context API + useReducer.
 * Este archivo define el contexto, el reducer y el hook de acceso;
 * el componente que lo provee está en InventarioProvider.jsx.
 */
export const InventarioContext = createContext(null)

/** Calcula el estado siguiente a partir de una acción. Nunca modifica el estado anterior. */
export function inventarioReducer(articulos, accion) {
  switch (accion.type) {
    case 'agregar': {
      const siguienteId = Math.max(0, ...articulos.map((a) => a.id)) + 1
      return [...articulos, { ...accion.articulo, id: siguienteId }]
    }
    case 'eliminar':
      return articulos.filter((a) => a.id !== accion.id)
    case 'reiniciar':
      return accion.articulos
    default:
      throw new Error(`Acción desconocida: ${accion.type}`)
  }
}

/** Hook para leer los artículos y sus acciones desde cualquier componente. */
export function useInventario() {
  const contexto = useContext(InventarioContext)
  if (!contexto) {
    throw new Error('useInventario debe usarse dentro de <InventarioProvider>')
  }
  return contexto
}
