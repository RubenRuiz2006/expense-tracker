import { useState } from 'react'
import type { Gasto } from '../types/gasto'
import ModalConfirmar from './ModalConfirmar'

interface Props {
  gasto: Gasto
  onEliminar: (id: string) => void
  onEditar: (gasto: Gasto) => void
}

const coloresCategorias: Record<string, string> = {
  Comida: 'bg-blue-50 text-blue-800',
  Transporte: 'bg-green-50 text-green-800',
  Ocio: 'bg-purple-50 text-purple-800',
  Ropa: 'bg-pink-50 text-pink-800',
  Salud: 'bg-teal-50 text-teal-800',
  Otros: 'bg-gray-100 text-gray-700',
}

export default function GastoItem({ gasto, onEliminar, onEditar }: Props) {
  const [mostrarModal, setMostrarModal] = useState(false)

  function handleEditar() {
    onEditar(gasto)
  }

  function handleConfirmarEliminar() {
    onEliminar(gasto.id)
    setMostrarModal(false)
  }

  const colorCategoria = coloresCategorias[gasto.categoria] || coloresCategorias.Otros

  let descripcion = null
  if (gasto.descripcion) {
    descripcion = <span className="text-xs text-gray-400"> · {gasto.descripcion}</span>
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-gray-900">{gasto.cantidad.toFixed(2)} €</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorCategoria}`}>
              {gasto.categoria}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {gasto.fecha}{descripcion}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEditar}
            className="border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 transition-all cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={() => setMostrarModal(true)}
            className="border border-red-200 text-red-500 px-3 py-1.5 rounded-lg text-xs hover:bg-red-50 transition-all cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>

      {mostrarModal && (
        <ModalConfirmar
          mensaje="¿Seguro que quieres eliminar este gasto?"
          onConfirmar={handleConfirmarEliminar}
          onCancelar={() => setMostrarModal(false)}
        />
      )}
    </>
  )
}