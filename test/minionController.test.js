import request from 'supertest';
import app from '../app.js';
import connection_db from '../database/connection_db.js';
import MinionModel from '../models/minionModels.js';  // Importamos el modelo para crear los memes directamente

describe('CRUD /memes', () => {

  // Test para la petición GET (listado de todos los memes)
  test('should return a response with status 200 and type JSON', async () => {
    const response = await request(app).get('/memes');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
  });

  // Test para la petición POST
  test('should create a new meme and return it with status 201', async () => {
    const newMeme = {
      nombre: 'Test Meme',
      descripcion: 'Test description',
      url: 'http://example.com/meme.png',
    };

    const response = await request(app).post('/memes').send(newMeme);
    expect(response.statusCode).toBe(201);
    expect(response.body.nombre).toBe(newMeme.nombre);
    expect(response.body.descripcion).toBe(newMeme.descripcion);
    expect(response.body.url).toBe(newMeme.url);
  });

  // Test para la petición GET con un ID
  test('should return a response with status 200 and type JSON for a specific meme', async () => {
    // Crear un meme usando el modelo directamente
    const createdMeme = await MinionModel.create({
      nombre: 'Test Meme for GET by ID',
      descripcion: 'Test description',
      url: 'http://example.com/meme.png',
    });

    // Ahora hacer GET por ID
    const response = await request(app).get(`/memes/${createdMeme.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(createdMeme.id);
    expect(response.headers['content-type']).toContain('application/json');
  });

  test('should return 404 if meme is not found', async () => {
    const response = await request(app).get('/memes/999'); // ID que no existe
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Meme no encontrado');
  });

  // Test para la petición DELETE
  test('should delete a meme and return it with status 200', async () => {
    // Crear un meme usando el modelo directamente
    const memeToDelete = await MinionModel.create({
      nombre: 'Test Meme for DELETE',
      descripcion: 'Test description',
      url: 'http://example.com/meme.png',
    });

    // Ahora eliminamos el meme
    const response = await request(app).delete(`/memes/${memeToDelete.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.mensaje).toBe('Meme eliminado correctamente🚽');
  });

  test('should return 404 if meme is not found for deleting', async () => {
    const response = await request(app).delete('/memes/999'); // ID que no existe
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Meme no encontrado 💩💩');
  });

  // Test para la petición PUT (actualización)
  test('should update a meme and return it with status 200', async () => {
    // Crear un meme usando el modelo directamente
    const memeToUpdate = await MinionModel.create({
      nombre: 'Test Meme for PUT',
      descripcion: 'Test description',
      url: 'http://example.com/meme.png',
    });

    // Datos actualizados
    const updatedMeme = {
      nombre: 'Updated Meme',
      descripcion: 'Updated description',
      url: 'http://example.com/meme-updated.png',
    };

    // Actualizamos el meme
    const response = await request(app).put(`/memes/${memeToUpdate.id}`).send(updatedMeme);
    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe(updatedMeme.nombre);
    expect(response.body.descripcion).toBe(updatedMeme.descripcion);
    expect(response.body.url).toBe(updatedMeme.url);
  });

  test('should return 404 if meme is not found for updating', async () => {
    const updatedMeme = {
      nombre: 'Updated Meme',
      descripcion: 'Updated description',
      url: 'http://example.com/meme-updated.png',
    };

    const response = await request(app).put('/memes/999').send(updatedMeme);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Meme no encontrado');
  });
});

afterAll(async () => {
  // Cierra la conexión a la base de datos al finalizar los tests
  await connection_db.close();
});
