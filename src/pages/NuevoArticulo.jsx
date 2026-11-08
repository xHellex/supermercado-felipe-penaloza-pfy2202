import { useState } from 'react'
import { useNavigate } from 'react-router'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import CampoFormulario from '../components/CampoFormulario.jsx'
import { useInventario } from '../context/inventario.js'
import { tiposProducto } from '../data/productos.js'
import { esquemaArticulo, validar } from '../utils/validaciones.js'

const formularioVacio = Object.fromEntries(esquemaArticulo.map((c) => [c.id, '']))

/**
 * Formulario para agregar artículos al estado global del inventario.
 * Los campos y sus reglas vienen de esquemaArticulo; aquí solo queda el estado y el envío.
 * Al guardar, navega al listado con useNavigate y le pasa el nombre agregado por state.
 */
function NuevoArticulo() {
  const { articulos, agregarArticulo } = useInventario()
  const navigate = useNavigate()

  const [datos, setDatos] = useState(formularioVacio)
  const [errores, setErrores] = useState({})

  /* Un solo manejador para todos los campos: usa el atributo name del control. */
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

  const limpiar = () => {
    setDatos(formularioVacio)
    setErrores({})
  }

  return (
    <section className="motion-safe:animate-entrar">
      <EncabezadoPagina antetitulo="Inventario" titulo="Agregar artículo">
        Ingresa los datos del producto. Al guardarlo queda disponible en el listado y en los indicadores del inicio.
      </EncabezadoPagina>

      <form onSubmit={guardar} noValidate className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          {esquemaArticulo.map((campo) => (
            <CampoFormulario
              key={campo.id}
              campo={campo}
              valor={datos[campo.id]}
              error={errores[campo.id]}
              onChange={cambiar}
              opciones={campo.control === 'select' ? tiposProducto : undefined}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={limpiar} className="btn btn-secundario">
            Limpiar
          </button>
          <button type="submit" className="btn btn-primario">
            Guardar artículo
          </button>
        </div>
      </form>
    </section>
  )
}

export default NuevoArticulo
