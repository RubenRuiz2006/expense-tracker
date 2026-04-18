# Cliente de API

# Dónde vive

El cliente de API está en `src/api/client.ts`. Contiene todas las funciones que hablan con el backend.

# URL base

El backend corre en `http://localhost:3000/api/v1/gastos`.

# Funciones disponibles

**`obtenerGastos()`** — hace un GET al servidor y devuelve la lista de gastos.

**`crearGasto(gasto)`** — hace un POST con el gasto nuevo y devuelve el gasto creado.

**`editarGasto(gasto)`** — hace un PUT con los datos nuevos y devuelve el gasto actualizado.

**`eliminarGasto(id)`** — hace un DELETE con el id del gasto a eliminar.

# Los tres estados de red

Cuando la app hace una petición al servidor pueden pasar tres cosas:

**Cargando** — la petición está en curso. Se muestra un mensaje de carga en pantalla.

**Éxito** — el servidor respondió correctamente. Se muestran los datos.

**Error** — algo falló. Se muestra un mensaje de error en pantalla.

# Tipos 

Las interfaces de `src/types/gasto.ts` son las mismas en el frontend y en el backend. Esto garantiza que los datos que manda el frontend son exactamente los que espera el backend.