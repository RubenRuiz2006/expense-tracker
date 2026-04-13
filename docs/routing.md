# Rutas y navegación

## Páginas de la app

**`/`** — muestra el formulario para añadir gastos y la lista de gastos del mes.

**`/resumen`** — muestra el resumen mensual con el total gastado por categoría.

**Cualquier otra URL** — muestra una página de error 404 con un botón para volver al inicio.

## Cómo funciona la navegación

La barra de navegación tiene dos enlaces — Gastos y Resumen. Cuando el usuario hace clic en uno, la URL cambia y React Router muestra la página correspondiente sin recargar la app.

## Página 404

Si el usuario escribe a mano una URL que no existe, por ejemplo `/ejemplo`, React Router no encuentra ninguna página para esa ruta y muestra la página 404 automáticamente.