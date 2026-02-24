const express = require("express");
const apiruta = require("./routers/ruta");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", apiruta);

app.listen(PORT, "0.0.0.0", () => {
    console.log("Hola Andres v1 el puerto es :" + PORT);
});