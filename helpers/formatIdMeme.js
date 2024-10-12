// Función para transformar el documento de Mongoose para agregar un campo `id`
export const formatIdMeme = (meme) => {
    return {
      ...meme.toObject(), // Conviertimos todo lo que viene en el meme desde Mongoose en un objeto plano
      id: meme._id,       // Agregamos un campo `id` con el valor de `_id`
    };
  };
  
  // Si tenemos varios memes, podemos mapearlos con la misma lógica
  export const formatIdMemes = (memes) => {
    return memes.map((meme) => formatIdMeme(meme)); // y Aplicamos la transformación a cada meme
  };