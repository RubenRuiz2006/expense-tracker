import type { Gasto } from '../types/gasto'

const URL_BASE = 'http://localhost:3000/api/v1/gastos'

// Obtiene todos los gastos del servidor
async function obtenerGastos(): Promise<Gasto[]> {
  const respuesta = await fetch(URL_BASE)
  const datos = await respuesta.json()
  return datos
}

// Crea un gasto nuevo en el servidor
async function crearGasto(gasto: Gasto): Promise<Gasto> {
  const respuesta = await fetch(URL_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gasto),
  })
  const datos = await respuesta.json()
  return datos
}

// Edita un gasto existente en el servidor
async function editarGasto(gasto: Gasto): Promise<Gasto> {
  const respuesta = await fetch(`${URL_BASE}/${gasto.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gasto),
  })
  const datos = await respuesta.json()
  return datos
}

// Elimina un gasto del servidor
async function eliminarGasto(id: string): Promise<void> {
  await fetch(`${URL_BASE}/${id}`, {
    method: 'DELETE',
  })
}

export { obtenerGastos, crearGasto, editarGasto, eliminarGasto }