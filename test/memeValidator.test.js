import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import connectToMongoDB from "../database/connection_db.js";
import MinionModel from "../models/minionModels.js";

let server;

beforeAll(async () => {
  await connectToMongoDB();
  server = app.listen(6000);
});

afterEach(async () => {
  await MinionModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe("Validaciones en la creación de api/memes (POST /api/memes)", () => {
  it("Debe fallar si el título (nombre) está vacío", async () => {
    const response = await request(app).post("/api/memes").send({
      nombre: "",
      descripcion: "Un meme gracioso",
      url: "http://example.com/meme.png",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "El título es obligatorio",
        }),
      ])
    );
  });

  it("Debe fallar si la descripción tiene menos de 1 o más de 200 caracteres", async () => {
    const response = await request(app).post("/api/memes").send({
      nombre: "Meme divertido",
      descripcion: "",
      url: "http://example.com/meme.png",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "La descripción es obligatoria",
        }),
      ])
    );
  });

  it("Debe fallar si la URL no es válida", async () => {
    const response = await request(app).post("/api/memes").send({
      nombre: "Meme con URL inválida",
      descripcion: "Descripción válida",
      url: "meme-invalido",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Debe ser una URL válida",
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

    expect(response.status).toBe(201);
    expect(response.body.nombre).toBe("Meme correcto");
  });
});
