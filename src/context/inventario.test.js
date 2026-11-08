import { describe, expect, it } from 'vitest'
import { inventarioReducer } from './inventario.js'

const base = () => ({
  articulos: [
    { id: 1, nombre: 'Leche', marca: 'Colun', tipo: 'Lácteos', stock: 5, stockMinimo: 2, precio: 1000 },
    { id: 2, nombre: 'Pan', marca: 'Ideal', tipo: 'Panadería', stock: 0, stockMinimo: 3, precio: 2000 },
    { id: 3, nombre: 'Agua', marca: 'Cachantun', tipo: 'Bebidas', stock: 8, stockMinimo: 4, precio: 800 },
  ],
  carrito: [],
  siguienteId: 4,
})

const stock = (estado, id) => estado.articulos.find((a) => a.id === id).stock
const enCarrito = (estado, id) => estado.carrito.find((l) => l.id === id)?.cantidad ?? 0
/** stock + carrito por artículo: debe mantenerse en cada acción del carrito. */
const totales = (estado) => Object.fromEntries(estado.articulos.map((a) => [a.id, a.stock + enCarrito(estado, a.id)]))

/** Aplica varias acciones seguidas. */
const aplicar = (estado, ...acciones) => acciones.reduce(inventarioReducer, estado)

describe('inventarioReducer: carrito', () => {
  it('agregarAlCarrito mueve unidades del stock al carrito', () => {
    const e = aplicar(base(), { type: 'agregarAlCarrito', id: 1, cantidad: 3 })
    expect(stock(e, 1)).toBe(2)
    expect(enCarrito(e, 1)).toBe(3)
  })

  it('agregarAlCarrito acumula en la misma línea y no pasa del stock', () => {
    const e = aplicar(base(), { type: 'agregarAlCarrito', id: 1, cantidad: 3 }, { type: 'agregarAlCarrito', id: 1, cantidad: 10 })
    expect(stock(e, 1)).toBe(0)
    expect(enCarrito(e, 1)).toBe(5)
    expect(e.carrito).toHaveLength(1)
  })

  it.each([
    ['sin stock', 2, 1],
    ['cantidad 0', 1, 0],
    ['cantidad negativa', 1, -2],
    ['id inexistente', 99, 1],
  ])('agregarAlCarrito no cambia nada con %s', (_, id, cantidad) => {
    const inicial = base()
    expect(inventarioReducer(inicial, { type: 'agregarAlCarrito', id, cantidad })).toBe(inicial)
  })

  it('aumentar y disminuir mueven de a una unidad', () => {
    const e1 = aplicar(base(), { type: 'agregarAlCarrito', id: 3, cantidad: 2 }, { type: 'aumentar', id: 3 })
    expect([stock(e1, 3), enCarrito(e1, 3)]).toEqual([5, 3])
    const e2 = aplicar(e1, { type: 'disminuir', id: 3 })
    expect([stock(e2, 3), enCarrito(e2, 3)]).toEqual([6, 2])
  })

  it('aumentar no hace nada si no queda stock', () => {
    const e = aplicar(base(), { type: 'agregarAlCarrito', id: 1, cantidad: 5 })
    expect(inventarioReducer(e, { type: 'aumentar', id: 1 })).toBe(e)
  })

  it('la línea sale del carrito cuando su cantidad llega a 0', () => {
    const e = aplicar(base(), { type: 'agregarAlCarrito', id: 1, cantidad: 1 }, { type: 'disminuir', id: 1 })
    expect(e.carrito).toEqual([])
    expect(stock(e, 1)).toBe(5)
  })

  it('disminuir una línea que no está en el carrito no cambia nada', () => {
    const inicial = base()
    expect(inventarioReducer(inicial, { type: 'disminuir', id: 1 })).toBe(inicial)
  })

  it('quitarDelCarrito devuelve todas las unidades al stock', () => {
    const e = aplicar(base(), { type: 'agregarAlCarrito', id: 3, cantidad: 6 }, { type: 'quitarDelCarrito', id: 3 })
    expect(stock(e, 3)).toBe(8)
    expect(e.carrito).toEqual([])
  })

  it('stock + carrito se mantiene igual después de cada acción', () => {
    const inicial = base()
    const esperado = totales(inicial)
    const acciones = [
      { type: 'agregarAlCarrito', id: 1, cantidad: 2 },
      { type: 'agregarAlCarrito', id: 3, cantidad: 9 },
      { type: 'aumentar', id: 1 },
      { type: 'aumentar', id: 2 },
      { type: 'disminuir', id: 3 },
      { type: 'quitarDelCarrito', id: 1 },
      { type: 'disminuir', id: 3 },
    ]
    let e = inicial
    for (const accion of acciones) {
      e = inventarioReducer(e, accion)
      expect(totales(e)).toEqual(esperado)
    }
  })

  it('no modifica el estado anterior', () => {
    const inicial = base()
    const copia = structuredClone(inicial)
    aplicar(inicial, { type: 'agregarAlCarrito', id: 1, cantidad: 2 }, { type: 'disminuir', id: 1 }, { type: 'eliminar', id: 3 })
    expect(inicial).toEqual(copia)
  })
})

