import { createContext, useContext } from 'react'
import type { Gasto } from '../types/gasto'

// Definimos qué datos va a compartir el contexto
interface GastosContextType {
  gastos: Gasto[]
  guardarGasto: (gasto: Gasto) => void
  eliminarGasto: (id: string) => void
}

// Creamos el contexto — empieza vacío
export const GastosContext = createContext<GastosContextType | null>(null)

// Hook para usar el contexto fácilmente desde cualquier componente
export function useGastosContext() {
  const contexto = useContext(GastosContext)

  // Si alguien intenta usar el contexto fuera del Provider, avisamos del error
  if (contexto === null) {
    throw new Error('useGastosContext debe usarse dentro de GastosProvider')
  }

  return contexto
}