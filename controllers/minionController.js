import minionModels from "../models/minionModels.js";

export const getAllMemes = async(req, res) => {

    try {
        const memes = await minionModels.findAll()
        res.status(200).json(memes)
    } catch (error) {
        res.status(500)
        .json({error: "Error al obtener los memes 💀☠️", detalles: error.message});
        
    }
}
