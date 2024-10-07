import MinionModel from "../models/minionModels.js"
import minionController from "../models/minionModels.js"

export const getAllMemes = async(req, res)=> {

try {

    const memes = await MinionModel.findAll()
    res
    .status(200)
    .json(memes)

} catch (error) {
    console.error("Error al obtener los memes: ", error)
    res
    .status(500)
    .json(message, error.menssage)
    
}

}