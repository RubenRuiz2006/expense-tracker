import { GastosContext } from './GastosContext'
import useGastos from '../hooks/useGastos'

interface Props {
  children: React.ReactNode
}

export default function GastosProvider({ children }: Props) {
  const { gastos, guardarGasto, eliminarGasto, cargando, error } = useGastos()

  return (
    <GastosContext.Provider value={{ gastos, guardarGasto, eliminarGasto, cargando, error }}>
      {children}
    </GastosContext.Provider>
  )
}