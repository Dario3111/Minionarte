import MinionModel from "../models/minionModels.js";

//Crear un nuevo meme
export const createMeme = async(req, res) => {
    //const {description, imageUrl, title} = req.body;
    try {
        //Validación de los campos
        //if (!description || !imageUrl || !title){
        //    return res.status(400).json({error: "Todos los campos son requeridos"})
        //}
        const {description, url, title} = req.body;
        const newMeme = await MinionModel.create({ description, url, title});
        res.status(201).json(newMeme); // 201. respuesta que fue creado con éxito.

    } catch (error) {
        res.status(500)
        .json({error:"Error creando Memes KO 💀☠️", 
        detalles:error.message})
         
    }
}

export const getAllMemes = async(req, res) => {

    try {
        const memes = await MinionModel.findAll()
        if (!Array.isArray (memes)) {
            throw new Error(
                'Los datos devueltos desde la base de datos no son un array'
            );
            
        }
        res.status(200).json(memes)
    } catch (error) {
        res.status(500)
        .json({error: "Error al obtener los memes 💀☠️", detalles: error.message});
        
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

//Actualizar un meme
export const updateMeme = async(req, res) => {
    try {
        const {id} = req.params; //ID enviado en la URL
        const {description, url, title} = req.body;
        const meme = await MinionModel.findByPk(id);
    
        if (!meme) {
           return res.status(404).json({error: "Meme no encontrado"});
        }
        
        meme.description = description;
        meme.url = url;
        meme.title = title;
        await meme.save();  //guarda los cambios en la BBDD

        res.status(200).json(meme);
        
    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el meme😒😒😒💀",
        detalles: error.message,
      });  
        
    }
}


//Eliminar un meme
export const deleteMeme = async(req, res) => {
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
