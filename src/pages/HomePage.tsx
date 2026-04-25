import { useState } from 'react'
import type { Gasto, Categoria } from '../types/gasto'
import { useGastosContext } from '../context/GastosContext'
import GastoForm from '../components/GastoForm'
import GastoList from '../components/GastoList'

const categorias: Categoria[] = ['Comida', 'Transporte', 'Ocio', 'Ropa', 'Salud', 'Otros']

const coloresFiltro: Record<string, string> = {
  Comida: 'bg-blue-50 text-blue-800',
  Transporte: 'bg-green-50 text-green-800',
  Ocio: 'bg-purple-50 text-purple-800',
  Ropa: 'bg-pink-50 text-pink-800',
  Salud: 'bg-teal-50 text-teal-800',
  Otros: 'bg-gray-100 text-gray-700',
}

export default function HomePage() {
  const { gastos, guardarGasto, eliminarGasto, cargando, error } = useGastosContext()
  const [gastoEditar, setGastoEditar] = useState<Gasto | undefined>(undefined)
  const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos')

  function handleGuardar(gasto: Gasto) {
    guardarGasto(gasto)
    setGastoEditar(undefined)
    setFiltro('todos')
  }

  function handleEditar(gasto: Gasto) {
    setGastoEditar(gasto)
  }

  const gastosFiltrados = filtro === 'todos'
    ? gastos
    : gastos.filter((g) => g.categoria === filtro)

  if (cargando) {
    return <p className="text-center text-gray-400 mt-8">Cargando gastos...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-4">
      <GastoForm onGuardar={handleGuardar} gastoEditar={gastoEditar} />

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => setFiltro('todos')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            filtro === 'todos'
              ? 'bg-blue-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos
          <span className={`text-xs rounded-full px-1.5 py-0.5 font-medium ${
            filtro === 'todos' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {gastos.length}
          </span>
        </button>

        {categorias.map((cat) => {
          const cantidad = gastos.filter((g) => g.categoria === cat).length
          return (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                filtro === cat
                  ? 'bg-blue-800 text-white'
                  : `${coloresFiltro[cat]} hover:opacity-80`
              }`}
            >
              {cat}
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-medium ${
                filtro === cat ? 'bg-white/20 text-white' : 'bg-black/10'
              }`}>
                {cantidad}
              </span>
            </button>
          )
        })}
      </div>

      <GastoList
        gastos={gastosFiltrados}
        onEliminar={eliminarGasto}
        onEditar={handleEditar}
      />
    </div>
  )
}