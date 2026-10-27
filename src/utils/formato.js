/** Formateador de moneda chilena: 1190 -> "$1.190". Se crea una sola vez y se reutiliza. */
const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

export function formatearPrecio(valor) {
  return formatoCLP.format(valor)
}

/** Formato numérico con separador de miles: 1234 -> "1.234". */
export function formatearNumero(valor) {
  return valor.toLocaleString('es-CL')
}