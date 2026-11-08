import { articulosIniciales } from '../data/productos.js'

/**
 * Persistencia del inventario en localStorage (funciones puras, sin acceder al navegador).
 * Lo leído se valida antes de usarlo: un dato dañado o de otra versión no debe romper el sitio.
 */
export const VERSION = 2
export const CLAVE = 'supermercado:inventario'
/** Clave de la semana 2, que guardaba solo el arreglo de artículos. */
export const CLAVE_ANTERIOR = 'supermercado:articulos'

const esEnteroNoNegativo = (n) => Number.isInteger(n) && n >= 0

const siguienteIdDe = (articulos) => Math.max(0, ...articulos.map((a) => a.id)) + 1

/** Inventario de ejemplo con el carrito vacío. */
export function estadoInicial() {
  return { articulos: articulosIniciales, carrito: [], siguienteId: siguienteIdDe(articulosIniciales) }
}

/** true si el artículo tiene la forma que espera la aplicación. */
export function esArticuloValido(a) {
  return (
    a !== null &&
    typeof a === 'object' &&
    Number.isInteger(a.id) &&
    typeof a.nombre === 'string' &&
    typeof a.marca === 'string' &&
    typeof a.tipo === 'string' &&
    esEnteroNoNegativo(a.stock) &&
    esEnteroNoNegativo(a.stockMinimo) &&
    esEnteroNoNegativo(a.precio)
  )
}

/** Valida los artículos y limpia el carrito; null si los artículos no sirven. */
function normalizar(articulos, carrito, siguienteId) {
  if (!Array.isArray(articulos) || !articulos.every(esArticuloValido)) return null
  const ids = new Set(articulos.map((a) => a.id))
  if (ids.size !== articulos.length) return null

  const lineas = Array.isArray(carrito) ? carrito : []
  return {
    articulos,
    carrito: lineas.filter((l) => l && ids.has(l.id) && Number.isInteger(l.cantidad) && l.cantidad > 0),
    // Nunca menor al mayor id + 1: evita repetir ids si el valor guardado está desfasado
    siguienteId: Math.max(Number.isInteger(siguienteId) ? siguienteId : 0, siguienteIdDe(articulos)),
  }
}

/**
 * Convierte el texto guardado en un estado válido:
 * - v2 ({ version, articulos, carrito, siguienteId }): se usa tras validarla;
 * - arreglo simple (formato de la semana 2): se migra con el carrito vacío;
 * - cualquier otra cosa (null, JSON dañado, otra versión, forma inválida): inventario inicial.
 */
export function cargarEstado(texto) {
  if (!texto) return estadoInicial()
  let datos
  try {
    datos = JSON.parse(texto)
  } catch {
    return estadoInicial()
  }

  const estado = Array.isArray(datos)
    ? normalizar(datos, [], 0)
    : datos?.version === VERSION
      ? normalizar(datos.articulos, datos.carrito, datos.siguienteId)
      : null

  return estado ?? estadoInicial()
}

/** Texto a guardar en localStorage, con la versión del formato. */
export function serializarEstado({ articulos, carrito, siguienteId }) {
  return JSON.stringify({ version: VERSION, articulos, carrito, siguienteId })
}
