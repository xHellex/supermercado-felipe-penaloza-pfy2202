/**
 * Rutas del menú del sitio. Las recorren el menú superior (Encabezado) y el
 * inferior (BottomNav), así ambos quedan sincronizados desde un solo lugar.
 * end: la ruta solo queda activa si la URL coincide exacta (evita que "/" marque todo).
 */
export const rutasSitio = [
  { ruta: '/', texto: 'Inicio', end: true },
  { ruta: '/tiendas', texto: 'Nuestras tiendas' },
  { ruta: '/preguntas-frecuentes', texto: 'Preguntas frecuentes' },
]
