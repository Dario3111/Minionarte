import request from 'supertest';
import app from '../app'; 
import connection_db from '../database/connection_db.js';

describe('Validaciones en la creación de memes (POST /memes)', () => {
  it('Debe fallar si el título (nombre) está vacío', async () => {
    const response = await request(app).post('/memes').send({
      nombre: '', // Error: Título vacío
      descripcion: 'Un meme gracioso',
      url: 'http://example.com/meme.png',
    });

    expect(response.status).toBe(400); // Código de error por validación fallida
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: 'El título es obligatorio', // Mensaje que debe mostrar
        }),
      ])
    );
  });

  it('Debe fallar si la descripción tiene menos de 1 o más de 200 caracteres', async () => {
    const response = await request(app).post('/memes').send({
      nombre: 'Meme divertido',
      descripcion: '', // Error: Descripción vacía
      url: 'http://example.com/meme.png',
    });

    expect(response.status).toBe(400); // Código de error por validación fallida
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: 'La descripción es obligatoria', // Mensaje esperado
        }),
      ])
    );
  });

  it('Debe fallar si la URL no es válida', async () => {
    const response = await request(app).post('/memes').send({
      nombre: 'Meme con URL inválida',
      descripcion: 'Descripción válida',
      url: 'meme-invalido', // Error: URL no válida
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: 'Debe ser una URL válida', // Mensaje esperado
        }),
      ])
    );
  });

  it('Debe pasar si los datos son correctos', async () => {
    const response = await request(app).post('/memes').send({
      nombre: 'Meme correcto',
      descripcion: 'Este es un meme válido',
      url: 'http://example.com/meme-correcto.png',
    });

    expect(response.status).toBe(201); // Código 201 creado exitosamente
    expect(response.body.nombre).toBe('Meme correcto');
  });
});
afterAll(async () => {
  await connection_db.close(); // Cierra la conexión a la base de datos después de todos los tests
});