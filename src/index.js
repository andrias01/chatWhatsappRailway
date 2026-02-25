require("dotenv").config();
// const messages = require("./service/messages");
const express = require("express");
const apiruta = require("./routers/ruta");
// const test = require("./test");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", apiruta);

app.listen(PORT, "0.0.0.0", async () => {
    //await messages.testGoogleSheets();
    //await test.EnviarMensajeWhastpapp("donde estan ubicados?", "573057477830");  //esta linea es para probar el envio de mensajes
    console.log("Hola Andres v1 el puerto es :" + PORT);
});
