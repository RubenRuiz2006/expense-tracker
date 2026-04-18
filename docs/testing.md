# Pruebas realizadas

1. Formulario
- Añadir un gasto con todos los campos rellenos — funciona correctamente
- Intentar añadir un gasto sin cantidad — muestra mensaje de error en rojo
- Intentar añadir un gasto sin fecha — muestra mensaje de error en rojo
- Intentar añadir un gasto con cantidad negativa — muestra mensaje de error en rojo


2. Lista
- El gasto aparece en la lista después de añadirlo — funciona correctamente
- El botón eliminar borra el gasto de la lista — funciona correctamente
- El botón editar rellena el formulario con los datos del gasto — funciona correctamente
- Guardar los cambios actualiza el gasto en la lista — funciona correctamente


3. Navegación
- El enlace Resumen lleva a la página de resumen — funciona correctamente
- El enlace Gastos vuelve a la página principal — funciona correctamente
- Entrar en una URL inexistente muestra el 404 — funciona correctamente


4. Resumen
- Los totales por categoría se calculan correctamente — funciona correctamente
- El total general es la suma de todos los gastos — funciona correctamente


5. Errores encontrados
- En la página de resumen, aunque el total de gastos estaba bien en su conjunto, individualmente cada categoría no aparecía esto se debía a un error que he tenido con las mayúsculas.
- Al princpio el servidor daba error todo el rato al recargar la página y esto se debía a un error en index.ts 