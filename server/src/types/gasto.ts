export type Categoria =
  | 'comida'
  | 'transporte'
  | 'ocio'
  | 'ropa'
  | 'salud'
  | 'otros'

export interface Gasto {
  id: string
  cantidad: number
  categoria: Categoria
  fecha: string
  descripcion?: string
}