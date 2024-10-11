import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';
import router from './routers/router.js';

const app = express();
const uri = 'mongodb://localhost:27017'; // Cambia si necesitas una URL diferente
const dbName = 'miBaseDeDatos'; // Cambia al nombre de tu base de datos
let db; // Variable para la base de datos

app.use(cors());
app.use(express.json());

// Middleware para agregar la conexión de la base de datos a las solicitudes
app.use((req, res, next) => {
  req.db = db; // Asignamos la conexión a `req`
  next(); // Pasar al siguiente middleware
});

app.get('/', (req, res) => {
  res.send('Hola Caracola');
});

app.use('/', router);

// Función para conectar a la base de datos
export async function initializeDatabase() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  
  try {
    await client.connect();
    console.log('La conexión se ha establecido exitosamente.🚀🧙‍♂️🚀');

    db = client.db(dbName); // Inicializa la base de datos
    console.log('Conectado a la base de datos:', dbName);
  } catch (error) {
    console.error('No se pudo conectar a la base de datosㄟ(≧◇≦)ㄏ:', error);
  }
}

export default app; 
