
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isTestEnv = process.env.NODE_ENV === 'test';

const connection_db = new Sequelize(
  isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  isTestEnv ? process.env.TEST_DB_USER : process.env.DB_USER,
  isTestEnv ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD,
  {
    host: isTestEnv ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    dialect: 'mysql',  // O el motor de base de datos que estés utilizando
    logging: isTestEnv ? false : console.log,  // Desactiva el logging en pruebas
  }
);

export default connection_db;
