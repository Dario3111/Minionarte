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
