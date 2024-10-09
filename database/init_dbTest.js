import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configuramos la conexión a MySQL sin base de datos especificada para crearla si no existe
const sequelize = new Sequelize(
  process.env.TEST_DB_USER,
  process.env.TEST_DB_PASSWORD,
  {
    host: process.env.TEST_DB_HOST,
    dialect: 'mysql',
    logging: false, // Desactivamos el logging
  }
);

const init_dbTest = async () => {
  try {
    // Crear la base de datos de pruebas si no existe
    await sequelize.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.TEST_DB_NAME}`
    );

    // Conectarse a la base de datos de pruebas
    const testDbConnection = new Sequelize(
      process.env.TEST_DB_NAME,
      process.env.TEST_DB_USER,
      process.env.TEST_DB_PASSWORD,
      {
        host: process.env.TEST_DB_HOST,
        dialect: 'mysql',
        logging: false,
      }
    );

    // Definir el modelo de la tabla "memes"
    const Meme = testDbConnection.define('meme', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    // Sincronizamos y creamos la tabla si no existe
    await Meme.sync();

    console.log('Base de datos de pruebas y tabla "memes" listas.');
  } catch (error) {
    console.error('Error al inicializar la base de datos de pruebas:', error);
    process.exit(1);
  } finally {
    // Cerramos la conexión al final
    await sequelize.close();
  }
};

init_dbTest();
