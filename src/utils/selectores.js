/**
 * Selectores: datos derivados del estado global. Nunca modifican lo que reciben;
 * Home, ListadoArticulos y Carrito los comparten en vez de repetir reduce y filter.
 */

/** Indicadores del inventario: cantidad de artículos, unidades, valor, tipos y los que hay que reponer. */
export function resumenInventario(articulos) {
  return {
    articulos: articulos.length,
    unidades: articulos.reduce((suma, a) => suma + a.stock, 0),
    valor: articulos.reduce((suma, a) => suma + a.stock * a.precio, 0),
    tipos: new Set(articulos.map((a) => a.tipo)).size,
    porReponer: articulos.filter((a) => a.stock <= a.stockMinimo),
  }
}

/** Opciones del filtro por tipo, con "Todos" al inicio y sin repetidos. */
export function tiposDisponibles(articulos) {
  return ['Todos', ...new Set(articulos.map((a) => a.tipo))]
}

/** Artículos que calzan con el tipo ('Todos' o vacío = sin filtro) y con el texto en nombre o marca. */
export function filtrarArticulos(articulos, { tipo = 'Todos', texto = '' }) {
  const buscado = texto.trim().toLowerCase()
  return articulos.filter(
    (a) =>
      (tipo === 'Todos' || a.tipo === tipo) &&
      (a.nombre.toLowerCase().includes(buscado) || a.marca.toLowerCase().includes(buscado)),
  )
}

/** Une cada línea del carrito con su artículo; omite las que apuntan a un artículo inexistente. */
export function lineasCarrito(articulos, carrito) {
  return carrito.flatMap(({ id, cantidad }) => {
    const articulo = articulos.find((a) => a.id === id)
    return articulo ? [{ articulo, cantidad, subtotal: cantidad * articulo.precio }] : []
  })
}

/** Unidades y monto total de las líneas del carrito. */
export function totalCarrito(lineas) {
  return {
    unidades: lineas.reduce((suma, l) => suma + l.cantidad, 0),
    total: lineas.reduce((suma, l) => suma + l.subtotal, 0),
  }
}
