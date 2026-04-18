import { createContext, useContext } from 'react'
import type { Gasto } from '../types/gasto'

interface GastosContextType {
  gastos: Gasto[]
  guardarGasto: (gasto: Gasto) => void
  eliminarGasto: (id: string) => void
  cargando: boolean
  error: string | null
}

export const GastosContext = createContext<GastosContextType | null>(null)

export function useGastosContext() {
  const contexto = useContext(GastosContext)
  if (contexto === null) {
    throw new Error('useGastosContext debe usarse dentro de GastosProvider')
  }
  return contexto
}