import { useEffect, useMemo, useReducer } from 'react'
import { InventarioContext, inventarioReducer } from './inventario.js'
import { CLAVE, CLAVE_ANTERIOR, cargarEstado, estadoInicial, serializarEstado } from './almacenamiento.js'

/** Lee el inventario guardado (o el de la semana 2) y lo valida; sin almacenamiento, parte con el inicial. */
function leerAlmacenamiento() {
  try {
    return cargarEstado(localStorage.getItem(CLAVE) ?? localStorage.getItem(CLAVE_ANTERIOR))
  } catch {
    return estadoInicial()
  }
}

/**
 * Provee el estado global del inventario y del carrito a toda la aplicación.
 * Se guarda en localStorage (con versión) para que nada se pierda al recargar.
 */
function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(inventarioReducer, undefined, leerAlmacenamiento)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, serializarEstado(estado))
    } catch {
      // Sin almacenamiento disponible (modo privado): el estado sigue funcionando en memoria.
    }
  }, [estado])

  /* useMemo evita crear un objeto nuevo en cada render si el estado no cambió. */
  const valor = useMemo(
    () => ({
      articulos: estado.articulos,
      carrito: estado.carrito,
      agregarArticulo: (articulo) => dispatch({ type: 'agregar', articulo }),
      /** Elimina y devuelve lo necesario para deshacer: el artículo, su línea del carrito y su posición. */
      eliminarArticulo: (id) => {
        const indice = estado.articulos.findIndex((a) => a.id === id)
        const deshacer = { articulo: estado.articulos[indice], linea: estado.carrito.find((l) => l.id === id), indice }
        dispatch({ type: 'eliminar', id })
        return deshacer
      },
      restaurarArticulo: (deshacer) => dispatch({ type: 'restaurar', ...deshacer }),
      agregarAlCarrito: (id, cantidad) => dispatch({ type: 'agregarAlCarrito', id, cantidad }),
      aumentar: (id) => dispatch({ type: 'aumentar', id }),
      disminuir: (id) => dispatch({ type: 'disminuir', id }),
      quitarDelCarrito: (id) => dispatch({ type: 'quitarDelCarrito', id }),
      reiniciarInventario: () => dispatch({ type: 'reiniciar', estado: estadoInicial() }),
    }),
    [estado],
  )

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>
}

export default InventarioProvider
