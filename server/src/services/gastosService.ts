import { Gasto } from '../types/gasto'

// Guardamos los gastos en memoria — una lista que vive mientras el servidor está encendido
let gastos: Gasto[] = []

// Devuelve todos los gastos
function obtenerTodos(): Gasto[] {
  return gastos
}

// Añade un gasto nuevo a la lista
function crear(gasto: Gasto): Gasto {
  gastos.push(gasto)
  return gasto
}

// Edita un gasto existente y devuelve el gasto actualizado
// Si no encuentra el gasto devuelve null
function editar(id: string, datosNuevos: Gasto): Gasto | null {
  let gastoActualizado = null

  gastos = gastos.map((g) => {
    if (g.id === id) {
      gastoActualizado = { ...g, ...datosNuevos }
      return gastoActualizado
    } else {
      return g
    }
  })

  return gastoActualizado
}

// Elimina un gasto de la lista
// Devuelve true si lo encontró y eliminó, false si no existía
function eliminar(id: string): boolean {
  const longitudAntes = gastos.length
  gastos = gastos.filter((g) => g.id !== id)
  return gastos.length < longitudAntes
}

export { obtenerTodos, crear, editar, eliminar }