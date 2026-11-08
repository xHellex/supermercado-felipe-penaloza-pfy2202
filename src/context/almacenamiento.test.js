import { describe, expect, it } from 'vitest'
import { cargarEstado, esArticuloValido, estadoInicial, serializarEstado, VERSION } from './almacenamiento.js'
import { articulosIniciales } from '../data/productos.js'

const leche = { id: 1, nombre: 'Leche', marca: 'Colun', tipo: 'Lácteos', stock: 5, stockMinimo: 2, precio: 1000 }
const pan = { id: 7, nombre: 'Pan', marca: 'Ideal', tipo: 'Panadería', stock: 0, stockMinimo: 3, precio: 2000 }

describe('estadoInicial', () => {
  it('parte con los artículos de ejemplo, carrito vacío y el siguiente id libre', () => {
    const e = estadoInicial()
    expect(e.articulos).toEqual(articulosIniciales)
    expect(e.carrito).toEqual([])
    expect(e.siguienteId).toBe(Math.max(...articulosIniciales.map((a) => a.id)) + 1)
  })
})

describe('esArticuloValido', () => {
  it('acepta un artículo con la forma esperada', () => {
    expect(esArticuloValido(leche)).toBe(true)
  })

  it.each([
    ['null', null],
    ['id decimal', { ...leche, id: 1.5 }],
    ['nombre numérico', { ...leche, nombre: 3 }],
    ['sin marca', { ...leche, marca: undefined }],
    ['stock negativo', { ...leche, stock: -1 }],
    ['precio como texto', { ...leche, precio: '1000' }],
    ['stock mínimo NaN', { ...leche, stockMinimo: NaN }],
  ])('rechaza %s', (_, articulo) => {
    expect(esArticuloValido(articulo)).toBe(false)
  })
})

describe('cargarEstado', () => {
  it('usa un estado v2 válido', () => {
    const guardado = { version: VERSION, articulos: [leche, pan], carrito: [{ id: 1, cantidad: 2 }], siguienteId: 9 }
    expect(cargarEstado(JSON.stringify(guardado))).toEqual({ articulos: [leche, pan], carrito: [{ id: 1, cantidad: 2 }], siguienteId: 9 })
  })

  it('serializarEstado y cargarEstado son inversos', () => {
    const estado = { articulos: [leche], carrito: [{ id: 1, cantidad: 1 }], siguienteId: 2 }
    expect(cargarEstado(serializarEstado(estado))).toEqual(estado)
  })

  it('migra el formato de la semana 2 (arreglo simple) con el carrito vacío', () => {
    expect(cargarEstado(JSON.stringify([leche, pan]))).toEqual({ articulos: [leche, pan], carrito: [], siguienteId: 8 })
  })

  it('limpia líneas del carrito con ids inexistentes o cantidades inválidas', () => {
    const carrito = [{ id: 1, cantidad: 2 }, { id: 99, cantidad: 1 }, { id: 7, cantidad: 0 }, { id: 7, cantidad: 1.5 }, null]
    const guardado = { version: VERSION, articulos: [leche, pan], carrito, siguienteId: 9 }
    expect(cargarEstado(JSON.stringify(guardado)).carrito).toEqual([{ id: 1, cantidad: 2 }])
  })

  it('corrige un siguienteId ausente o menor que el mayor id', () => {
    const guardado = { version: VERSION, articulos: [leche, pan], carrito: [], siguienteId: 3 }
    expect(cargarEstado(JSON.stringify(guardado)).siguienteId).toBe(8)
  })

  it.each([
    ['null', null],
    ['texto vacío', ''],
    ['JSON dañado', '{"version": 2, "articulos": ['],
    ['un número', '42'],
    ['otra versión', JSON.stringify({ version: 99, articulos: [leche], carrito: [] })],
    ['artículos inválidos', JSON.stringify({ version: VERSION, articulos: [{ id: 'x' }], carrito: [] })],
    ['arreglo de la S2 con un artículo dañado', JSON.stringify([leche, { ...pan, stock: -3 }])],
    ['ids repetidos', JSON.stringify([leche, { ...pan, id: 1 }])],
  ])('parte con el inventario inicial si recibe %s', (_, texto) => {
    expect(cargarEstado(texto)).toEqual(estadoInicial())
  })
})
