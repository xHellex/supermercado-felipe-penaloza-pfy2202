import { createContext, useContext } from 'react'

/**
 * Estado global del inventario con Context API + useReducer.
 * Este archivo define el contexto, el reducer y el hook de acceso;
 * el componente que lo provee está en InventarioProvider.jsx.
 *
 * Estado: { articulos, carrito: [{ id, cantidad }], siguienteId }.
 * El carrito vive en el mismo reducer que el stock porque depende de él:
 * mover unidades entre ambos es una sola acción y stock + carrito se mantiene igual.
 */
export const InventarioContext = createContext(null)

/** Cambia el stock de un artículo en `delta` unidades. */
const conStock = (articulos, id, delta) => articulos.map((a) => (a.id === id ? { ...a, stock: a.stock + delta } : a))

/** Cambia la cantidad de una línea del carrito en `delta`; la crea si no existe y la quita si llega a 0. */
function conCantidad(carrito, id, delta) {
  if (!carrito.some((l) => l.id === id)) return [...carrito, { id, cantidad: delta }]
  return carrito.map((l) => (l.id === id ? { ...l, cantidad: l.cantidad + delta } : l)).filter((l) => l.cantidad > 0)
}

/** Mueve hasta `cantidad` unidades del stock al carrito, sin pasar del stock disponible. */
function moverAlCarrito(estado, id, cantidad) {
  const articulo = estado.articulos.find((a) => a.id === id)
  const unidades = articulo ? Math.min(cantidad, articulo.stock) : 0
  if (unidades <= 0) return estado
  return { ...estado, articulos: conStock(estado.articulos, id, -unidades), carrito: conCantidad(estado.carrito, id, unidades) }
}

/** Devuelve `cantidad` unidades del carrito al stock (como máximo, las que hay en la línea). */
function devolverAlStock(estado, id, cantidad) {
  const linea = estado.carrito.find((l) => l.id === id)
  if (!linea) return estado
  const unidades = Math.min(cantidad, linea.cantidad)
  return { ...estado, articulos: conStock(estado.articulos, id, unidades), carrito: conCantidad(estado.carrito, id, -unidades) }
}

/** Calcula el estado siguiente a partir de una acción. Nunca modifica el estado anterior. */
export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case 'agregar':
      return {
        ...estado,
        articulos: [...estado.articulos, { ...accion.articulo, id: estado.siguienteId }],
        siguienteId: estado.siguienteId + 1,
      }
    case 'eliminar':
      return {
        ...estado,
        articulos: estado.articulos.filter((a) => a.id !== accion.id),
        carrito: estado.carrito.filter((l) => l.id !== accion.id),
      }
    case 'restaurar': {
      /* Un deshacer repetido o sin datos no debe duplicar el artículo ni su línea */
      if (!accion.articulo || estado.articulos.some((a) => a.id === accion.articulo.id)) return estado
      const articulos = [...estado.articulos]
      articulos.splice(accion.indice, 0, accion.articulo)
      return { ...estado, articulos, carrito: accion.linea ? [...estado.carrito, accion.linea] : estado.carrito }
    }
    case 'agregarAlCarrito':
      return moverAlCarrito(estado, accion.id, accion.cantidad)
    case 'aumentar':
      return moverAlCarrito(estado, accion.id, 1)
    case 'disminuir':
      return devolverAlStock(estado, accion.id, 1)
    case 'quitarDelCarrito':
      return devolverAlStock(estado, accion.id, Infinity)
    case 'reiniciar':
      return accion.estado
    default:
      throw new Error(`Acción desconocida: ${accion.type}`)
  }
}

/** Hook para leer los artículos, el carrito y sus acciones desde cualquier componente. */
export function useInventario() {
  const contexto = useContext(InventarioContext)
  if (!contexto) {
    throw new Error('useInventario debe usarse dentro de <InventarioProvider>')
  }
  return contexto
}
