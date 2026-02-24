const express = require("express");
const apiruta = require("./routers/ruta");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api",apiruta);

/* app.listen(PORT,() => {
    console.log("Hola AnderCode v1 el puerto es :" + PORT);
}) */

//TODO: Configura el servidor para escuchar en todas las interfaces (0.0.0.0)
app.listen(PORT, () => {
    console.log("Hola Andres v1 el puerto es :" + PORT);
});
