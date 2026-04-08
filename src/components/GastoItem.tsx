import type { Gasto } from "../types/gasto"

interface Props {
  gasto: Gasto
  onEliminar: (id: string) => void
  onEditar: (gasto: Gasto) => void
}
export default function GastoItem({ gasto, onEliminar, onEditar }: Props) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
      <div>
        <span className="font-bold text-lg">{gasto.cantidad}€</span>
        <span className="ml-2 text-gray-500 capitalize">{gasto.categoria}</span>
        <p className="text-sm text-gray-400">{gasto.fecha}</p>
        {gasto.descripcion && (
          <p className="text-sm text-gray-600">{gasto.descripcion}</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEditar(gasto)}
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
        >
          Editar
        </button>
        <button
          onClick={() => onEliminar(gasto.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}