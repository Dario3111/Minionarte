import { ObjectId } from 'mongodb';

const MINION_COLLECTION = 'minions'; // Cambia esto si tu colección tiene otro nombre

// Obtener todos los memes
export const findAll = async (db) => {
  return await db.collection(MINION_COLLECTION).find({}).toArray();
};

// Crear un nuevo meme
export const create = async (db, data) => {
  const result = await db.collection(MINION_COLLECTION).insertOne(data);
  return result.ops[0]; // Retorna el documento creado
};

// Obtener un meme por ID
export const findById = async (db, id) => {
  return await db.collection(MINION_COLLECTION).findOne({ _id: new ObjectId(id) });
};

// Actualizar un meme
export const update = async (db, id, data) => {
  await db.collection(MINION_COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: data });
  return findById(db, id); // Retorna el documento actualizado
};

// Eliminar un meme
export const remove = async (db, id) => {
  await db.collection(MINION_COLLECTION).deleteOne({ _id: new ObjectId(id) });
};
