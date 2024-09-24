// Hola Mundo
import { Sequelize } from "sequelize";

const connection_db = new Sequelize("book_app", "root", "Pikachu2609>v", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

export default connection_db;
