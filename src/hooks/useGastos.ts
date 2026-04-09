import { useState, useCallback } from 'react'
import type { Gasto } from '../types/gasto'

export default function useGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([])

  // useCallback evita que React cree esta función de nuevo cada vez que el componente se repinta
  const guardarGasto = useCallback((gasto: Gasto) => {
    setGastos((gastosActuales) => {
      // Comprobamos si el gasto ya existe en la lista
      const yaExiste = gastosActuales.find((g) => g.id === gasto.id)

      if (yaExiste) {
        // Si existe, lo reemplazamos por la versión editada
        return gastosActuales.map((g) => {
          if (g.id === gasto.id) {
            return gasto
          } else {
            return g
          }
        })
      } else {
        // Si no existe, lo añadimos al final
        return [...gastosActuales, gasto]
      }
    })
  }, [])

  const eliminarGasto = useCallback((id: string) => {
    setGastos((gastosActuales) => {
      return gastosActuales.filter((g) => {
        if (g.id === id) {
          return false
        } else {
          return true
        }
      })
    })
  }, [])

  // Devolvemos todo lo que necesitan los componentes
  return { gastos, guardarGasto, eliminarGasto }
}