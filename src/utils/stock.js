/** Estado de stock de un artículo, con las clases Tailwind de su etiqueta. */
export function estadoStock(articulo) {
  if (articulo.stock === 0) {
    return { texto: 'Sin stock', clases: 'bg-red-50 text-red-800 ring-red-200' }
  }
  if (articulo.stock <= articulo.stockMinimo) {
    return { texto: 'Stock bajo', clases: 'bg-amber-50 text-amber-800 ring-amber-200' }
  }
  return { texto: 'Disponible', clases: 'bg-verde-50 text-verde-900 ring-verde-100' }
}
