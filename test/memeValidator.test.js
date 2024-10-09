import request from "supertest";
import app from "../app";
import mongoose from "mongoose"; // Asegúrate de importar mongoose para cerrar la conexión

describe("Validaciones en la creación de memes (POST /memes)", () => {
  // Conectar a la base de datos antes de todas las pruebas
  beforeAll(async () => {
    const TEST_DB_URI = "mongodb://localhost:27017/miniondbtest"; // Base de datos de pruebas
    await mongoose.connect(TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Limpiar la base de datos después de cada prueba para evitar datos repetidos
  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  // Test 1: Título vacío
  it("Debe fallar si el título (nombre) está vacío", async () => {
    const response = await request(app).post("/memes").send({
      nombre: "", // Error: Título vacío
      descripcion: "Un meme gracioso",
      url: "http://example.com/meme.png",
    });

    expect(response.status).toBe(400); // Código de error por validación fallida
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "El título es obligatorio", // Mensaje que debe mostrar
        }),
      ])
    );
  });

  // Test 2: Descripción vacía
  it("Debe fallar si la descripción tiene menos de 1 o más de 200 caracteres", async () => {
    const response = await request(app).post("/memes").send({
      nombre: "Meme divertido",
      descripcion: "", // Error: Descripción vacía
      url: "http://example.com/meme.png",
    });

    expect(response.status).toBe(400); // Código de error por validación fallida
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "La descripción es obligatoria", // Mensaje esperado
        }),
      ])
    );
  });

  // Test 3: URL no válida
  it("Debe fallar si la URL no es válida", async () => {
    const response = await request(app).post("/memes").send({
      nombre: "Meme con URL inválida",
      descripcion: "Descripción válida",
      url: "meme-invalido", // Error: URL no válida
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Debe ser una URL válida", // Mensaje esperado
        }),
      ])
    );
  });

  // Test 4: Datos correctos
  it("Debe pasar si los datos son correctos", async () => {
    const response = await request(app).post("/memes").send({
      nombre: "Meme correcto",
      descripcion: "Este es un meme válido",
      url: "http://example.com/meme-correcto.png",
    });

    expect(response.status).toBe(201); // Código 201 creado exitosamente
    expect(response.body.nombre).toBe("Meme correcto");
  });

  // Cerrar la conexión después de todas las pruebas
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