describe('inventarioReducer: artículos', () => {
  it('agregar usa siguienteId y lo incrementa', () => {
    const e = aplicar(base(), { type: 'agregar', articulo: { nombre: 'Té', marca: 'Supremo', tipo: 'Despensa', stock: 1, stockMinimo: 1, precio: 1 } })
    expect(e.articulos.at(-1).id).toBe(4)
    expect(e.siguienteId).toBe(5)
  })

  it('no repite ids después de eliminar el último y agregar otro', () => {
    const nuevo = { nombre: 'Té', marca: 'Supremo', tipo: 'Despensa', stock: 1, stockMinimo: 1, precio: 1 }
    const e = aplicar(base(), { type: 'eliminar', id: 3 }, { type: 'agregar', articulo: nuevo })
    expect(e.articulos.map((a) => a.id)).toEqual([1, 2, 4])
  })

  it('eliminar saca el artículo y su línea del carrito; restaurar los devuelve en su posición', () => {
    const conCarrito = aplicar(base(), { type: 'agregarAlCarrito', id: 1, cantidad: 2 }, { type: 'agregarAlCarrito', id: 3, cantidad: 1 })
    const articulo = conCarrito.articulos[0]
    const linea = conCarrito.carrito[0]

    const eliminado = inventarioReducer(conCarrito, { type: 'eliminar', id: 1 })
    expect(eliminado.articulos.map((a) => a.id)).toEqual([2, 3])
    expect(eliminado.carrito.map((l) => l.id)).toEqual([3])

    const restaurado = inventarioReducer(eliminado, { type: 'restaurar', articulo, linea, indice: 0 })
    expect(restaurado.articulos).toEqual(conCarrito.articulos)
    expect(enCarrito(restaurado, 1)).toBe(2)
  })

  it('restaurar sin línea de carrito solo devuelve el artículo', () => {
    const inicial = base()
    const articulo = inicial.articulos[1]
    const e = aplicar(inicial, { type: 'eliminar', id: 2 }, { type: 'restaurar', articulo, linea: undefined, indice: 1 })
    expect(e.articulos).toEqual(inicial.articulos)
    expect(e.carrito).toEqual([])
  })

  it('restaurar no hace nada si falta el artículo o su id ya existe', () => {
    const inicial = base()
    expect(inventarioReducer(inicial, { type: 'restaurar', articulo: undefined, indice: 0 })).toBe(inicial)
    expect(inventarioReducer(inicial, { type: 'restaurar', articulo: inicial.articulos[0], linea: { id: 1, cantidad: 2 }, indice: 0 })).toBe(inicial)
  })

  it('reiniciar reemplaza todo por el estado recibido', () => {
    const nuevo = { articulos: [], carrito: [], siguienteId: 1 }
    expect(aplicar(base(), { type: 'agregarAlCarrito', id: 1, cantidad: 1 }, { type: 'reiniciar', estado: nuevo })).toBe(nuevo)
  })

  it('lanza un error con una acción desconocida', () => {
    expect(() => inventarioReducer(base(), { type: 'volar' })).toThrow(/desconocida/)
  })
})
