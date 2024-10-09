import { Sequelize } from 'sequelize';
//import dotenv from 'dotenv';
import {DB_DEV_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_TEST_NAME, NODE_ENV} from "../config.js";

const DB_NAME = NODE_ENV === "test" ? DB_TEST_NAME:DB_DEV_NAME 

//Para conectarme a mysql
const connection_db = new Sequelize(

    DB_NAME,
    DB_USER,
    DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
  }
);

export default connection_db
