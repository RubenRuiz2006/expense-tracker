import { useMemo } from 'react'
import type { Categoria } from '../types/gasto'
import { useGastosContext } from '../context/GastosContext'
import ResumenCard from '../components/ResumenCard'

const categorias: Categoria[] = ['Comida', 'Transporte', 'Ocio', 'Ropa', 'Salud', 'Otros']

export default function ResumenPage() {
  const { gastos } = useGastosContext()

  const totalesPorCategoria = useMemo(() => {
    const totales: Record<Categoria, number> = {
      Comida: 0, Transporte: 0, Ocio: 0, Ropa: 0, Salud: 0, Otros: 0,
    }
    for (let i = 0; i < gastos.length; i++) {
      totales[gastos[i].categoria] = totales[gastos[i].categoria] + gastos[i].cantidad
    }
    return totales
  }, [gastos])

  const totalGeneral = useMemo(() => {
    let total = 0
    for (let i = 0; i < gastos.length; i++) {
      total = total + gastos[i].cantidad
    }
    return total
  }, [gastos])

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-3">
      <h2 className="text-lg font-medium text-gray-900 mb-2">Resumen mensual</h2>

      {categorias.map((categoria) => (
        <ResumenCard
          key={categoria}
          categoria={categoria}
          total={totalesPorCategoria[categoria]}
        />
      ))}

      <div className="bg-blue-800 text-white rounded-xl px-5 py-4 flex justify-between items-center mt-2">
        <span className="text-sm font-medium">Total gastado</span>
        <span className="text-lg font-medium">{totalGeneral.toFixed(2)} €</span>
      </div>
    </div>
  )
}