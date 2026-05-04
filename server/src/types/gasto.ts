export type Categoria =
  | 'Comida'
  | 'Transporte'
  | 'Ocio'
  | 'Ropa'
  | 'Salud'
  | 'Otros'

export interface Gasto {
  id: string
  cantidad: number
  categoria: Categoria
  fecha: string
  descripcion?: string
}