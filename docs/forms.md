# Formularios

## GastoForm

El único formulario de la app es GastoForm. Funciona en dos modos:

**Modo crear** — cuando el usuario quiere añadir un gasto nuevo. El formulario aparece vacío.

**Modo editar** — cuando el usuario hace clic en editar un gasto existente. El formulario se rellena automáticamente con los datos de ese gasto.

## Campos

**Cantidad** — obligatorio. Tiene que ser un número mayor que cero.

**Categoría** — obligatorio. El usuario elige entre comida, transporte, ocio, ropa, salud u otros.

**Fecha** — obligatorio. El usuario selecciona la fecha con el selector del navegador.

**Descripción** — opcional. El usuario puede añadir una nota sobre el gasto.

## Validación

Antes de guardar el gasto se comprueban dos cosas:

- Si la cantidad está vacía o es cero o negativa, se muestra un mensaje de error en rojo debajo del campo.
- Si la fecha está vacía, se muestra un mensaje de error en rojo debajo del campo.

Si hay algún error el gasto no se guarda y el usuario ve los mensajes hasta que los corrija.