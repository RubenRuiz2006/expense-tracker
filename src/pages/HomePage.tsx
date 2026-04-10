import { useState } from 'react'
import type { Gasto } from '../types/gasto'
import { useGastosContext } from '../context/GastosContext'
import GastoForm from '../components/GastoForm'
import GastoList from '../components/GastoList'

export default function HomePage() {
  // Cogemos los datos directamente del contexto — sin props
  const { gastos, guardarGasto, eliminarGasto } = useGastosContext()
  const [gastoEditar, setGastoEditar] = useState<Gasto | undefined>(undefined)

  function handleGuardar(gasto: Gasto) {
    guardarGasto(gasto)
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
        onEliminar={eliminarGasto}
        onEditar={handleEditar}
      />
    </div>
  )
}