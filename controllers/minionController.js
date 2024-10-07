import MinionModel from '../models/minionModels.js';

// Obtener todos los memes
export const getAllMemes = async (req, res) => {
  try {
    const memes = await MinionModel.findAll(); // Obtiene todos los registros de la tabla 'memes'
    if (!Array.isArray(memes)) {
      throw new Error(
        'Los datos devueltos desde la base de datos no son un array'
      );
    }
    res.status(200).json(memes); // Respuesta con todos los memes
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener los memes', detalles: error.message });
  }
};

// Crear un nuevo meme
export const createMeme = async (req, res) => {
  try {
    const { descripcion, url, nombre } = req.body; // Datos enviados desde el cliente
    const newMeme = await MinionModel.create({ descripcion, url, nombre });
    res.status(201).json(newMeme); // Respuesta con el meme creado
  } catch (error) {
    res
      .status(500)
      .json({
        error: 'Error al crear el meme ☠️☠️☠️',
        detalles: error.message,
      });
  }
};

// Obtener un meme por ID
export const getMemeById = async (req, res) => {
  try {
    const { id } = req.params; // ID enviado en la URL
    const meme = await MinionModel.findByPk(id); // Busca el meme por su clave primaria (ID)
    if (!meme) {
      return res.status(404).json({ error: 'Meme no encontrado' });
    }
    res.status(200).json(meme); // Respuesta con el meme encontrado
  } catch (error) {
    res
      .status(500)
      .json({
        error: 'Error al obtener el meme ☠️☠️☠️',
        detalles: error.message,
      });
  }
};

// Actualizar un meme
export const updateMeme = async (req, res) => {
  try {
    const { id } = req.params; // ID enviado en la URL
    const { descripcion, url, nombre } = req.body; // Nuevos datos enviados desde el cliente
    const meme = await MinionModel.findByPk(id);

    if (!meme) {
      return res.status(404).json({ error: 'Meme no encontrado' });
    }

    meme.descripcion = descripcion;
    meme.url = url;
    meme.nombre = nombre;
    await meme.save(); // Guarda los cambios en la base de datos

    res.status(200).json(meme); // Respuesta con el meme actualizado
  } catch (error) {
    res
      .status(500)
      .json({
        error: 'Error al actualizar el meme ☠️☠️☠️',
        detalles: error.message,
      });
  }
};

// Eliminar un meme
export const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params; // ID enviado en la URL
    const meme = await MinionModel.findByPk(id);

    if (!meme) {
      return res.status(404).json({ error: 'Meme no encontrado 💩💩' });
    }

    await meme.destroy(); // Elimina el registro de la base de datos

    res.status(200).json({ mensaje: 'Meme eliminado correctamente🚽' });
  } catch (error) {
    res
      .status(500)
      .json({
        error: 'Error al eliminar el meme ☠️☠️☠️',
        detalles: error.message,
      });
  }
};
