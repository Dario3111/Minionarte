import connection_db from "./database/connection_db.js";
import MinionModels from "./models/minionModels.js";
import express from "express";
import cors from "cors";
import router from "./routers/router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ole Ole lo caracole'");
});


app.use("/", router);

try {
  await connection_db.authenticate();
  console.log("La conexión se ha establecido exitosamente.🚀🧙‍♂️🚀");

  //sincroniza el modelo con la base de datos sin recrear la tabla
  await MinionModels.sync({alter:false});  // O usa sync({ alter: true }) si esperas cambios en el modelo
  console.log("La tabla está sincronizada con el modelo existente.(❁´◡`❁)");

} catch (error) {
  console.error("No se pudo conectar a la base de datosㄟ(≧◇≦)ㄏ:", error);
}

app.listen(8000, () => {
  console.log("you've succesfully connected to http://localhost:8000  well done! ( •̀ ω •́ )✧");
});
