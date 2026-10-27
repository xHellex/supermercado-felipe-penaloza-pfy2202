/**
 * Inventario de ejemplo del supermercado.
 * stockMinimo: cantidad bajo la cual el producto debe reponerse.
 * precio: valor unitario en pesos chilenos (CLP).
 */
export const productos = [
  { id: 1, nombre: 'Leche entera 1 L', categoria: 'Lácteos', stock: 120, stockMinimo: 40, precio: 1190 },
  { id: 2, nombre: 'Yogur natural 1 kg', categoria: 'Lácteos', stock: 18, stockMinimo: 25, precio: 2490 },
  { id: 3, nombre: 'Queso gauda laminado 250 g', categoria: 'Lácteos', stock: 0, stockMinimo: 15, precio: 3290 },
  { id: 4, nombre: 'Pan de molde integral', categoria: 'Panadería', stock: 45, stockMinimo: 20, precio: 2190 },
  { id: 5, nombre: 'Marraqueta (kg)', categoria: 'Panadería', stock: 60, stockMinimo: 30, precio: 2390 },
  { id: 6, nombre: 'Manzana roja (kg)', categoria: 'Frutas y verduras', stock: 85, stockMinimo: 30, precio: 1590 },
  { id: 7, nombre: 'Palta hass (kg)', categoria: 'Frutas y verduras', stock: 12, stockMinimo: 20, precio: 4990 },
  { id: 8, nombre: 'Tomate (kg)', categoria: 'Frutas y verduras', stock: 70, stockMinimo: 25, precio: 1490 },
  { id: 9, nombre: 'Arroz grado 1 1 kg', categoria: 'Despensa', stock: 200, stockMinimo: 50, precio: 1390 },
  { id: 10, nombre: 'Aceite maravilla 1 L', categoria: 'Despensa', stock: 35, stockMinimo: 40, precio: 2790 },
  { id: 11, nombre: 'Fideos spaghetti 400 g', categoria: 'Despensa', stock: 150, stockMinimo: 60, precio: 890 },
  { id: 12, nombre: 'Detergente líquido 3 L', categoria: 'Limpieza', stock: 22, stockMinimo: 10, precio: 7990 },
  { id: 13, nombre: 'Papel higiénico 12 rollos', categoria: 'Limpieza', stock: 8, stockMinimo: 15, precio: 5490 },
  { id: 14, nombre: 'Agua mineral 1,5 L', categoria: 'Bebidas', stock: 180, stockMinimo: 60, precio: 790 },
]