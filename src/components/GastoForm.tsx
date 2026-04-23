import { useState, useEffect } from 'react'
import type { Gasto, Categoria } from '../types/gasto'

interface Props {
  onGuardar: (gasto: Gasto) => void
  gastoEditar?: Gasto
}

const categorias: Categoria[] = ['Comida', 'Transporte', 'Ocio', 'Ropa', 'Salud', 'Otros']

export default function GastoForm({ onGuardar, gastoEditar }: Props) {
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState<Categoria>('Comida')
  const [fecha, setFecha] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [errores, setErrores] = useState({ cantidad: '', fecha: '' })

  useEffect(() => {
    if (gastoEditar) {
      setCantidad(String(gastoEditar.cantidad))
      setCategoria(gastoEditar.categoria)
      setFecha(gastoEditar.fecha)
      setDescripcion(gastoEditar.descripcion ? gastoEditar.descripcion : '')
    }
  }, [gastoEditar])

  function validar() {
    const erroresNuevos = { cantidad: '', fecha: '' }
    let hayErrores = false

    if (cantidad === '') {
      erroresNuevos.cantidad = 'La cantidad es obligatoria'
      hayErrores = true
    }
    if (Number(cantidad) <= 0) {
      erroresNuevos.cantidad = 'La cantidad tiene que ser mayor que cero'
      hayErrores = true
    }
    if (fecha === '') {
      erroresNuevos.fecha = 'La fecha es obligatoria'
      hayErrores = true
    }

    setErrores(erroresNuevos)
    return !hayErrores
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validar()) return

    const gasto: Gasto = {
      id: gastoEditar ? gastoEditar.id : crypto.randomUUID(),
      cantidad: Number(cantidad),
      categoria,
      fecha,
      descripcion: descripcion ? descripcion : undefined,
    }

    onGuardar(gasto)
    setCantidad('')
    setCategoria('Comida')
    setFecha('')
    setDescripcion('')
    setErrores({ cantidad: '', fecha: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {gastoEditar ? 'Editar gasto' : 'Nuevo gasto'}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Cantidad</label>
          <input
            type="number"
            placeholder="0.00"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
                e.preventDefault()
              }
            }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
          />
          {errores.cantidad !== '' && (
            <p className="text-xs text-red-500">{errores.cantidad}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as Categoria)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400 capitalize"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
          />
          {errores.fecha !== '' && (
            <p className="text-xs text-red-500">{errores.fecha}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Descripción</label>
          <input
            type="text"
            placeholder="Opcional"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-800 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-900 transition-all"
      >
        {gastoEditar ? 'Guardar cambios' : 'Añadir gasto'}
      </button>
    </form>
  )
}