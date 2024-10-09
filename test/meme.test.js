import request from "supertest";
import {app, server} from "../app.js";
import connection_db from "../database/connection_db.js";
import MinionModel from "../models/minionModels.js";

describe("crud memes", () =>{
  
    //let createdMemeId;
    
    // Test para obtener memes
    test("should return a response with 200 and type json", async () => { //verificar si la respuesta de una petición GET
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
        //createdMemeId = response.body.id;
        
    })
    
    // Test para actualizar PUT un meme
    test("should update an existing meme", async() => {
        //Creamos un meme después de actualizarlo
        const memeToUpdate = await request(app).post("/memes").send({
            descripcion: 'test Meme for PUT',
            url: 'https://res.cloudinary.com/yederpt/image/upload/v1728308746/prdmj8ytvyic0ugi1vce.png',
            nombre: ' test meme for PUT'
        })
       
        const updatedMeme = {
            
            descripcion: "Updated description",
            url: "https://res.cloudinary.com/yederpt/image/upload/v1728308746/prdmj8ytvyic0ugi1vce.png",
            nombre: "Updated Meme"
        };

        //Actualizamos el meme
        const response = await request(app).put(`/memes/${memeToUpdate.body.id}`).send(updatedMeme);
        expect(response.statusCode).toBe(200);
        expect(response.body.nombre).toBe(updatedMeme.nombre);
        expect(response.body.url).toBe(updatedMeme.url);
        expect(response.body.descripcion).toBe(updatedMeme.descripcion);
    })

    // Test para eliminar un meme
    test("should delete an existing meme", async () => {
        // Creamos el meme usando el modelo
        const memeToDelete = await MinionModel.create( {
            nombre: "deletememe",
            url: "https://res.cloudinary.com/yederpt/image/upload/v1728308746/prdmj8ytvyic0ugi1vce.png",
            descripcion: "meme to be deleted"
          });
        // Eliminar el meme creado recientemente
        const response = await request(app).delete(`/memes/${memeToDelete.id}`);
        expect(response.statusCode).toBe(200);
    });
    

    afterAll( () => {
         server.close();
        connection_db.close();
    })
})
