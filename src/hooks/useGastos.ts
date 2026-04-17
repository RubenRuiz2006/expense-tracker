import { useState, useCallback, useEffect } from 'react'
import type { Gasto } from '../types/gasto'
import * as api from '../api/client'

export default function useGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cuando el hook se monta cargamos los gastos del servidor
  useEffect(() => {
    async function cargarGastos() {
      setCargando(true)
      try {
        const datos = await api.obtenerGastos()
        setGastos(datos)
      } catch (e) {
        setError('Error al cargar los gastos')
      } finally {
        setCargando(false)
      }
    }

    cargarGastos()
  }, [])

  const guardarGasto = useCallback(async (gasto: Gasto) => {
    try {
      // Comprobamos si el gasto ya existe en la lista
      const yaExiste = gastos.find((g) => g.id === gasto.id)

      if (yaExiste) {
        // Si existe lo editamos en el servidor
        const gastoActualizado = await api.editarGasto(gasto)
        setGastos((gastosActuales) => {
          return gastosActuales.map((g) => {
            if (g.id === gastoActualizado.id) {
              return gastoActualizado
            } else {
              return g
            }
          })
        })
      } else {
        // Si no existe lo creamos en el servidor
        const gastoCreado = await api.crearGasto(gasto)
        setGastos((gastosActuales) => [...gastosActuales, gastoCreado])
      }
    } catch (e) {
      setError('Error al guardar el gasto')
    }
  }, [gastos])

  const eliminarGasto = useCallback(async (id: string) => {
    try {
      await api.eliminarGasto(id)
      setGastos((gastosActuales) => {
        return gastosActuales.filter((g) => g.id !== id)
      })
    } catch (e) {
      setError('Error al eliminar el gasto')
    }
  }, [])

  return { gastos, guardarGasto, eliminarGasto, cargando, error }
}