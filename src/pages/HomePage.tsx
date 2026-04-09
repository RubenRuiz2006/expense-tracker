import { useState } from 'react'
import type { Gasto } from '../types/gasto'
import GastoForm from '../components/GastoForm'
import GastoList from '../components/GastoList'

interface Props {
  gastos: Gasto[]
  onGuardar: (gasto: Gasto) => void
  onEliminar: (id: string) => void
}

export default function HomePage({ gastos, onGuardar, onEliminar }: Props) {
  const [gastoEditar, setGastoEditar] = useState<Gasto | undefined>(undefined)

  function handleGuardar(gasto: Gasto) {
    onGuardar(gasto)
    setGastoEditar(undefined)
  }

  function handleEditar(gasto: Gasto) {
    setGastoEditar(gasto)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
      <GastoForm onGuardar={handleGuardar} gastoEditar={gastoEditar} />
      <GastoList
        gastos={gastos}
        onEliminar={onEliminar}
        onEditar={handleEditar}
      />
    </div>
  )
}