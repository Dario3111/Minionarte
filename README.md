# Proyecto minionArte

**minionArte** es una API RESTful desarrollada con **Node.js** y **Express** que permite gestionar un catálogo de memes. Implementa operaciones CRUD con validaciones y manejo de errores utilizando **Sequelize** como ORM para interactuar con una base de datos MySQL. Además, incluye un conjunto de pruebas automatizadas con **Jest** y **Supertest**.

## Características
- Crear, leer, actualizar y eliminar memes (CRUD).
- Validaciones para los datos del meme (nombre, descripción, URL).
- Pruebas unitarias e integración con Jest y Supertest.
- Manejo de diferentes entornos (desarrollo, pruebas) mediante variables de entorno.

## Requisitos Previos
- **Node.js** (v16 o superior)
- **MySQL** (v5.7 o superior)
- **Git** (para clonar el repositorio)

## Instalación

Sigue los siguientes pasos para configurar el proyecto en tu máquina local:

1. **Clonar el repositorio desde GitHub**:
   
   ```bash
   git clone https://github.com/Dario3111/Minionarte.git
   
Navegar al directorio del proyecto:

```bash
cd minionArte
```
Instalar las dependencias:

```bash
npm install
```
Configurar las variables de entorno:

Crea un archivo .env en la raíz del proyecto con la siguiente estructura (adaptando los valores a tu entorno):

```bash
DB_NAME=nombre_de_tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
TEST_DB_NAME=test_base_de_datos
TEST_DB_USER=test_usuario
TEST_DB_PASSWORD=test_contraseña
TEST_DB_HOST=localhost
```
Configurar y sincronizar la base de datos:

Asegúrate de tener MySQL instalado y crea la base de datos que especificaste en tu archivo .env.

Luego, sincroniza el modelo con la base de datos ejecutando el siguiente comando:

```bash
npm run dev
```
La conexión y sincronización se confirmará con el mensaje: La conexión se ha establecido exitosamente.🚀🧙‍♂️🚀

Ejecutar el Proyecto
Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```
El servidor estará corriendo en el puerto 3000. Puedes probar el endpoint principal en tu navegador:


Copiar código
http://localhost:3000

### Pruebas
Este proyecto incluye pruebas unitarias e integradas para verificar la funcionalidad del CRUD y las validaciones.

## Para ejecutar las pruebas:

```bash
npm test
```
