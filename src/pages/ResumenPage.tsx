import { useMemo } from 'react'
import type { Categoria } from '../types/gasto'
import { useGastosContext } from '../context/GastosContext'
import ResumenCard from '../components/ResumenCard'

const categorias: Categoria[] = ['comida', 'transporte', 'ocio', 'ropa', 'salud', 'otros']

export default function ResumenPage() {
  // Cogemos los gastos directamente del contexto — sin props
  const { gastos } = useGastosContext()

  const totalesPorCategoria = useMemo(() => {
    const totales: Record<Categoria, number> = {
      comida: 0,
      transporte: 0,
      ocio: 0,
      ropa: 0,
      salud: 0,
      otros: 0,
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