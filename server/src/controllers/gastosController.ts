import { Request, Response } from 'express'
import * as gastosService from '../services/gastosService'

// GET /api/v1/gastos — devuelve todos los gastos
function getGastos(req: Request, res: Response) {
  const gastos = gastosService.obtenerTodos()
  res.status(200).json(gastos)
}

// POST /api/v1/gastos — crea un gasto nuevo
function postGasto(req: Request, res: Response) {
  const gasto = req.body

  // Comprobamos que llegan los campos obligatorios
  if (!gasto.id || !gasto.cantidad || !gasto.categoria || !gasto.fecha) {
    res.status(400).json({ error: 'Faltan campos obligatorios' })
    return
  }

  const gastoCreado = gastosService.crear(gasto)
  res.status(201).json(gastoCreado)
}

// PUT /api/v1/gastos/:id — edita un gasto existente
function putGasto(req: Request, res: Response) {
  const id = req.params.id as string
  const datosNuevos = req.body

  const gastoActualizado = gastosService.editar(id, datosNuevos)

  // Si el servicio devuelve null es que no encontró el gasto
  if (gastoActualizado === null) {
    res.status(404).json({ error: 'Gasto no encontrado' })
    return
  }

  res.status(200).json(gastoActualizado)
}

// DELETE /api/v1/gastos/:id — elimina un gasto
function deleteGasto(req: Request, res: Response) {
  const id = req.params.id as string
  const eliminado = gastosService.eliminar(id)

  // Si el servicio devuelve false es que no encontró el gasto
  if (!eliminado) {
    res.status(404).json({ error: 'Gasto no encontrado' })
    return
  }

  res.status(200).json({ mensaje: 'Gasto eliminado correctamente' })
}

export { getGastos, postGasto, putGasto, deleteGasto }