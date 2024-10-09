import connection_db from './database/connection_db.js';
import MinionModel from './models/minionModels.js'; // Asegúrate de usar el nombre correcto del modelo
import express from 'express';
import cors from 'cors';
import router from "./routers/router.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Caracola');
});

app.use('/', router);

try {
  await connection_db.authenticate();
  console.log('La conexión se ha establecido exitosamente.🚀🧙‍♂️🚀');

  //sincroniza el modelo con la base de datos sin recrear la tabla
  await MinionModel.sync(); // O usa sync({ alter: true }) si esperas cambios en el modelo
  console.log('La tabla está sincronizada con el modelo existente.(❁´◡`❁)');
} catch (error) {
  console.error('No se pudo conectar a la base de datosㄟ(≧◇≦)ㄏ:', error);
}
export const server = app.listen (8000, () => {
  console.log('Servidor trabajando en http://localhost:8000 (❁´◡`❁)');
});

export default app;