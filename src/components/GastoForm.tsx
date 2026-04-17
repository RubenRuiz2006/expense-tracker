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

  // Guardamos los errores de cada campo
  const [errores, setErrores] = useState({
    cantidad: '',
    fecha: '',
  })

  useEffect(() => {
    if (gastoEditar) {
      setCantidad(String(gastoEditar.cantidad))
      setCategoria(gastoEditar.categoria)
      setFecha(gastoEditar.fecha)
      setDescripcion(gastoEditar.descripcion ? gastoEditar.descripcion : '')
    }
  }, [gastoEditar])

  function validar() {
    // Creamos un objeto con los errores encontrados
    const erroresNuevos = {
      cantidad: '',
      fecha: '',
    }

    let hayErrores = false

    // Comprobamos que la cantidad no está vacía
    if (cantidad === '') {
      erroresNuevos.cantidad = 'La cantidad es obligatoria'
      hayErrores = true
    }

    // Comprobamos que la cantidad es un número mayor que cero
    if (Number(cantidad) <= 0) {
      erroresNuevos.cantidad = 'La cantidad tiene que ser mayor que cero'
      hayErrores = true
    }

    // Comprobamos que la fecha no está vacía
    if (fecha === '') {
      erroresNuevos.fecha = 'La fecha es obligatoria'
      hayErrores = true
    }

    // Guardamos los errores para mostrarlos en pantalla
    setErrores(erroresNuevos)

    // Devolvemos true si no hay errores, false si hay alguno
    return !hayErrores
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Si hay errores no seguimos
    if (!validar()) {
      return
    }

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow">

      <h2 className="text-lg font-bold">
        {gastoEditar ? 'Editar gasto' : 'Nuevo gasto'}
      </h2>

      {/* Campo cantidad */}
      <div className="flex flex-col gap-1">
        <input
          type="number"
          placeholder="Cantidad €"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="border rounded p-2"
        />
        {/* Si hay error en cantidad lo mostramos en rojo */}
        {errores.cantidad !== '' && (
          <p className="text-red-500 text-sm">{errores.cantidad}</p>
        )}
      </div>

      {/* Campo categoría */}
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value as Categoria)}
        className="border rounded p-2"
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Campo fecha */}
      <div className="flex flex-col gap-1">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border rounded p-2"
        />
        {/* Si hay error en fecha lo mostramos en rojo */}
        {errores.fecha !== '' && (
          <p className="text-red-500 text-sm">{errores.fecha}</p>
        )}
      </div>

      {/* Campo descripción — opcional */}
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