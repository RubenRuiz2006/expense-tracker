import { useState } from 'react'
import type { Gasto } from '../types/gasto'
import GastoForm from '../components/GastoForm'
import GastoList from '../components/GastoList'

// Recibimos los gastos y setGastos desde App.tsx
interface Props {
  gastos: Gasto[]
  setGastos: (gastos: Gasto[]) => void
}

export default function HomePage({ gastos, setGastos }: Props) {
  // Solo guardamos aquí el gasto que se está editando
  const [gastoEditar, setGastoEditar] = useState<Gasto | undefined>(undefined)

  function handleGuardar(gasto: Gasto) {
    if (gastoEditar) {
      // Si estamos editando, reemplazamos el gasto en la lista
      const gastosActualizados = gastos.map((g) => {
        if (g.id === gasto.id) {
          return gasto  // este es el editado, devuelvo la versión nueva
        } else {
          return g  // este no se ha tocado, lo devuelvo igual
        }
      })
      setGastos(gastosActualizados)
    } else {
      // Si es nuevo, lo añadimos al final de la lista
      const gastosNuevos = [...gastos, gasto]
      setGastos(gastosNuevos)
    }
    // Limpiamos el gasto que se estaba editando
    setGastoEditar(undefined)
  }

  function handleEliminar(id: string) {
    // Devuelve una lista nueva sin el gasto que tiene ese id
    const gastosFiltrados = gastos.filter((g) => {
      if (g.id === id) {
        return false  // este es el que queremos eliminar, lo excluimos
      } else {
        return true  // este se queda en la lista
      }
    })
    setGastos(gastosFiltrados)
  }

  function handleEditar(gasto: Gasto) {
    // Guardamos el gasto que se quiere editar
    setGastoEditar(gasto)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
      <GastoForm onGuardar={handleGuardar} gastoEditar={gastoEditar} />
      <GastoList
        gastos={gastos}
        onEliminar={handleEliminar}
        onEditar={handleEditar}
      />
    </div>
  )
}