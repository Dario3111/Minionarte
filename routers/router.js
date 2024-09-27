import express from "express";
import {getAllMemes,createMeme, getMemeById} from "../controllers/minionController.js";



const router = express.Router();

router.get('/memes', getAllMemes);
router.post('/memes', createMeme); //Crear un meme
//router.put('/memes/:id', updateMeme);
//router.delete('/memes', deleteMeme);

export default router;
