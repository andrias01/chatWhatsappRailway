const enviarmensaje = require("../service/apiservice");

const verificar = (req, res) => {
    try {
        const tokenAndres = "ANDRESNODEJSAPIMETA";
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (challenge && token && token === tokenAndres) {
            res.status(200).send(challenge);
        } else {
            res.status(400).send("Error de verificación");
        }

    } catch (e) {
        res.status(400).send("Error");
    }
};

const recibir = async (req, res) => {
    try {

        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messages = value?.messages?.[0];

        if (!messages) {
            return res.send("EVENT_RECEIVED");
        }

        const numero = messages.from;
        const tipo = messages.type;

        let texto = "";

        // ✅ SI ES MENSAJE INTERACTIVO (BOTONES O LISTA)
        if (tipo === "interactive") {

            const tipoInteractivo = messages.interactive.type;

            if (tipoInteractivo === "button_reply") {
                texto = messages.interactive.button_reply.id;
            }

            if (tipoInteractivo === "list_reply") {
                texto = messages.interactive.list_reply.id;
            }

            await enviarmensaje.EnviarMensajeWhastpapp(texto, numero);
        }

        // ✅ SI ES MENSAJE DE TEXTO NORMAL
        else if (tipo === "text") {

            texto = messages.text.body;

            await enviarmensaje.EnviarMensajeWhastpapp(texto, numero);
        }

        res.send("EVENT_RECEIVED");

    } catch (e) {
        console.log("Error:", e);
        res.send("EVENT_RECEIVED");
    }
};

module.exports = {
    verificar,
    recibir
};