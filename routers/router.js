import express from "express";
import { getAllMemes, createMeme, getMemeById, deleteMeme, updateMeme } from "../controllers/minionController.js";
import { validateCreationMeme, validateUpdateMeme } from '../validators/memeValidator.js'; // Importa las validaciones
import { validationResult } from 'express-validator';

const router = express.Router();

// Obtener todos los memes
router.get("/memes", getAllMemes);

// Crear un meme con validaciones
router.post(
  "/memes",
  validateCreationMeme,  // Aplicar validaciones para crear un meme
  (req, res, next) => {
    // Manejo de los errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Si no hay errores, continúa con el controlador
  },
  createMeme
);

// Obtener un meme por ID
router.get("/memes/:id", getMemeById);

// Actualizar un meme con validaciones
router.put(
  "/memes/:id",
  validateUpdateMeme,  // Aplicar validaciones para actualizar un meme
  (req, res, next) => {
    // Manejo de los errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Si no hay errores, continúa con el controlador
  },
  updateMeme
);

// Eliminar un meme
router.delete("/memes/:id", deleteMeme);

export default router;
