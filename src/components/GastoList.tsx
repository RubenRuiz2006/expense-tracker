import type { Gasto } from '../types/gasto'
import GastoItem from './GastoItem'

interface Props {
  gastos: Gasto[]
  onEliminar: (id: string) => void
  onEditar: (gasto: Gasto) => void
}

export default function GastoList({ gastos, onEliminar, onEditar }: Props) {
  if (gastos.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-8">
        No hay gastos registrados todavía
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {gastos.map((gasto) => (
        <GastoItem
          key={gasto.id}
          gasto={gasto}
          onEliminar={onEliminar}
          onEditar={onEditar}
        />
      ))}
    </div>
  )
}