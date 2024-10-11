import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/router.js';

dotenv.config(); // Cargar las variables de entorno

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Caracola');
});

app.use('/', router);

// Variables para la conexión
const uri = process.env.MONGO_URI; // Cambia la URL de conexión a MongoDB
const dbName = process.env.DB_NAME; // Cambia al nombre de tu base de datos
let db; // Variable para la base de datos

// Función para conectar a la base de datos
export async function initializeDatabase() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('La conexión se ha establecido exitosamente.🚀🧙‍♂️🚀');

    db = client.db(dbName); // Inicializa la base de datos
    console.log('Conectado a la base de datos:', dbName);

    // Aquí podrías realizar operaciones como crear índices o verificar colecciones.
    return db; // Retorna la conexión a la base de datos
  } catch (error) {
    console.error('No se pudo conectar a la base de datosㄟ(≧◇≦)ㄏ:', error);
  }
}

// Middleware para agregar la conexión de la base de datos a las solicitudes
app.use((req, res, next) => {
  req.db = db; // Asignamos la conexión a `req`
  next(); // Pasar al siguiente middleware
});

// Inicializa la base de datos y arranca el servidor
const startServer = async () => {
  await initializeDatabase();
  
  const PORT = process.env.PORT || 3000; // Elige el puerto, puede ser configurado en .env
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer(); // Inicia la aplicación

export default app;
