import request from 'supertest';
import app from '../app.js';
import connection_db from '../database/connection_db.js';
import MinionModel from '../models/minionModels.js';


//Test para la petición GET

describe('GET /memes', () => {
  test('should return a response with status 200 and type JSON', async () => {
    const response = await request(app).get('/memes');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
  });
});

//Test para la petición POST

describe('(POST /memes)', () => {
  test('should create a new meme and return it with status 201', async () => {
    const newMeme = {
      nombre: 'Test Meme',
      descripcion: 'Test description',
      url: 'http://example.com/meme.png',
    };

    const response = await request(app).post('/memes').send(newMeme); // Envía el meme en el body

    expect(response.statusCode).toBe(201); // Verifica que el estado sea 201 (creado)
    expect(response.body.nombre).toBe(newMeme.nombre); // Verifica que el nombre sea el mismo
    expect(response.body.descripcion).toBe(newMeme.descripcion); // Verifica que la descripción sea la misma
    expect(response.body.url).toBe(newMeme.url); // Verifica que la URL sea la misma
    createdMemeId = response.body.id;
  });

  //Test para la petición GET con un ID

  describe('(GET /memes/:id)', () => {
    test('should return a response with status 200 and type JSON', async () => {
      const response = await request(app).get(`/memes/${createdMemeId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(createdMemeId); // Verifica que el ID devuelto es correcto
      expect(response.headers['content-type']).toContain('application/json');
    });
    test('should return 404 if meme is not found', async () => {
      const response = await request(app).get('/memes/999'); // ID que no existe, habría que asegurarse de que el id NO existe en la BBDD

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Meme no encontrado'); // Verifica que el mensaje sea el correcto
    });
  });
  //Test para la petición DELETE

  describe('(DELETE /memes/:id)', async() => {
    const memeToDelete = await MinionModel.create({
      nombre: 'Test Meme',
      descripcion: 'Test description',
      url: 'http://example.com/meme.png',
    }); // CoodDelete
    test('should delete a meme and return it with status 200', async () => {
      const response = await request(app).delete(`/memes/${memeToDelete.id}`);

      expect(response.statusCode).toBe(200); // Verifica que el estado sea 200 (eliminado)
      expect(response.body.mensaje).toBe('Meme eliminado correctamente🚽'); // Verifica que el mensaje sea el correcto
    });
    test('should return 404 if meme is not found', async () => {
      const response = await request(app).delete('/memes/999'); // ID que no existe, habría que asegurarse de que el id NO existe en la BBDD

      expect(response.statusCode).toBe(404); // Verifica que el estado sea 404 (no encontrado)
      expect(response.body.error).toBe('Meme no encontrado 💩💩'); // Verifica que el mensaje sea el correcto
    });
  });

  //Test para la petición PUT

  describe('(PUT /memes/:id)', () => {
    test('should update a meme and return it with status 200', async () => {
      // ID del meme, habría que asegurarse de que el id existe en la BBDD
      const memeToDelete = await MinionModel.create({
        nombre: 'Test Meme',
        descripcion: 'Test description',
        url: 'http://example.com/meme.png',
      });
      const updatedMeme = {
        nombre: 'Updated meme',
        descripcion: 'Updated description',
        url: 'http://example.com/meme-updated.png',
      };
      const response = await request(app)
        .put(`/memes/${memeToDelete.id}`)
        .send(updatedMeme);

      expect(response.statusCode).toBe(200);
      expect(response.body.nombre).toBe(updatedMeme.nombre);
      expect(response.body.descripcion).toBe(updatedMeme.descripcion);
      expect(response.body.url).toBe(updatedMeme.url);
    });
    test('should return 404 if meme is not found for updating', async () => {
      const updatedMeme = {
        nombre: 'Updated meme',
        descripcion: 'Updated description',
        url: 'http://example.com/meme-updated.png',
      };

      const response = await request(app).put('/memes/999').send(updatedMeme);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Meme no encontrado'); // Verifica que el mensaje sea el correcto
    });
  });

  afterAll(() => {
    // server.close(); No tenemos que cerrar el server porque lo tenemos alojado en index.js para que no se abra en fase de test
    connection_db.close();
  });
});
