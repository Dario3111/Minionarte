import MinionModel from '../models/minionModels.js';

// CREATE 
export const createMeme = async (req, res) => {
    try {
        const { description, imageUrl, title } = req.body; // Datos enviados desde el cliente
        const newMeme = await MinionModel.create({ description, imageUrl, title });
        res.status(201).json(newMeme); // Respuesta con el meme creado
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al crear el meme", detalles: error.message });
    }
    };

// READ 
export const getAllMemes = async (req, res) => {
    try {
        const memes = await MinionModel.findAll(); // Obtiene todos los registros de la tabla 'memes'
        res.status(200).json(memes); // Respuesta con todos los memes
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al obtener los memes", detalles: error.message });
    }
};

// Obtener un meme por ID
export const getMemeById = async (req, res) => {
    try {
        const { id } = req.params; // ID enviado en la URL
        const meme = await MinionModel.findByPk(id); // Busca el meme por su clave primaria (ID)
        if (!meme) {
        return res.status(404).json({ error: "Meme no encontrado" });
        }
        res.status(200).json(meme); // Respuesta con el meme encontrado
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al obtener el meme", detalles: error.message });
    }
    };

// Actualizar un meme
export const updateMeme = async (req, res) => {
    try {
        const { id } = req.params; // ID enviado en la URL
        const { description, imageUrl, title } = req.body; // Nuevos datos enviados desde el cliente
        const meme = await MinionModel.findByPk(id);

        if (!meme) {
        return res.status(404).json({ error: "Meme no encontrado 👻" });
        }

        meme.description = description;
        meme.imageUrl = imageUrl;
        meme.title = title;
        await meme.save(); // Guarda los cambios en la base de datos

        res.status(200).json(meme); // Respuesta con el meme actualizado
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al actualizar el meme 💀", detalles: error.message });
    }
    };

// Eliminar un meme
export const deleteMeme = async (req, res) => {
    try {
        const { id } = req.params; // ID enviado en la URL
        const meme = await MinionModel.findByPk(id);

        if (!meme) {
        return res.status(404).json({ error: "Meme no encontrado 👹💩" });
        }

        await meme.destroy(); // Elimina el registro de la base de datos

        res.status(200).json({ mensaje: "Meme eliminado correctamente 🚽" });
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al eliminar el meme 🧟‍♀️", detalles: error.message });
    }
    };