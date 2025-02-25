#  API REST PARA MANEJO DE INGREDIENTES
--- 


## Descripción
API REST para manejo de ingredientes, la cual permite realizar las operaciones de creación, actualización, eliminación y consulta de ingredientes.

# TABLA DE CONTENIDO
1. [Requerimientos](#requerimientos)
2. [Instalación](#instalación)
3. [Análisis](#análisis)
    - [Clases](#clases)
    - [Relaciones](#relaciones)
    - [Funcionalidades](#funcionalidades)

## Requerimientos
- NODE
- NPM
- SQLITE3
- SEQUELIZE

## Instalación
1. Clonar el repositorio
```bash
git clone
```
2. Instalar las dependencias
```bash
npm install
```

---
## ANALISIS
### CLASES

| 1- INGREDIENTE  ||
|-----------------|--|
| id | Integer |
| name | String |
| description | String |
| image | String |
| foodGroup | String |
| state     | Integer |
| createdAt | Date |
| updatedAt | Date |

| 2- RECETA  ||
|-----------------|--|
| id | Integer |
| name | String |
| image | String |
| preparation | String |
| state | Integer |
| description | String |
| createdAt | Date |

| 3- INGREDIENTE_RECETA  ||
|-----------------|--|
| id | Integer |
| ingredientId | Integer |
| recipeId | Integer |
| quantity | Integer |
| measure  | String |
| unit | String |
| createdAt | Date |
| updatedAt | Date |

| 4- USUARIO  ||
|-----------------|--|
| id | Integer |
| username | String |
| password | String |
| photo | String |
| state | Integer |
| createdAt | Date |
| updatedAt | Date |

| 5- TOKEN  ||
|-----------------|--|
| id | Integer |
| token | String |
| userId | Integer |
| createdAt | Date |
| updatedAt | Date |


### RELACIONES
- Un ingrediente puede estar en varias recetas
- Una receta puede tener varios ingredientes
- Un usuario puede tener varios tokens


### FUNCIONALIDADES
| N° | Funcionalidad |
|----|---------------|
| HU1 | Registro de usuarios |
| HU2 | Login de usuarios |
| HU3 | Logout de usuarios |
| HU4 | Creación de ingredientes |
| HU5 | Actualización de ingredientes |
| HU6 | Eliminación de ingredientes |
| HU7 | Consulta de ingredientes - Filtros |
| HU8 | Creación de recetas con ingredientes |
| HU9 | Actualización de recetas |
| HU10 | Eliminación de recetas |
| HU11 | Consulta de recetas |
| HU12 | Actualizar foto de usuario |
| HU13 | Actualizar foto de ingrediente |
| HU14 | Actualizar foto de receta |
| HU15 | Reporte PDF de ingredientes |
| HU16 | Reporte PDF de recetas |
| HU17 | Reporte PDF de usuarios |



