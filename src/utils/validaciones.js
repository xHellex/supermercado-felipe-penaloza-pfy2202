import { tiposProducto } from '../data/productos.js'

/**
 * Esquema del formulario de artículos: cómo se dibuja cada campo y qué formato admite.
 * Lo usa NuevoArticulo para generar los campos y validar() para revisarlos,
 * así una regla se cambia en un solo lugar y sirve también para editar o importar.
 *
 * patron (bandera u para aceptar tildes y ñ):
 * - nombre: empieza con letra o número; luego letras, números, espacios y . , % ( ) / -; 3 a 60 caracteres.
 * - marca: empieza con letra o número; luego letras, números, espacios y . & ' -; 2 a 40 caracteres.
 * - stock y stock mínimo: solo dígitos (enteros ≥ 0, sin signo, decimales ni notación 1e3).
 * - precio: entero > 0 sin ceros a la izquierda.
 */
export const esquemaArticulo = [
  {
    id: 'nombre',
    etiqueta: 'Nombre del producto',
    control: 'input',
    type: 'text',
    placeholder: 'Ej: Leche descremada 1 L',
    patron: /^[\p{L}\d][\p{L}\d\s.,%()/-]{2,59}$/u,
    mensaje: 'Usa de 3 a 60 caracteres: letras, números, espacios y . , % ( ) / -',
    span: true,
  },
  {
    id: 'marca',
    etiqueta: 'Marca',
    control: 'input',
    type: 'text',
    placeholder: 'Ej: Colun',
    patron: /^[\p{L}\d][\p{L}\d\s.&'-]{1,39}$/u,
    mensaje: "Usa de 2 a 40 caracteres: letras, números, espacios y . & ' -",
  },
  {
    id: 'tipo',
    etiqueta: 'Tipo de producto',
    control: 'select',
    mensaje: 'Selecciona el tipo de producto.',
  },
  {
    id: 'stock',
    etiqueta: 'Stock actual',
    control: 'input',
    type: 'number',
    min: 0,
    patron: /^\d+$/,
    mensaje: 'Debe ser un número entero mayor o igual a 0.',
  },
  {
    id: 'stockMinimo',
    etiqueta: 'Stock mínimo',
    control: 'input',
    type: 'number',
    min: 0,
    patron: /^\d+$/,
    mensaje: 'Debe ser un número entero mayor o igual a 0.',
  },
  {
    id: 'precio',
    etiqueta: 'Precio unitario (CLP)',
    control: 'input',
    type: 'number',
    min: 1,
    patron: /^[1-9]\d*$/,
    mensaje: 'Debe ser un monto entero mayor a 0.',
  },
]

/** Devuelve un objeto campo -> mensaje de error. Vacío si el formulario es válido. */
export function validar(datos, articulos) {
  const errores = {}

  for (const { id, patron, mensaje } of esquemaArticulo) {
    const valor = String(datos[id] ?? '').trim()
    const valido = patron ? patron.test(valor) : tiposProducto.includes(valor)
    if (!valido) errores[id] = mensaje
  }

  const nombre = String(datos.nombre ?? '').trim().toLowerCase()
  const marca = String(datos.marca ?? '').trim().toLowerCase()
  const repetido = articulos.some((a) => a.nombre.toLowerCase() === nombre && a.marca.toLowerCase() === marca)
  if (repetido) errores.nombre = 'Ya existe un artículo con ese nombre y marca.'

  return errores
}
