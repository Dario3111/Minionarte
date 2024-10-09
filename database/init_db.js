import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Conectamos a MySQL sin especificar una base de datos, para poder crearla si no existe
const sequelize = new Sequelize(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Desactivamos el logging
});

const initDB = async () => {
  try {
    // Creaamos la base de datos de desarrollo si no existe
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

    // Nos conectamos a la base de datos de desarrollo
    const dbConnection = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
      }
    );

    // Definimos el modelo de la tabla "memes"
    const Meme = dbConnection.define('meme', {
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

    // Sincronizamos la tabla y la creamos si no existe
    await Meme.sync();

    console.log('Base de datos de desarrollo y tabla "memes" listas.');
  } catch (error) {
    console.error('Error al inicializar la base de datos de desarrollo:', error);
    process.exit(1);
  } finally {
    // Cerramos la conexión al final
    await sequelize.close();
  }
};

initDB();
