import { GastosContext } from './GastosContext'
import useGastos from '../hooks/useGastos'

interface Props {
  children: React.ReactNode
}

export default function GastosProvider({ children }: Props) {
  // Usamos el hook que ya teníamos para tener los gastos y las funciones
  const { gastos, guardarGasto, eliminarGasto } = useGastos()

  return (
    <GastosContext.Provider value={{ gastos, guardarGasto, eliminarGasto }}>
      {children}
    </GastosContext.Provider>
  )
}