import request from "supertest";
import {app, server} from "../app.js";
import connection_db from "../database/connection_db.js";

describe("crud memes", () =>{
  
    let createdMemeId;
    
    // Test para obtener memes
    test("should return a response with 200 and type json", async () => {
        const response = await request(app).get("/memes");
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toContain("application/json");
        expect(response.body).toBeInstanceOf(Array);
        

    })

    // Test para CREAR un meme
    test("should create a meme and return 201", async () =>{
        const newMeme = {
            nombre: "pruebameme",
            url: "https://res.cloudinary.com/yederpt/image/upload/v1728308746/prdmj8ytvyic0ugi1vce.png",
            descripcion: "pruebameme",
        };
        
        const response = await request(app)
        .post("/memes")
        .send(newMeme);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        createdMemeId = response.body.id;
        
    })
    
    // Test para actualizar un meme
    test("should update an existing meme", async() => {
        const updatedMeme = {
            nombre: "name of the Updated meme",
            descripcion: "Updated description",
        };
        const response = await request(app)
        .put(`/memes/${createdMemeId}`)
        .send(updatedMeme);

        expect(response.statusCode).toBe(200);
        expect(response.body.nombre).toBe("Updated meme nombre")
    })

    // Test para eliminar un meme
    

    afterAll( () => {
    
        server.close();
        connection_db.close();
    }

    )
})