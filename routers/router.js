import express from "express";
import {
    getAllMemes,
    // getMemeById,
    // createMeme,
    // updateMeme,
    // deleteMeme,
} from "../controllers/minionController.js";

const router = express.Router();

router.get("/memes", getAllMemes); //Obtain all memes

export default router;