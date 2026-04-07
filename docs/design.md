# Arquitectura de la aplicación

## Componentes principales
pages/
├── HomePage.tsx        # Lista de gastos del mes + botón añadir
├── ResumenPage.tsx     # Resumen mensual por categoría
└── NotFoundPage.tsx    # Página 404
components/
├── GastoForm.tsx       # Formulario para añadir y editar gastos (modo dual)
├── GastoItem.tsx       # Una fila de la lista con botones de editar y eliminar
├── GastoList.tsx       # Lista completa de gastos (usa GastoItem)
├── ResumenCard.tsx     # Tarjeta de una categoría con su total
└── Navbar.tsx          # Navegación entre páginas

## Componentes reutilizables

- **GastoForm** — se usa tanto para crear un gasto nuevo como para editar uno existente. Recibe un gasto opcional como prop; si lo recibe, entra en modo edición.
- **GastoItem** — se usa dentro de GastoList para renderizar cada gasto de la lista.
- **ResumenCard** — se usa dentro de ResumenPage para mostrar el total de cada categoría.

## Gestión del estado

Se usará **Context API** con un único `GastosContext` que proporciona a toda la app:
- La lista de gastos del mes actual.
- Funciones para añadir, editar y eliminar gastos.
- Sincronización automática con LocalStorage como caché en cliente.

## Backend — Endpoints REST

| Método   | Ruta                  | Qué hace                  |
|----------|-----------------------|---------------------------|
| GET      | `/api/v1/gastos`      | Devuelve todos los gastos |
| POST     | `/api/v1/gastos`      | Crea un nuevo gasto       |
| PUT      | `/api/v1/gastos/:id`  | Edita un gasto existente  |
| DELETE   | `/api/v1/gastos/:id`  | Elimina un gasto          |

## Qué datos viven dónde

- **Servidor** — los gastos registrados son la fuente de verdad principal
- **LocalStorage** — caché en cliente para evitar perder datos si el servidor no está disponible.
- **Estado React** — copia en memoria durante la sesión activa, gestionada por el contexto.

## Flujo de datos
Usuario:
1. Rellena formulario GastoForm

2. Llama a GastosContext

3. Llama a src/api/client.ts

4. Fetch Express backend

5. Procesa y devuelve datos GastosContext

6. Actualiza estado + LocalStorage GastoList + ResumenPage

7. Se re-renderizan automáticamente