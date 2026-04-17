import { Router } from 'express'
import { getGastos, postGasto, putGasto, deleteGasto } from '../controllers/gastosController'

const router = Router()

// Conectamos cada URL con su función del controlador
router.get('/', getGastos)
router.post('/', postGasto)
router.put('/:id', putGasto)
router.delete('/:id', deleteGasto)

export default router