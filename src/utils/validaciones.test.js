import { describe, expect, it } from 'vitest'
import { esquemaArticulo, validar } from './validaciones.js'

const valido = { nombre: 'Leche entera 1 L', marca: 'Colun', tipo: 'Lácteos', stock: '10', stockMinimo: '5', precio: '1190' }
const existentes = [{ id: 1, nombre: 'Yogur natural 1 kg', marca: 'Soprole' }]

/** Valida el artículo válido con un campo cambiado. */
const conCampo = (campo, valor) => validar({ ...valido, [campo]: valor }, existentes)

describe('validar', () => {
  it('acepta un artículo válido', () => {
    expect(validar(valido, existentes)).toEqual({})
  })

  it.each(['Pan amasado con ñandú', 'Leche entera 1 L', 'Bebida 12%', 'Té (caja 20 u.)', 'Agua mineral 1,5 L'])(
    'acepta el nombre "%s"',
    (nombre) => {
      expect(conCampo('nombre', nombre).nombre).toBeUndefined()
    },
  )

  it.each(['', '   ', 'Pa', '<script>', '-Leche', 'a'.repeat(61)])('rechaza el nombre "%s"', (nombre) => {
    expect(conCampo('nombre', nombre).nombre).toBeDefined()
  })

  it.each(['Coca-Cola', "D'Olivo", 'P&G', 'Nestlé'])('acepta la marca "%s"', (marca) => {
    expect(conCampo('marca', marca).marca).toBeUndefined()
  })

  it.each(['', 'X', '<b>', '#Marca'])('rechaza la marca "%s"', (marca) => {
    expect(conCampo('marca', marca).marca).toBeDefined()
  })

  it('exige un tipo de la lista', () => {
    expect(conCampo('tipo', '').tipo).toBeDefined()
    expect(conCampo('tipo', 'Juguetes').tipo).toBeDefined()
  })

  it.each(['0', '25', ' 7 '])('acepta el stock "%s"', (stock) => {
    expect(conCampo('stock', stock).stock).toBeUndefined()
    expect(conCampo('stockMinimo', stock).stockMinimo).toBeUndefined()
  })

  it.each(['', '-5', '1.5', '1e3', 'diez'])('rechaza el stock "%s"', (stock) => {
    expect(conCampo('stock', stock).stock).toBeDefined()
    expect(conCampo('stockMinimo', stock).stockMinimo).toBeDefined()
  })

  it.each(['0', '-100', '1.5', '1e3', '0100', ''])('rechaza el precio "%s"', (precio) => {
    expect(conCampo('precio', precio).precio).toBeDefined()
  })

  it('rechaza un duplicado de nombre y marca sin importar mayúsculas ni espacios', () => {
    const errores = validar({ ...valido, nombre: ' YOGUR NATURAL 1 KG ', marca: 'soprole' }, existentes)
    expect(errores.nombre).toMatch(/ya existe/i)
  })

  it('no considera duplicado el mismo nombre con otra marca', () => {
    expect(validar({ ...valido, nombre: 'Yogur natural 1 kg', marca: 'Colun' }, existentes)).toEqual({})
  })
})

describe('esquemaArticulo', () => {
  it('describe los seis campos del formulario', () => {
    expect(esquemaArticulo.map((c) => c.id)).toEqual(['nombre', 'marca', 'tipo', 'stock', 'stockMinimo', 'precio'])
  })
})
