/**
 * Inventario inicial del supermercado. Es el valor con que parte el estado
 * global (ver context/InventarioProvider.jsx); los artículos nuevos se agregan ahí.
 * tipo: tipo de producto. stockMinimo: cantidad bajo la cual hay que reponer.
 * precio: valor unitario en pesos chilenos (CLP).
 */
export const articulosIniciales = [
  { id: 1, nombre: 'Leche entera 1 L', marca: 'Colun', tipo: 'Lácteos', stock: 120, stockMinimo: 40, precio: 1190 },
  { id: 2, nombre: 'Yogur natural 1 kg', marca: 'Soprole', tipo: 'Lácteos', stock: 18, stockMinimo: 25, precio: 2490 },
  { id: 3, nombre: 'Queso gauda laminado 250 g', marca: 'Quillayes', tipo: 'Lácteos', stock: 0, stockMinimo: 15, precio: 3290 },
  { id: 4, nombre: 'Pan de molde integral', marca: 'Ideal', tipo: 'Panadería', stock: 45, stockMinimo: 20, precio: 2190 },
  { id: 5, nombre: 'Marraqueta (kg)', marca: 'Panadería propia', tipo: 'Panadería', stock: 60, stockMinimo: 30, precio: 2390 },
  { id: 6, nombre: 'Manzana roja (kg)', marca: 'Granel', tipo: 'Frutas y verduras', stock: 85, stockMinimo: 30, precio: 1590 },
  { id: 7, nombre: 'Palta hass (kg)', marca: 'Granel', tipo: 'Frutas y verduras', stock: 12, stockMinimo: 20, precio: 4990 },
  { id: 8, nombre: 'Tomate (kg)', marca: 'Granel', tipo: 'Frutas y verduras', stock: 70, stockMinimo: 25, precio: 1490 },
  { id: 9, nombre: 'Arroz grado 1 1 kg', marca: 'Tucapel', tipo: 'Despensa', stock: 200, stockMinimo: 50, precio: 1390 },
  { id: 10, nombre: 'Aceite maravilla 1 L', marca: 'Belmont', tipo: 'Despensa', stock: 35, stockMinimo: 40, precio: 2790 },
  { id: 11, nombre: 'Fideos spaghetti 400 g', marca: 'Carozzi', tipo: 'Despensa', stock: 150, stockMinimo: 60, precio: 890 },
  { id: 12, nombre: 'Detergente líquido 3 L', marca: 'Omo', tipo: 'Limpieza', stock: 22, stockMinimo: 10, precio: 7990 },
  { id: 13, nombre: 'Papel higiénico 12 rollos', marca: 'Confort', tipo: 'Limpieza', stock: 8, stockMinimo: 15, precio: 5490 },
  { id: 14, nombre: 'Agua mineral 1,5 L', marca: 'Cachantun', tipo: 'Bebidas', stock: 180, stockMinimo: 60, precio: 790 },
]

/** Tipos de producto que ofrece el formulario de ingreso. */
export const tiposProducto = ['Lácteos', 'Panadería', 'Frutas y verduras', 'Despensa', 'Limpieza', 'Bebidas', 'Congelados', 'Carnes']
