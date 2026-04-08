import type { Categoria } from '../types/gasto'

interface Props {
  categoria: Categoria
  total: number
}

export default function ResumenCard({ categoria, total }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <span className="capitalize text-gray-700 font-medium">{categoria}</span>
      <span className="font-bold text-lg text-blue-600">{total.toFixed(2)}€</span>
    </div>
  )
}