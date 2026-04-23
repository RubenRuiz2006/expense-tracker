import type { Categoria } from '../types/gasto'

interface Props {
  categoria: Categoria
  total: number
}

const coloresCategorias: Record<string, string> = {
  comida: 'bg-blue-50 text-blue-800',
  transporte: 'bg-green-50 text-green-800',
  ocio: 'bg-purple-50 text-purple-800',
  ropa: 'bg-pink-50 text-pink-800',
  salud: 'bg-teal-50 text-teal-800',
  otros: 'bg-gray-100 text-gray-700',
}

export default function ResumenCard({ categoria, total }: Props) {
  const colorCategoria = coloresCategorias[categoria] || coloresCategorias.otros

  return (
    <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex justify-between items-center">
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${colorCategoria}`}>
        {categoria}
      </span>
      <span className="text-base font-medium text-gray-900">{total.toFixed(2)} €</span>
    </div>
  )
}