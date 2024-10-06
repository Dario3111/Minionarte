

## Introducción

Este documento explica cómo implementar tests en esta aplicación utilizando **Jest** y **Supertest**. Los tests son fundamentales para garantizar que nuestro código funcione correctamente y se mantenga confiable a medida que crezca nuestro proyecto. Este `README` nos guiará a través de los diferentes tipos de tests, la instalación de las herramientas necesarias, y cómo ejecutar los tests.

## Tabla de Contenidos

- [Tipos de Tests](#tipos-de-tests)
- [Instalación](#instalación)
- [Configuración de Jest](#configuración-de-jest)
- [Tests para Controladores con Supertest](#tests-para-controladores-con-supertest)
- [Explicación del Código](#explicación-del-código)
- [Ejecutar los Tests](#ejecutar-los-tests)
- [Resumen](#resumen)

## Tipos de Tests

Existen diferentes tipos de tests que podemos implementar:

- **Unitarios (Unit Tests):** Verifican una pequeña unidad de código, como una función, de manera aislada.
- **Integración (Integration Tests):** Aseguran que diferentes partes de nuestra aplicación, como las peticiones HTTP o la base de datos, interactúen correctamente.
- **End-to-End (E2E):** Simulan el comportamiento de un usuario recorriendo la aplicación completa para verificar que todo funcione como se espera.

**Jest** es una herramienta para hacer tests unitarios en **JavaScript**, mientras que **Supertest** se usa para probar peticiones HTTP, lo cual es útil en este caso, ya que nuestra aplicación tiene endpoints.

## Instalación

Primero, necesitamos instalar **Jest**, **Supertest**, y **cross-env** para manejar variables de entorno:

```bash
npm install --save-dev jest supertest cross-env

```

Luego, añadiremos un script en tu archivo package.json para ejecutar Jest:

```json
"scripts": {
  "test": "cross-env NODE_ENV=test jest"
}
```
## Configuración de Jest
Si bien no es obligatorio para una configuración básica, puedes crear un archivo de configuración para Jest llamado `jest.config.js` para ajustes más avanzados.

## Tests para Controladores con Supertest
A continuación, testearemos nuestros controladores usando **Supertest** y **Jest**. El archivo de test podríamos llamarlo `test/minionController.test.js`:

```javascript

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


```
## Explicación del Código
Mockeamos de la Base de Datos: Utilizamos `jest.mock()` para simular las respuestas de la base de datos. Esto asegura que no realizamos llamadas reales a la base de datos durante las pruebas, lo que hace las pruebas más rápidas y fiables.
`Supertest` para Peticiones HTTP: Usamos `Supertest` para enviar solicitudes HTTP a nuestros endpoints (GET, POST, PUT, DELETE) y verificar que las respuestas sean correctas.
Expectativas de `Jest`: El método `expect()` nos permite verificar que las respuestas tienen el contenido y estado esperado (por ejemplo, un código de estado `200` o `201`).
## Ejecutar los Tests
Una vez configurado todo, podemos ejecutar los tests con el siguiente comando:

```bash

npm test
```
`Jest` ejecutará los tests y nos mostrará los resultados en la consola, indicándonos si los tests han pasado o si hubo errores.

## Resumen
**Jest**: Herramienta de testing que permite hacer assertions sobre nuestro código.
**Supertest**: Permite hacer pruebas a nuestros endpoints y verificar que las respuestas sean correctas.
**Mockeo de la Base de Datos**: Simula las respuestas para evitar llamadas reales a la base de datos.
Con estas herramientas, podemos asegurarnos de que nuestro código funciona correctamente al realizar tests de los endpoints y otros componentes clave de la aplicación.
