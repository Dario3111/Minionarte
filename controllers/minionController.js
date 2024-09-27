import MinionModel from "../models/minionModels.js";

export const getAllMemes = async(req, res) => {

    try {
        const memes = await MinionModel.findAll()
        res.status(200).json(memes)
    } catch (error) {
        res.status(500)
        .json({error: "Error al obtener los memes 💀☠️", detalles: error.message});
        
    }
}


//Crear un nuevo meme
export const createMeme = async(req, res) => {
    const {description, imagen, title} = req.body;
    try {
        //Validación de los campos
        if (!description || !imagen || !title){
            return res.status(400).json({error: "Todos los campos son requeridos"})
        }
        
        const newMeme = await MinionModel.create({ description, imagen, title});
        res.status(201).json(newMeme); // 201. respuesta que fue creado con éxito.

    } catch (error) {
        res.status(500)
        .json({error:"Error creando Memes KO 💀☠️", 
        detalles:error.message})
         
    }
}

//Obtener un meme por ID
export const getMemeById = async (req, res) => {
    try {
        const {id} = req.params; //ID enviado a la URL
        const meme = await MinionModel.findByPk(id); //Busca el meme por PK
        if (!meme) {
            return res.status(404).json({error: "Meme no encontrado 😒😒😒"});
        }
        res.status(200).json(meme);
    } catch (error) {
      res.status(500).json({error: "Error al obtener el meme 😒😒😒💀",
        detalles: error.message});  
    }
}


//Eliminar un meme
export const deleteMeme = async() => {
    try {
        const {id} = req.params; // 
        const meme = await MinionModel.findByPk(id);

        if(!meme){
            return res.status(404).json({error:"Meme no encontrado 😒😒😒☠️☠️"})
        }
        await meme.destroy(); //Elimina el registro de la BBDD
        res.status(200).json({mensaje: "Meme eliminado con éxito 😍😍😍✌️✌️"})


    } catch (error) {
        res.status(500).json({error:"Error al eliminar el meme KO 💀☠️", 
            detalles:error.message})
        
    }
}
