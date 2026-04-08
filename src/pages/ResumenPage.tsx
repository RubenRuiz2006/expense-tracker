import type { Gasto, Categoria } from '../types/gasto'
import ResumenCard from '../components/ResumenCard'

interface Props {
  gastos: Gasto[]
}

const categorias: Categoria[] = ['comida', 'transporte', 'ocio', 'ropa', 'salud', 'otros']

export default function ResumenPage({ gastos }: Props) {
  function calcularTotal(categoria: Categoria) {
    const gastosDeLaCategoria = gastos.filter((g) => {
      if (g.categoria === categoria) {
        return true
      } else {
        return false
      }
    })

    let total = 0
    gastosDeLaCategoria.forEach((g) => {
      total = total + g.cantidad
    })

    return total
  }

  const totalGeneral = gastos.reduce((acumulado, g) => {
    return acumulado + g.cantidad
  }, 0)

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Resumen mensual</h2>

      <div className="flex flex-col gap-3">
        {categorias.map((categoria) => (
          <ResumenCard
            key={categoria}
            categoria={categoria}
            total={calcularTotal(categoria)}
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