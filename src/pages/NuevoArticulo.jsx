import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import { useInventario } from '../context/inventario.js'
import { tiposProducto } from '../data/productos.js'

const formularioVacio = { nombre: '', marca: '', tipo: '', stock: '', stockMinimo: '', precio: '' }

/** Devuelve un objeto campo -> mensaje de error. Vacío si el formulario es válido. */
function validar(datos, articulos) {
  const errores = {}
  if (datos.nombre.trim().length < 3) errores.nombre = 'Ingresa un nombre de al menos 3 caracteres.'
  if (!datos.marca.trim()) errores.marca = 'Ingresa la marca.'
  if (!datos.tipo) errores.tipo = 'Selecciona el tipo de producto.'

  for (const campo of ['stock', 'stockMinimo']) {
    if (datos[campo] === '' || !Number.isInteger(Number(datos[campo])) || Number(datos[campo]) < 0) {
      errores[campo] = 'Debe ser un número entero mayor o igual a 0.'
    }
  }
  if (datos.precio === '' || !Number.isInteger(Number(datos.precio)) || Number(datos.precio) <= 0) {
    errores.precio = 'Debe ser un monto entero mayor a 0.'
  }

  const repetido = articulos.some(
    (a) =>
      a.nombre.toLowerCase() === datos.nombre.trim().toLowerCase() &&
      a.marca.toLowerCase() === datos.marca.trim().toLowerCase(),
  )
  if (repetido) errores.nombre = 'Ya existe un artículo con ese nombre y marca.'

  return errores
}

/** Campo de formulario con su etiqueta y mensaje de error accesible. */
function Campo({ id, etiqueta, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-slate-700">
        {etiqueta}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Formulario para agregar artículos al estado global del inventario.
 * Al guardar, navega al listado con useNavigate y le pasa el nombre agregado por state.
 */
function NuevoArticulo() {
  const { articulos, agregarArticulo } = useInventario()
  const navigate = useNavigate()

  const [datos, setDatos] = useState(formularioVacio)
  const [errores, setErrores] = useState({})

  /* Un solo manejador para todos los campos: usa el atributo name del input. */
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const guardar = (e) => {
    e.preventDefault()
    const encontrados = validar(datos, articulos)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    const nombre = datos.nombre.trim()
    agregarArticulo({
      nombre,
      marca: datos.marca.trim(),
      tipo: datos.tipo,
      stock: Number(datos.stock),
      stockMinimo: Number(datos.stockMinimo),
      precio: Number(datos.precio),
    })
    navigate('/inventario', { state: { agregado: nombre } })
  }

  const claseInput = (campo) =>
    `w-full rounded-lg border bg-white px-3 py-2 focus:ring-2 focus:outline-none ${
      errores[campo] ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-verde-500 focus:ring-verde-100'
    }`

  /* Atributos comunes de cada input: valor, cambio y accesibilidad del error. */
  const propsCampo = (campo) => ({
    id: campo,
    name: campo,
    value: datos[campo],
    onChange: cambiar,
    className: claseInput(campo),
    'aria-invalid': Boolean(errores[campo]),
    'aria-describedby': errores[campo] ? `${campo}-error` : undefined,
  })

  return (
    <section className="motion-safe:animate-entrar">
      <EncabezadoPagina antetitulo="Inventario" titulo="Agregar artículo">
        Ingresa los datos del producto. Al guardarlo queda disponible en el listado y en los indicadores del inicio.
      </EncabezadoPagina>

      <form onSubmit={guardar} noValidate className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Campo id="nombre" etiqueta="Nombre del producto" error={errores.nombre}>
              <input type="text" placeholder="Ej: Leche descremada 1 L" {...propsCampo('nombre')} />
            </Campo>
          </div>

          <Campo id="marca" etiqueta="Marca" error={errores.marca}>
            <input type="text" placeholder="Ej: Colun" {...propsCampo('marca')} />
          </Campo>

          <Campo id="tipo" etiqueta="Tipo de producto" error={errores.tipo}>
            <select {...propsCampo('tipo')}>
              <option value="">Selecciona un tipo</option>
              {tiposProducto.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Campo>

          <Campo id="stock" etiqueta="Stock actual" error={errores.stock}>
            <input type="number" min="0" step="1" inputMode="numeric" {...propsCampo('stock')} />
          </Campo>

          <Campo id="stockMinimo" etiqueta="Stock mínimo" error={errores.stockMinimo}>
            <input type="number" min="0" step="1" inputMode="numeric" {...propsCampo('stockMinimo')} />
          </Campo>

          <Campo id="precio" etiqueta="Precio unitario (CLP)" error={errores.precio}>
            <input type="number" min="1" step="1" inputMode="numeric" {...propsCampo('precio')} />
          </Campo>
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setDatos(formularioVacio)
              setErrores({})
            }}
            className="rounded-lg px-5 py-2 font-semibold text-slate-600 ring-1 ring-slate-300 hover:bg-slate-50"
          >
            Limpiar
          </button>
          <button type="submit" className="rounded-lg bg-verde-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-verde-900">
            Guardar artículo
          </button>
        </div>
      </form>
    </section>
  )
}

export default NuevoArticulo
