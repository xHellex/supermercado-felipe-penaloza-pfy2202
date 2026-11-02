import { useEffect, useMemo, useReducer } from 'react'
import { InventarioContext, inventarioReducer } from './inventario.js'
import { articulosIniciales } from '../data/productos.js'

const CLAVE_ALMACENAMIENTO = 'supermercado:articulos'

/** Lee el inventario guardado; si no hay o está dañado, parte con los datos iniciales. */
function cargarArticulos() {
  try {
    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO)
    return guardado ? JSON.parse(guardado) : articulosIniciales
  } catch {
    return articulosIniciales
  }
}

/**
 * Provee el estado global del inventario a toda la aplicación.
 * Se guarda en localStorage para que los artículos agregados no se pierdan al recargar.
 */
function InventarioProvider({ children }) {
  const [articulos, dispatch] = useReducer(inventarioReducer, undefined, cargarArticulos)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(articulos))
    } catch {
      // Sin almacenamiento disponible (modo privado): el estado sigue funcionando en memoria.
    }
  }, [articulos])

  /* useMemo evita crear un objeto nuevo en cada render si los artículos no cambiaron. */
  const valor = useMemo(
    () => ({
      articulos,
      agregarArticulo: (articulo) => dispatch({ type: 'agregar', articulo }),
      eliminarArticulo: (id) => dispatch({ type: 'eliminar', id }),
      reiniciarInventario: () => dispatch({ type: 'reiniciar', articulos: articulosIniciales }),
    }),
    [articulos],
  )

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>
}

export default InventarioProvider
