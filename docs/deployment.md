# Despliegue

# Frontend

Desplegado en Vercel automáticamente desde el repositorio de GitHub.

- **URL:** https://expense-tracker-sigma-seven-70.vercel.app
- **Plataforma:** Vercel
- **Root Directory:** `/`

Cada vez que se hace `git push` a la rama `main`, Vercel redesplega el frontend automáticamente.

# Backend

Desplegado en Vercel como un proyecto separado desde la carpeta `server/` del mismo repositorio.

- **URL:** https://expense-tracker-xxhn.vercel.app
- **Plataforma:** Vercel
- **Root Directory:** `server`

Cada vez que se hace `git push` a la rama `main`, Vercel redesplega el backend automáticamente.

# Variables de entorno

La URL del backend está configurada directamente en `src/api/client.ts`. En un proyecto real se usaría una variable de entorno para no tener que cambiar el código al cambiar de entorno.

# Problemas encontrados

- El backend no aceptaba peticiones del frontend por CORS — configurando el origen permitido en `server/src/index.ts`
- La URL base del cliente de API no tenía la ruta completa — añadiendo `/api/v1/gastos`
- El input de cantidad permitía introducir la letra `e` — bloqueando caracteres inválidos