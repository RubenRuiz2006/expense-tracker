import { useState, useEffect } from 'react'
import type { Gasto, Categoria } from '../types/gasto'

interface Props {
  onGuardar: (gasto: Gasto) => void
  gastoEditar?: Gasto
}

const categorias: Categoria[] = ['comida', 'transporte', 'ocio', 'ropa', 'salud', 'otros']

export default function GastoForm({ onGuardar, gastoEditar }: Props) {
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState<Categoria>('comida')
  const [fecha, setFecha] = useState('')
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    if (gastoEditar) {
      setCantidad(String(gastoEditar.cantidad))
      setCategoria(gastoEditar.categoria)
      setFecha(gastoEditar.fecha)
      setDescripcion(gastoEditar.descripcion ?? '')
    }
  }, [gastoEditar])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const gasto: Gasto = {
      id: gastoEditar ? gastoEditar.id : crypto.randomUUID(),
      cantidad: Number(cantidad),
      categoria,
      fecha,
      descripcion: descripcion || undefined,
    }

    onGuardar(gasto)
    setCantidad('')
    setCategoria('comida')
    setFecha('')
    setDescripcion('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold">
        {gastoEditar ? 'Editar gasto' : 'Nuevo gasto'}
      </h2>

      <input
        type="number"
        placeholder="Cantidad €"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        className="border rounded p-2"
        required
      />

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value as Categoria)}
        className="border rounded p-2"
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="border rounded p-2"
        required
      />

      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border rounded p-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {gastoEditar ? 'Guardar cambios' : 'Añadir gasto'}
      </button>
    </form>
  )
}