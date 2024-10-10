const request = require 'supertest';
const { app, server } = require'../app.js';

describe("meme test", () => {
    test("should return a response with 200 and type json", async () => {
        const response = await request(app).get("/memes");
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toContain("application/json");
    });

    afterAll(async () => {
        server.close();
    });
});

