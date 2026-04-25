interface Props {
  mensaje: string
  onConfirmar: () => void
  onCancelar: () => void
}

export default function ModalConfirmar({ mensaje, onConfirmar, onCancelar }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-4 w-80">
        <p className="text-sm text-gray-700">{mensaje}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancelar}
            className="border border-gray-200 text-gray-500 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition-all cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}