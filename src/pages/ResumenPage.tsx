import { useMemo } from 'react'
import type { Categoria } from '../types/gasto'
import { useGastosContext } from '../context/GastosContext'
import ResumenCard from '../components/ResumenCard'

const categorias: Categoria[] = ['Comida', 'Transporte', 'Ocio', 'Ropa', 'Salud', 'Otros']

export default function ResumenPage() {
  // Cogemos los gastos directamente del contexto — sin props
  const { gastos } = useGastosContext()

  const totalesPorCategoria = useMemo(() => {
    const totales: Record<Categoria, number> = {
      Comida: 0,
      Transporte: 0,
      Ocio: 0,
      Ropa: 0,
      Salud: 0,
      Otros: 0,
    }

    for (let i = 0; i < gastos.length; i++) {
      const gasto = gastos[i]
      totales[gasto.categoria] = totales[gasto.categoria] + gasto.cantidad
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
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Resumen mensual</h2>

      <div className="flex flex-col gap-3">
        {categorias.map((categoria) => (
          <ResumenCard
            key={categoria}
            categoria={categoria}
            total={totalesPorCategoria[categoria]}
          />
        ))}
      </div>

      <div className="bg-blue-600 text-white p-4 rounded-lg flex justify-between items-center mt-4">
        <span className="font-bold text-lg">Total gastado</span>
        <span className="font-bold text-xl">{totalGeneral.toFixed(2)}€</span>
      </div>
    </div>
  )
}