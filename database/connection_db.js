import { Sequelize } from "sequelize";

const connection_db = new Sequelize("book_app", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

export default connection_db;
