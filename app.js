import connection_db from "./database/connectionDb.js";
import bookModel from "./models/bookModel.js";

try {
  await connection_db.authenticate();
  console.log("Connection has been established successfully.");

  await bookModel.sync({ force: true });
  console.log("The table for the User model was just (re)created!");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
