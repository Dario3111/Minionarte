import request from "supertest";
import app from "../app";
import connectToMongoDB from "../database/connection_db.js";
import MinionModel from "../models/minionModels.js"; // Tu modelo de Mongoose

let server;

beforeAll(async () => {
  // Conectar a la base de datos de MongoDB
  await connectToMongoDB();
  // Inicializa el servidor antes de las pruebas
  server = app.listen(6000);
});

afterEach(async () => {
  // Limpiamos la colección de api/api/memes después de cada prueba
  await MinionModel.deleteMany({});
});

afterAll(async () => {
  // Cerramos la conexión a la base de datos después de las pruebas
  await mongoose.connection.close();
  // Cerramos el servidor después de las pruebas
  server.close();
});

describe("Validaciones en la creación de api/memes (POST /api/memes)", () => {
  it("Debe fallar si el título (nombre) está vacío", async () => {
    const response = await request(app).post("/api/memes").send({
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

  it("Debe fallar si la descripción tiene menos de 1 o más de 200 caracteres", async () => {
    const response = await request(app).post("/api/memes").send({
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

  it("Debe fallar si la URL no es válida", async () => {
    const response = await request(app).post("/api/memes").send({
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

  it("Debe pasar si los datos son correctos", async () => {
    const response = await request(app).post("/api/memes").send({
      nombre: "Meme correcto",
      descripcion: "Este es un meme válido",
      url: "http://example.com/meme-correcto.png",
    });

    expect(response.status).toBe(201); // Código 201 creado exitosamente
    expect(response.body.nombre).toBe("Meme correcto");
  });
});
