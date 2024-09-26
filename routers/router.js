import express from "express";
import {getAllMemes} from "../controllers/minionController.js";


const router = express.Router();

router.get('/memes', getAllMemes);

export default router;
