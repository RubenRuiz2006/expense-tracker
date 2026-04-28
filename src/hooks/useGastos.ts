import { useState, useCallback, useEffect } from 'react'
import type { Gasto } from '../types/gasto'
import * as api from '../api/client'

const STORAGE_KEY = 'expense-tracker-gastos'

function guardarEnStorage(gastos: Gasto[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos))
}

function cargarDeStorage(): Gasto[] {
  try {
    const datos = localStorage.getItem(STORAGE_KEY)
    return datos ? JSON.parse(datos) : []
  } catch {
    return []
  }
}

export default function useGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function cargarGastos() {
      setCargando(true)
      try {
        const datos = await api.obtenerGastos()
        setGastos(datos)
        guardarEnStorage(datos)
      } catch {
        // Si falla el servidor cargamos desde LocalStorage
        const datosLocales = cargarDeStorage()
        setGastos(datosLocales)
        setError('Sin conexión al servidor — mostrando datos locales')
      } finally {
        setCargando(false)
      }
    }

    cargarGastos()
  }, [])

  const guardarGasto = useCallback(async (gasto: Gasto) => {
    try {
      const yaExiste = gastos.find((g) => g.id === gasto.id)

      if (yaExiste) {
        const gastoActualizado = await api.editarGasto(gasto)
        setGastos((gastosActuales) => {
          const nuevos = gastosActuales.map((g) => {
            if (g.id === gastoActualizado.id) {
              return gastoActualizado
            } else {
              return g
            }
          })
          guardarEnStorage(nuevos)
          return nuevos
        })
      } else {
        const gastoCreado = await api.crearGasto(gasto)
        setGastos((gastosActuales) => {
          const nuevos = [...gastosActuales, gastoCreado]
          guardarEnStorage(nuevos)
          return nuevos
        })
      }
    } catch {
      setError('Error al guardar el gasto')
    }
  }, [gastos])

  const eliminarGasto = useCallback(async (id: string) => {
    try {
      await api.eliminarGasto(id)
      setGastos((gastosActuales) => {
        const nuevos = gastosActuales.filter((g) => g.id !== id)
        guardarEnStorage(nuevos)
        return nuevos
      })
    } catch {
      setError('Error al eliminar el gasto')
    }
  }, [])

  return { gastos, guardarGasto, eliminarGasto, cargando, error }
}