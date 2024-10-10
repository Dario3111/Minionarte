import app, { initializeDatabase } from './app.js';

// Función para iniciar el servidor en el puerto 8000
async function startServer() {
  await initializeDatabase();
  app.listen(8000, () => {
    console.log('Servidor trabajando en http://localhost:8000 (❁´◡`❁)');
  });
}

// Inicia el servidor
startServer();
