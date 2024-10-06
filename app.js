import connection_db from './database/connection_db.js';
import MinionModel from './models/minionModels.js';
import express from 'express';
import cors from 'cors';
import router from './routers/router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Caracola');
});

app.use('/', router);

// Función para conectar a la base de datos y sincronizar el modelo
export async function initializeDatabase() {
  try {
    await connection_db.authenticate();
    console.log('La conexión se ha establecido exitosamente.🚀🧙‍♂️🚀');

    // Sincronizar el modelo con la base de datos
    await MinionModel.sync(); // O usa sync({ alter: true }) si esperas cambios en el modelo
    console.log('La tabla está sincronizada con el modelo existente.(❁´◡`❁)');
  } catch (error) {
    console.error('No se pudo conectar a la base de datosㄟ(≧◇≦)ㄏ:', error);
  }
}

export default app;

/*  En lugar de ejecutar await en el nivel superior, envolvemos la lógica de conexión a la base de datos en una función asíncrona y luego exportamos el servidor Express. Esto evita el problema de top-level await que tenemos con los tests.
async function startServer() {
  try {
    await connection_db.authenticate();
    console.log('La conexión se ha establecido exitosamente.🚀🧙‍♂️🚀');

    //sincronizamos el modelo con la base de datos sin recrear la tabla
    await MinionModel.sync(); // O usamos sync({ alter: true }) si esperamos cambios en el modelo.
    console.log('La tabla está sincronizada con el modelo existente.(❁´◡`❁)');
  } catch (error) {
    console.error('No se pudo conectar a la base de datosㄟ(≧◇≦)ㄏ:', error);
  }
  app.listen(8000, () => {
    console.log('Servidor trabajando en http://localhost:8000 (❁´◡`❁)');
  });
}
startServer();

export default app;
 */