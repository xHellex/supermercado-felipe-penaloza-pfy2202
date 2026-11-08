/**
 * Campo de formulario a partir de una entrada de esquemaArticulo:
 * etiqueta, control (input o select) y mensaje de error accesible.
 *
 * @param {object}   campo    - Definición del campo (id, etiqueta, control, type, placeholder, min).
 * @param {string}   valor    - Valor actual.
 * @param {string}   error    - Mensaje de error; vacío si el campo es válido.
 * @param {Function} onChange - Manejador de cambio (lee e.target.name).
 * @param {string[]} opciones - Opciones del select.
 */
function CampoFormulario({ campo, valor, error, onChange, opciones = [] }) {
  const { id, etiqueta, control, type, placeholder, min } = campo
  const idError = `${id}-error`

  const props = {
    id,
    name: id,
    value: valor,
    onChange,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? idError : undefined,
    className: 'control',
  }

  return (
    <div className={campo.span ? 'md:col-span-2' : undefined}>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-slate-700">
        {etiqueta}
      </label>

      {control === 'select' ? (
        <select {...props}>
          <option value="">Selecciona una opción</option>
          {opciones.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          min={min}
          step={type === 'number' ? 1 : undefined}
          inputMode={type === 'number' ? 'numeric' : undefined}
          {...props}
        />
      )}

      {error && (
        <p id={idError} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default CampoFormulario
