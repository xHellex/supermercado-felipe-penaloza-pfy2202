import { describe, expect, it } from 'vitest'
import { filtrarArticulos, lineasCarrito, resumenInventario, tiposDisponibles, totalCarrito } from './selectores.js'

const articulos = [
  { id: 1, nombre: 'Leche entera 1 L', marca: 'Colun', tipo: 'Lácteos', stock: 10, stockMinimo: 5, precio: 1000 },
  { id: 2, nombre: 'Yogur natural', marca: 'Soprole', tipo: 'Lácteos', stock: 5, stockMinimo: 5, precio: 500 },
  { id: 3, nombre: 'Fideos', marca: 'Carozzi', tipo: 'Despensa', stock: 0, stockMinimo: 3, precio: 900 },
]

describe('resumenInventario', () => {
  it('calcula cantidad, unidades, valor, tipos y por reponer', () => {
    const r = resumenInventario(articulos)
    expect(r.articulos).toBe(3)
    expect(r.unidades).toBe(15)
    expect(r.valor).toBe(10 * 1000 + 5 * 500)
    expect(r.tipos).toBe(2)
    expect(r.porReponer.map((a) => a.id)).toEqual([2, 3])
  })

  it('funciona con un inventario vacío', () => {
    expect(resumenInventario([])).toEqual({ articulos: 0, unidades: 0, valor: 0, tipos: 0, porReponer: [] })
  })
})

describe('tiposDisponibles', () => {
  it('antepone "Todos" y no repite tipos', () => {
    expect(tiposDisponibles(articulos)).toEqual(['Todos', 'Lácteos', 'Despensa'])
  })
})

describe('filtrarArticulos', () => {
  it('sin filtros devuelve todos', () => {
    expect(filtrarArticulos(articulos, {})).toHaveLength(3)
    expect(filtrarArticulos(articulos, { tipo: 'Todos', texto: '' })).toHaveLength(3)
  })

  it('filtra por tipo', () => {
    expect(filtrarArticulos(articulos, { tipo: 'Despensa' }).map((a) => a.id)).toEqual([3])
  })

  it('busca por nombre o marca sin distinguir mayúsculas ni espacios', () => {
    expect(filtrarArticulos(articulos, { texto: '  LECHE ' }).map((a) => a.id)).toEqual([1])
    expect(filtrarArticulos(articulos, { texto: 'soprole' }).map((a) => a.id)).toEqual([2])
  })

  it('combina tipo y texto', () => {
    expect(filtrarArticulos(articulos, { tipo: 'Despensa', texto: 'leche' })).toEqual([])
  })

  it('no modifica el arreglo original', () => {
    const copia = structuredClone(articulos)
    filtrarArticulos(articulos, { tipo: 'Lácteos', texto: 'yogur' })
    expect(articulos).toEqual(copia)
  })
})

describe('carrito', () => {
  const carrito = [
    { id: 1, cantidad: 2 },
    { id: 3, cantidad: 1 },
    { id: 99, cantidad: 4 },
  ]

  it('arma las líneas con artículo y subtotal, ignorando ids inexistentes', () => {
    const lineas = lineasCarrito(articulos, carrito)
    expect(lineas.map((l) => [l.articulo.id, l.cantidad, l.subtotal])).toEqual([
      [1, 2, 2000],
      [3, 1, 900],
    ])
  })

  it('totaliza unidades y monto', () => {
    expect(totalCarrito(lineasCarrito(articulos, carrito))).toEqual({ unidades: 3, total: 2900 })
    expect(totalCarrito([])).toEqual({ unidades: 0, total: 0 })
  })
})
