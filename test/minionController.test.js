import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import MinionModel from "../models/minionModels.js";
import connectToMongoDB from "../database/connection_db.js";

let server;

beforeAll(async () => {
  await connectToMongoDB();
  server = app.listen(3000);
});

afterEach(async () => {
  await MinionModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe("CRUD /api/memes", () => {
  test("should return a response with status 200 and type JSON", async () => {
    const response = await request(app).get("/api/memes");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
  });

  // Test para la petición POST
  test("should create a new meme and return it with status 201", async () => {
    const newMeme = {
      nombre: "Test Meme",
      descripcion: "Test description",
      url: "http://example.com/meme.png",
    };

    const response = await request(app).post("/api/memes").send(newMeme);
    expect(response.statusCode).toBe(201);
    expect(response.body.nombre).toBe(newMeme.nombre);
    expect(response.body.descripcion).toBe(newMeme.descripcion);
    expect(response.body.url).toBe(newMeme.url);
  });

  // Test para la petición GET con un ID
  test("should return a response with status 200 and type JSON for a specific meme", async () => {
    const createdMeme = await MinionModel.create({
      nombre: "Test Meme for GET by ID",
      descripcion: "Test description",
      url: "http://example.com/meme.png",
    });

    const response = await request(app).get(`/api/memes/${createdMeme._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(createdMeme._id.toString()); // Convertimos el ObjectId a string
    expect(response.headers["content-type"]).toContain("application/json");
  });

  test("should return 404 if meme is not found", async () => {
    const response = await request(app).get(
      `/api/memes/${new mongoose.Types.ObjectId()}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Meme no encontrado");
  });

  // Test para la petición DELETE
  test("should delete a meme and return it with status 200", async () => {
    const memeToDelete = await MinionModel.create({
      nombre: "Test Meme for DELETE",
      descripcion: "Test description",
      url: "http://example.com/meme.png",
    });

    const response = await request(app).delete(
      `/api/memes/${memeToDelete._id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.mensaje).toBe("Meme eliminado correctamente");
  });

  test("should return 404 if meme is not found for deleting", async () => {
    const response = await request(app).delete(
      `/api/memes/${new mongoose.Types.ObjectId()}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Meme no encontrado");
  });

  // Test para la petición PUT (actualización)
  test("should update a meme and return it with status 200", async () => {
    const memeToUpdate = await MinionModel.create({
      nombre: "Test Meme for PUT",
      descripcion: "Test description",
      url: "http://example.com/meme.png",
    });

    const updatedMeme = {
      nombre: "Updated Meme",
      descripcion: "Updated description",
      url: "http://example.com/meme-updated.png",
    };

    const response = await request(app)
      .put(`/api/memes/${memeToUpdate._id}`)
      .send(updatedMeme);
    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe(updatedMeme.nombre);
    expect(response.body.descripcion).toBe(updatedMeme.descripcion);
    expect(response.body.url).toBe(updatedMeme.url);
  });

  test("should return 404 if meme is not found for updating", async () => {
    const updatedMeme = {
      nombre: "Updated Meme",
      descripcion: "Updated description",
      url: "http://example.com/meme-updated.png",
    };

    const response = await request(app)
      .put(`/api/memes/${new mongoose.Types.ObjectId()}`)
      .send(updatedMeme);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Meme no encontrado");
  });
});
