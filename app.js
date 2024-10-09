import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Configura variables de entorno
dotenv.config();

// Crea la aplicación de Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
import router from "./routers/router.js";
app.use("/api/memes", router);

// Función para inicializar la base de datos
export const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Eliminar opciones obsoletas
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1); // Salir si no se puede conectar a la base de datos
  }
};

// Exporta la app y la función initializeDatabase
export default app;
