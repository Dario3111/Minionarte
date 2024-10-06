import request from 'supertest';
import app from '../app.js'; // Importa tu aplicación Express
import MinionModel from '../models/minionModels.js';
import connection_db from '../database/connection_db.js';

// Mockear la base de datos usando Jest
jest.mock('../models/minionModels.js');

describe('Testing Memes API', () => {
  // Test para obtener todos los memes
  it('Debe obtener todos los memes con GET /memes', async () => {
    const mockMemes = [
      {
        id: 1,
        nombre: 'Meme 1',
        descripcion: 'Desc 1',
        url: 'http://example.com/meme1.png',
      },
      {
        id: 2,
        nombre: 'Meme 2',
        descripcion: 'Desc 2',
        url: 'http://example.com/meme2.png',
      },
    ];

    MinionModel.findAll.mockResolvedValue(mockMemes);

    const response = await request(app).get('/memes');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMemes);
  });

  // Test para crear un nuevo meme
  it('Debe crear un nuevo meme con POST /memes', async () => {
    const newMeme = {
      nombre: 'Meme 3',
      descripcion: 'Desc 3',
      url: 'http://example.com/meme3.png',
    };

    MinionModel.create.mockResolvedValue(newMeme);

    const response = await request(app).post('/memes').send(newMeme);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newMeme);
  });

  // Test para obtener un meme por ID
  it('Debe obtener un meme por ID con GET /memes/:id', async () => {
    const mockMeme = {
      id: 1,
      nombre: 'Meme 1',
      descripcion: 'Desc 1',
      url: 'http://example.com/meme1.png',
    };

    MinionModel.findByPk.mockResolvedValue(mockMeme);

    const response = await request(app).get('/memes/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMeme);
  });

  // Test para actualizar un meme
  //   it('Debe actualizar un meme con PUT /memes/:id', async () => {
  //     const updatedMeme = { nombre: 'Meme Actualizado', descripcion: 'Desc Actualizada', url: 'http://example.com/meme-updated.png' };

  //     MinionModel.findByPk.mockResolvedValue(updatedMeme);
  //     MinionModel.save.mockResolvedValue(updatedMeme);

  //     const response = await request(app)
  //       .put('/memes/1')
  //       .send(updatedMeme);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(updatedMeme);
  //   });
  it('Debe actualizar un meme con PUT /memes/:id', async () => {
    const updatedMeme = {
      nombre: 'Meme Actualizado',
      descripcion: 'Desc Actualizada',
      url: 'http://example.com/meme-updated.png',
    };

    // Creamos una instancia simulada del meme
    const mockMemeInstance = {
      save: jest.fn().mockResolvedValue(updatedMeme), // Simular el método save en la instancia
      ...updatedMeme, // Propiedades actuales del meme
    };

    MinionModel.findByPk.mockResolvedValue(mockMemeInstance); // Simulamos findByPk para devolver la instancia mockeada

    const response = await request(app).put('/memes/1').send(updatedMeme);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedMeme);
  });

  // Test para eliminar un meme
  //   it('Debe eliminar un meme con DELETE /memes/:id', async () => {
  //     const mockMeme = { id: 1, nombre: 'Meme 1', descripcion: 'Desc 1', url: 'http://example.com/meme1.png' };

  //     MinionModel.findByPk.mockResolvedValue(mockMeme);
  //     MinionModel.destroy.mockResolvedValue(true);

  //     const response = await request(app).delete('/memes/1');
  //     expect(response.status).toBe(200);
  //     expect(response.body.mensaje).toBe('Meme eliminado correctamente🚽');
  //   });

  //
  it('Debe eliminar un meme con DELETE /memes/:id', async () => {
    const mockMeme = {
      id: 1,
      nombre: 'Meme 1',
      descripcion: 'Desc 1',
      url: 'http://example.com/meme1.png',
    };

    MinionModel.findByPk.mockResolvedValue(mockMeme);
    mockMeme.destroy = jest.fn().mockResolvedValue(true); // Simulamos destroy en la instancia del meme

    const response = await request(app).delete('/memes/1');
    expect(response.status).toBe(200);
    expect(response.body.mensaje).toBe('Meme eliminado correctamente🚽');
  });
});
afterAll(async () => {
  await connection_db.close(); // Cierra la conexión a la base de datos después de todos los tests
});
