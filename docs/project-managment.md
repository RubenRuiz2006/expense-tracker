# Gestión del proyecto

## Metodología

Este proyecto sigue una metodología **Agile** adaptada para desarrollo individual, usando **Kanban** como marco de trabajo visual a través de Trello.

## Tablero Trello

- **URL:** https://trello.com/b/XXXX/expense-tracker
- **Columnas:** Backlog · Todo · In Progress · Review · Done

## Convención de commits

Se usa **Conventional Commits**:

| Prefijo      | Uso                                       |
|--------------|-------------------------------------------|
| `feat:`      | Nueva funcionalidad                       |
| `fix:`       | Corrección de bug                         |
| `docs:`      | Cambios en documentación                  |
| `style:`     | Formato, sin cambio de lógica             |
| `refactor:`  | Refactorización sin nueva funcionalidad   |
| `chore:`     | Mantenimiento (dependencias, config...)   |

## Flujo de trabajo

1. Tomar tarjeta de **Backlog** → mover a **Todo**
2. Empezar tarea → mover a **In Progress**
3. Terminar y revisar → mover a **Review**
4. Commit + push → mover a **Done**