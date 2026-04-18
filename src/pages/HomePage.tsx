import { useState } from 'react'
import type { Gasto } from '../types/gasto'
import { useGastosContext } from '../context/GastosContext'
import GastoForm from '../components/GastoForm'
import GastoList from '../components/GastoList'

export default function HomePage() {
  const { gastos, guardarGasto, eliminarGasto, cargando, error } = useGastosContext()
  const [gastoEditar, setGastoEditar] = useState<Gasto | undefined>(undefined)

  function handleGuardar(gasto: Gasto) {
    guardarGasto(gasto)
    setGastoEditar(undefined)
  }

  function handleEditar(gasto: Gasto) {
    setGastoEditar(gasto)
  }

  // Mientras carga mostramos un mensaje
  if (cargando) {
    return <p className="text-center text-gray-400 mt-8">Cargando gastos...</p>
  }

  // Si hay error lo mostramos
  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>
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