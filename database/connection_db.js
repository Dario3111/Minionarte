import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const connection_db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
  }
);

export default connection_db;

////////////////////////////////////////////
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// let connection_db;

// if (process.env.NODE_ENV === 'test') {
//   // Configuración para la base de datos de pruebas
//   connection_db = new Sequelize(
//     process.env.TEST_DB_NAME,  // Base de datos de pruebas
//     process.env.TEST_DB_USER,  // Usuario para la base de datos de pruebas
//     process.env.TEST_DB_PASSWORD,  // Contraseña para la base de datos de pruebas
//     {
//       host: process.env.TEST_DB_HOST,
//       dialect: 'mysql',  // O el motor de base de datos que estés utilizando
//       logging: false,  // Desactiva el logging para que las pruebas sean más limpias
//     }
//   );
// } else {
//   // Configuración para la base de datos de desarrollo/producción
//   connection_db = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: process.env.DB_HOST,
//       dialect: 'mysql',  // O el motor de base de datos que estés utilizando
//     }
//   );
// }

// export default connection_db;
///////////////////////////////////////////////////// Configuracion ok
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const isTestEnv = process.env.NODE_ENV === 'test';

// const connection_db = new Sequelize(
//   isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
//   isTestEnv ? process.env.TEST_DB_USER : process.env.DB_USER,
//   isTestEnv ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD,
//   {
//     host: isTestEnv ? process.env.TEST_DB_HOST : process.env.DB_HOST,
//     dialect: 'mysql',  // O el motor de base de datos que estés utilizando
//     logging: isTestEnv ? false : console.log,  // Desactiva el logging en pruebas
//   }
// );

// export default connection_db;
