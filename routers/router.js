import express from "express";
import {
    getAllMemes,
    getMemeById,
    createMeme,
    updateMeme,
    deleteMeme,
} from "../controllers/minionController.js";

const router = express.Router();

router.get("/memes", getAllMemes); //Obtain all memes
router.post("/memes", createMeme); //Create a new meme
router.get("/memes/:id", getMemeById); //Obtain a meme by id
router.delete("/memes/:id", deleteMeme); //Delete a meme by id
router.put("/memes/:id", updateMeme); //Update a meme by id

export default router;