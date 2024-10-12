import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URI
    : process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Cierra el proceso si no puede conectarse
  }
};

export default connectDB;
