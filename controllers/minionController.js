import MinionModel from '../models/minionModels.js';

// Obtener todos los memes
export const getAllMemes = async (req, res) => {
  try {
    const memes = await MinionModel.findAll(); // Obtiene todos los registros de la tabla 'memes'
    res.status(200).json(memes); // Respuesta con todos los memes
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener los memes', detalles: error.message });
  }
};

// // Crear un nuevo meme
// export const crearMeme = async (req, res) => {
//   try {
//     const { description, imagen } = req.body; // Datos enviados desde el cliente
//     const nuevoMeme = await MinionModel.create({ description, imagen });
//     res.status(201).json(nuevoMeme); // Respuesta con el meme creado
//   } catch (error) {
//     res.status(500).json({ error: "Error al crear el meme", detalles: error.message });
//   }
// };

// // Obtener un meme por ID
// export const obtenerMemePorId = async (req, res) => {
//   try {
//     const { id } = req.params; // ID enviado en la URL
//     const meme = await MinionModel.findByPk(id); // Busca el meme por su clave primaria (ID)
//     if (!meme) {
//       return res.status(404).json({ error: "Meme no encontrado" });
//     }
//     res.status(200).json(meme); // Respuesta con el meme encontrado
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener el meme", detalles: error.message });
//   }
// };

// // Actualizar un meme
// export const actualizarMeme = async (req, res) => {
//   try {
//     const { id } = req.params; // ID enviado en la URL
//     const { description, imagen } = req.body; // Nuevos datos enviados desde el cliente
//     const meme = await MinionModel.findByPk(id);

//     if (!meme) {
//       return res.status(404).json({ error: "Meme no encontrado" });
//     }

//     meme.description = description;
//     meme.imagen = imagen;
//     await meme.save(); // Guarda los cambios en la base de datos

//     res.status(200).json(meme); // Respuesta con el meme actualizado
//   } catch (error) {
//     res.status(500).json({ error: "Error al actualizar el meme", detalles: error.message });
//   }
// };

// // Eliminar un meme
// export const eliminarMeme = async (req, res) => {
//   try {
//     const { id } = req.params; // ID enviado en la URL
//     const meme = await MinionModel.findByPk(id);

//     if (!meme) {
//       return res.status(404).json({ error: "Meme no encontrado" });
//     }

//     await meme.destroy(); // Elimina el registro de la base de datos

//     res.status(200).json({ mensaje: "Meme eliminado correctamente" });
//   } catch (error) {
//     res.status(500).json({ error: "Error al eliminar el meme", detalles: error.message });
//   }
// };
