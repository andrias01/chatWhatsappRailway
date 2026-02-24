const enviarmensaje = require("../service/apiservice");

const verificar = (req, res) => {
    try {
        const tokenAndres = "ANDRESNODEJSAPIMETA";
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (challenge && token && token === tokenAndres) {
            res.status(200).send(challenge);
        } else {
            res.status(403).send("Error de verificación"); // 403 es más apropiado para fallos de auth
        }

    } catch (e) {
        res.status(500).send("Error interno");
    }
};

const recibir = async (req, res) => {
    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        
        // 🚨 IMPORTANTE: Si es un cambio de estado (leído, entregado), ignorar.
        if (value?.statuses) {
            return res.send("EVENT_RECEIVED");
        }

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
            } else if (tipoInteractivo === "list_reply") {
                texto = messages.interactive.list_reply.id;
            }
        } 
        // ✅ SI ES MENSAJE DE TEXTO NORMAL
        else if (tipo === "text") {
            texto = messages.text.body;
        }

        // Si logramos extraer texto, enviamos a procesar
        if (texto) {
            await enviarmensaje.EnviarMensajeWhastpapp(texto, numero);
        }

        // Siempre responder 200 rápido a Meta para que no reintenten el envío
        res.status(200).send("EVENT_RECEIVED");

    } catch (e) {
        console.error("Error en el Webhook:", e);
        // Respondemos 200 aunque falle para que Meta deje de enviar el mismo mensaje erróneo
        res.status(200).send("EVENT_RECEIVED");
    }
};

module.exports = {
    verificar,
    recibir
};