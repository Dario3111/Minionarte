import express from "express";
import { getAllMemes } from "../controllers/minionController.js";

const router = express.Router();

// router.post("/memes", crearMeme); // Crear un meme
router.get("/memes", getAllMemes); // Obtener todos los memes
// router.get("/memes/:id", obtenerMemePorId); // Obtener un meme por ID
// router.put("/memes/:id", actualizarMeme); // Actualizar un meme
// router.delete("/memes/:id", eliminarMeme); // Eliminar un meme

export default router;
