import type { Gasto } from '../types/gasto'
import GastoItem from './GastoItem'

interface Props {
  gastos: Gasto[]
  onEliminar: (id: string) => void
  onEditar: (gasto: Gasto) => void
}

export default function GastoList({ gastos, onEliminar, onEditar }: Props) {
  // Si la lista está vacía mostramos un mensaje
  if (gastos.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-8">
        No hay gastos registrados todavía
      </p>
    )
  }

  // Creamos una lista vacía donde iremos metiendo los componentes
  const listaDeComponentes = []

  // Recorremos cada gasto y creamos un GastoItem por cada uno
  for (let i = 0; i < gastos.length; i++) {
    const gasto = gastos[i]

    listaDeComponentes.push(
      <GastoItem
        key={gasto.id}
        gasto={gasto}
        onEliminar={onEliminar}
        onEditar={onEditar}
      />
    )
  }

  // Pintamos todos los componentes en pantalla
  return (
    <div className="flex flex-col gap-3">
      {listaDeComponentes}
    </div>
  )
}