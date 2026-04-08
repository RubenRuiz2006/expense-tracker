export type Categoria = "comida"| "ocio"| "ropa"| "transporte"| "salud"| "otros"

export interface Gasto {
    id: string
    cantidad: number
    categoria: Categoria
    fecha: string
    descripcion?: string
}