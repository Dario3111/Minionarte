import MinionModel from "../models/minionModels.js";

// Obtener todos los memes
export const getAllMemes = async (req, res) => {
  try {
    const memes = await MinionModel.find(); // Mongoose usa .find() para obtener todos los registros
    res.status(200).json(memes);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los memes",
      detalles: error.message,
    });
  }
};

// Crear un nuevo meme
export const createMeme = async (req, res) => {
  try {
    const { nombre, descripcion, url } = req.body;
    const newMeme = new MinionModel({ nombre, descripcion, url });
    await newMeme.save(); // Mongoose usa .save() para guardar en la base de datos
    res.status(201).json(newMeme);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el meme",
      detalles: error.message,
    });
  }
};

// Obtener un meme por ID
export const getMemeById = async (req, res) => {
  try {
    const { id } = req.params; // MongoDB usa _id como identificador
    const meme = await MinionModel.findById(id); // Mongoose usa .findById()
    if (!meme) {
      return res.status(404).json({ error: "Meme no encontrado" });
    }
    res.status(200).json(meme);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el meme",
      detalles: error.message,
    });
  }
};

// Actualizar un meme
export const updateMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, url } = req.body;
    const updatedMeme = await MinionModel.findByIdAndUpdate(
      id,
      { nombre, descripcion, url },
      { new: true, runValidators: true } // Opciones de Mongoose para devolver el documento actualizado y ejecutar validaciones
    );
    if (!updatedMeme) {
      return res.status(404).json({ error: "Meme no encontrado" });
    }
    res.status(200).json(updatedMeme);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el meme",
      detalles: error.message,
    });
  }
};

// Eliminar un meme
export const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMeme = await MinionModel.findByIdAndDelete(id); // Mongoose usa .findByIdAndDelete()
    if (!deletedMeme) {
      return res.status(404).json({ error: "Meme no encontrado" });
    }
    res.status(200).json({ mensaje: "Meme eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el meme",
      detalles: error.message,
    });
  }
};
