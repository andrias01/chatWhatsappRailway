const https = require("https");
const {
    WHATSAPP_API_VERSION,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_TOKEN
} = require("../config");

async function EnviarMensajeWhastpapp(messageData, number) {

    let texto =
        messageData?.interactive?.button_reply?.id ||
        messageData?.interactive?.list_reply?.id ||
        messageData?.text?.body ||
        "";

    texto = texto.toLowerCase().trim();

    console.log("TEXTO PROCESADO:", texto);

    let data;

    // =============================
    // MENU PRINCIPAL
    // =============================
    if (!texto || texto === "hola") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "interactive",
            interactive: {
                type: "list",
                body: {
                    text: "🚀 Bienvenido a La Curva Del Gordo - Guarne.\nSelecciona una opción:"
                },
                footer: {
                    text: "Estamos atentos 🙌"
                },
                action: {
                    button: "Ver opciones",
                    sections: [
                        {
                            title: "Cliente",
                            rows: [
                                { id: "btn_comprar", title: "Comprar carta" },
                                { id: "btn_horarios", title: "Horarios" },
                                { id: "btn_domicilio", title: "Domicilio" },
                                { id: "btn_menu", title: "Menu del dia" },
                                { id: "btn_ubicacion", title: "Ubicacion" },
                                { id: "btn_redes", title: "Redes Sociales" }
                            ]
                        },
                        {
                            title: "Proveedor",
                            rows: [
                                { id: "btn_proveedor", title: "Soy proveedor" }
                            ]
                        }
                    ]
                }
            }
        });

    } else if (texto === "btn_comprar") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: "Aquí está nuestra carta 📄\nhttps://linktr.ee/lacurvadelgordo"
            }
        });

    } else if (texto === "btn_horarios") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body:
                    "📅 Horarios:\n\n" +
                    "Lunes: 12pm - 8pm\n" +
                    "Martes a Domingo: 8am - 8pm"
            }
        });

    } else if (texto === "btn_domicilio") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body:
                    "🛵 Para domicilio envíanos:\n\n" +
                    "Nombre\nTeléfono\nDirección\nPedido"
            }
        });

    } else if (texto === "btn_menu") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: "😋 El menú del día está por definirse."
            }
        });

    } else if (texto === "btn_ubicacion") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "location",
            location: {
                latitude: "6.216140699502393",
                longitude: "-75.4402760970243",
                name: "La Curva Del Gordo - Guarne",
                address: "Guarne, Antioquia"
            }
        });

    } else if (texto === "btn_redes") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                preview_url: true,
                body:
                    "📲 Redes Sociales:\n\n" +
                    "https://linktr.ee/lacurvadelgordo\n" +
                    "https://www.instagram.com/lacurvadelgordo/"
            }
        });

    } else if (texto === "btn_proveedor") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: "Envíanos tu catálogo y disponibilidad."
            }
        });

    } else {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: "Escribe *hola* para ver el menú principal."
            }
        });
    }

    const options = {
        host: "graph.facebook.com",
        path: `/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${WHATSAPP_TOKEN}`
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => process.stdout.write(d));
    });

    req.write(data);
    req.end();
}

module.exports = {
    EnviarMensajeWhastpapp
};