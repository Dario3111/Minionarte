import express from "express";
import {getAllMemes,createMeme, getMemeById, deleteMeme} from "../controllers/minionController.js";



const router = express.Router();


router.post('/memes', createMeme); //Crear un meme
router.get('/memes', getAllMemes); //Obtener todos los memes
router.get('/memes/:id', getMemeById);//Obtener un meme por ID
router.put('/memes/:id', updateMeme); //Actualizar
router.delete('/memes/:id', deleteMeme);//Eliminar

export default router;
