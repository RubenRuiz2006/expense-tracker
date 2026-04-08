import { useState, useEffect } from 'react'
import type { Gasto, Categoria } from '../types/gasto'

interface Props {
  onGuardar: (gasto: Gasto) => void
  gastoEditar?: Gasto  // opcional — si llega, entramos en modo edición
}

// Lista de categorías disponibles para el select
const categorias: Categoria[] = ['comida', 'transporte', 'ocio', 'ropa', 'salud', 'otros']

export default function GastoForm({ onGuardar, gastoEditar }: Props) {
  // Estado de cada campo del formulario
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState<Categoria>('comida')
  const [fecha, setFecha] = useState('')
  const [descripcion, setDescripcion] = useState('')

  // Cuando llega un gasto a editar, rellenamos los campos con sus datos
  useEffect(() => {
    if (gastoEditar) {
      setCantidad(String(gastoEditar.cantidad))  // convertimos el número a texto para el input
      setCategoria(gastoEditar.categoria)
      setFecha(gastoEditar.fecha)
      setDescripcion(gastoEditar.descripcion ?? '')  // si no tiene descripción usamos texto vacío
    }
  }, [gastoEditar])  // se ejecuta cada vez que gastoEditar cambia

  function handleSubmit(e: React.FormEvent) {
    // Evitamos que el formulario recargue la página al enviarse
    e.preventDefault()

    // Construimos el objeto gasto con los valores actuales de los campos
    const gasto: Gasto = {
      // Si estamos editando mantenemos el id original, si es nuevo generamos uno
      id: gastoEditar ? gastoEditar.id : crypto.randomUUID(),
      cantidad: Number(cantidad),  // convertimos el texto del input a número
      categoria,
      fecha,
      // Si la descripción está vacía guardamos undefined, si no guardamos el texto
      descripcion: descripcion ? descripcion : undefined,
    }

    // Pasamos el gasto al componente padre
    onGuardar(gasto)

    // Limpiamos el formulario para dejarlo listo para el siguiente gasto
    setCantidad('')
    setCategoria('comida')
    setFecha('')
    setDescripcion('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow">
      
      {/* El título cambia según si estamos editando o creando */}
      <h2 className="text-lg font-bold">
        {gastoEditar ? 'Editar gasto' : 'Nuevo gasto'}
      </h2>

      {/* Input de cantidad */}
      <input
        type="number"
        placeholder="Cantidad €"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        className="border rounded p-2"
        required
      />

      {/* Select de categoría — genera una opción por cada categoría de la lista */}
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value as Categoria)}
        className="border rounded p-2"
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Input de fecha */}
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="border rounded p-2"
        required
      />

      {/* Input de descripción — no es obligatorio */}
      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border rounded p-2"
      />

      {/* El botón también cambia su texto según el modo */}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {gastoEditar ? 'Guardar cambios' : 'Añadir gasto'}
      </button>

    </form>
  )
}