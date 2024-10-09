MinionArte
Este proyecto es una API para gestionar memes utilizando Node.js, Express, Sequelize, y una base de datos MySQL. La aplicación incluye un entorno de desarrollo y un entorno de pruebas, ambos con sus propias bases de datos.

Requisitos previos
Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (versión 14 o superior)
MySQL
npm (viene con Node.js)
También necesitas tener acceso a un servidor MySQL y las siguientes variables de entorno configuradas en un archivo .env.

Variables de entorno necesarias (.env):
bash
Copiar código
# Variables para la base de datos de desarrollo
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD='tu-contraseña'
DB_NAME='miniondb'

# Variables para la base de datos de pruebas
TEST_DB_HOST='localhost'
TEST_DB_USER='root'
TEST_DB_PASSWORD='tu-contraseña'
TEST_DB_NAME='miniondbtest'
Instalación y configuración
1. Clonar el repositorio
Clona este repositorio en tu máquina local:

bash
Copiar código
git clone https://github.com/tu-usuario/minionarte.git
cd minionarte
2. Instalar dependencias
Instala todas las dependencias necesarias para el proyecto ejecutando:

bash
Copiar código
npm install
3. Crear la base de datos de desarrollo
El proyecto está configurado para crear automáticamente la base de datos de desarrollo y las tablas necesarias cuando inicias el proyecto. No necesitas crear la base de datos manualmente.

Cuando ejecutes el siguiente comando, se creará la base de datos de desarrollo si no existe:

bash
Copiar código
npm run dev
Este comando:

Crea la base de datos miniondb si no existe.
Sincroniza las tablas necesarias.
Inicia el servidor en modo desarrollo con nodemon, lo que reiniciará el servidor automáticamente cuando se detecten cambios en los archivos.
4. Crear la base de datos de pruebas
Para los tests, la base de datos de pruebas (miniondbtest) también se creará automáticamente cuando ejecutes los tests. Si deseas ejecutar los tests, usa el siguiente comando:

bash
Copiar código
npm test
Este comando:

Crea la base de datos miniondbtest si no existe.
Sincroniza las tablas necesarias para los tests.
Ejecuta todas las pruebas usando Jest.
Scripts disponibles
En el archivo package.json tienes los siguientes scripts importantes:

npm run dev: Crea la base de datos de desarrollo (si no existe) y arranca el servidor con nodemon.
npm run start: Similar a dev, pero sin nodemon, ideal para producción.
npm test: Crea la base de datos de pruebas (si no existe) y ejecuta los tests.
npm run setup-dev-db: Si prefieres crear la base de datos de desarrollo manualmente, puedes usar este comando para crear la base de datos y las tablas sin iniciar el servidor.
npm run setup-test-db: Crea la base de datos de pruebas y sincroniza las tablas necesarias.
Notas adicionales
Asegúrate de tener acceso a un servidor MySQL y que las credenciales en tu archivo .env sean correctas para que la base de datos se cree correctamente.
Si necesitas reiniciar las bases de datos, puedes eliminarlas manualmente desde tu servidor MySQL y luego ejecutar nuevamente los scripts npm run setup-dev-db o npm run setup-test-db.

