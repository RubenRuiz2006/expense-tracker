import { useMemo } from 'react'
import type { Categoria } from '../types/gasto'
import { useGastosContext } from '../context/GastosContext'

const categorias: Categoria[] = ['Comida', 'Transporte', 'Ocio', 'Ropa', 'Salud', 'Otros']

const coloresCategorias: Record<string, { badge: string; barra: string }> = {
  Comida: { badge: 'bg-blue-50 text-blue-800', barra: '#1e40af' },
  Transporte: { badge: 'bg-green-50 text-green-800', barra: '#166534' },
  Ocio: { badge: 'bg-purple-50 text-purple-800', barra: '#6b21a8' },
  Ropa: { badge: 'bg-pink-50 text-pink-800', barra: '#831843' },
  Salud: { badge: 'bg-teal-50 text-teal-800', barra: '#134e4a' },
  Otros: { badge: 'bg-gray-100 text-gray-700', barra: '#374151' },
}

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

  function calcularPorcentaje(total: number) {
    if (totalGeneral === 0) return 0
    return Math.round((total / totalGeneral) * 100)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-3">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Resumen mensual</p>

      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">Total gastado</span>
        <span className="text-xl font-medium text-gray-900">{totalGeneral.toFixed(2)} €</span>
      </div>

      <div className="flex flex-col gap-3">
        {categorias.map((categoria) => {
          const total = totalesPorCategoria[categoria]
          const porcentaje = calcularPorcentaje(total)
          const colores = coloresCategorias[categoria]

          return (
            <div key={categoria} className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colores.badge}`}>
                  {categoria}
                </span>
                <span className="text-sm font-medium text-gray-900">{total.toFixed(2)} €</span>
              </div>
              <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${porcentaje}%`, background: colores.barra }}
                />
              </div>
              <span className="text-xs text-gray-400">{porcentaje}% del total</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}