import request from "supertest";
import {app, server} from "../app.js";
import connection_db from "../database/connection_db.js";

describe("crud memes", () =>{
  
    let createdMemeId;
     
    test("should return a response with 200 and type json", async () => {
        const response = await request(app).get("/memes");
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toContain("application/json");

    })

    // Test para obtener memes

    // Test para crear un meme

    // Test para actualizar un meme

    // Test para eliminar un meme
    test("should delete an existing meme", async () =>{
        const response = await request(app).delete(`/memes/${createdMemeId}`)
        expect(response.statusCode).toBe(204);
    }

    )

    afterAll( () => {
    
        server.close();
        connection_db.close();
    }

    )
})
