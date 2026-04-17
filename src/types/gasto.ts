export type Categoria = "Comida"| "Ocio"| "Ropa"| "Transporte"| "Salud"| "Otros"

export interface Gasto {
    id: string
    cantidad: number
    categoria: Categoria
    fecha: string
    descripcion?: string
}