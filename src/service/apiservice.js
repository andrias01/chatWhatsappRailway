const https = require("https");
const {
    WHATSAPP_API_VERSION,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_TOKEN
} = require("../config");

// =============================
// FUNCION PRINCIPAL
// =============================
async function EnviarMensajeWhastpapp(messageData, number) {

    // Detectar texto o ID de botón/lista
    let texto =
        messageData?.interactive?.button_reply?.id ||
        messageData?.interactive?.list_reply?.id ||
        messageData?.text?.body ||
        "";

    texto = texto.toLowerCase().trim();

    let data;

    // =============================
    // MENU PRINCIPAL
    // =============================
    if (!texto || texto.includes("hola")) {

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
                    text: "Estamos atentos a tu solicitud 🙌"
                },
                action: {
                    button: "Ver opciones",
                    sections: [
                        {
                            title: "Cliente",
                            rows: [
                                {
                                    id: "btn_comprar",
                                    title: "Comprar carta",
                                    description: "Ver nuestra carta completa"
                                },
                                {
                                    id: "btn_horarios",
                                    title: "Horarios",
                                    description: "Ver horario de atención"
                                },
                                {
                                    id: "btn_domicilio",
                                    title: "Domicilio",
                                    description: "Solicitar pedido a domicilio"
                                },
                                {
                                    id: "btn_menu",
                                    title: "Menu del dia",
                                    description: "Consultar menú actual"
                                },
                                {
                                    id: "btn_ubicacion",
                                    title: "Ubicacion",
                                    description: "Ver ubicación en mapa"
                                },
                                {
                                    id: "btn_redes",
                                    title: "Redes Sociales",
                                    description: "Instagram y más información"
                                }
                            ]
                        },
                        {
                            title: "Proveedor",
                            rows: [
                                {
                                    id: "btn_proveedor",
                                    title: "Soy proveedor",
                                    description: "Ofrecer productos o pedidos"
                                }
                            ]
                        }
                    ]
                }
            }
        });

    // =============================
    // PROVEEDOR
    // =============================
    } else if (texto === "btn_proveedor") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: "Perfecto proveedor 🙌\n\nEnvíanos tu catálogo y disponibilidad para esta semana."
            }
        });

    // =============================
    // COMPRAR CARTA
    // =============================
    } else if (texto === "btn_comprar") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "document",
            document: {
                link: "https://drive.google.com/uc?export=download&id=1JrnFjl9W5yyd6Dyfo5gW5oAzfLab1SVt",
                caption: "Carta La Curva Del Gordo 📄"
            }
        });

    // =============================
    // REDES SOCIALES
    // =============================
    } else if (texto === "btn_redes") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                preview_url: true,
                body: "📲 Nuestras redes:\n\n🔗 https://linktr.ee/lacurvadelgordo\n📸 https://www.instagram.com/lacurvadelgordo/\n\n¡Síguenos! ✨"
            }
        });

    // =============================
    // UBICACION
    // =============================
    } else if (texto === "btn_ubicacion") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "location",
            location: {
                latitude: "6.216140699502393",
                longitude: "-75.4402760970243",
                name: "La Curva Del Gordo - Sede Guarne",
                address: "Guarne, Antioquia"
            }
        });

    // =============================
    // MENU DEL DIA
    // =============================
    } else if (texto === "btn_menu") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: "😋 El menú del día está por definirse.\nPronto publicaremos nuestras delicias."
            }
        });

    // =============================
    // DOMICILIO
    // =============================
    } else if (texto === "btn_domicilio") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body:
                    "🛵 Para tu domicilio envíanos:\n\n" +
                    "📝 Nombre completo\n" +
                    "📞 Teléfono\n" +
                    "📍 Dirección\n" +
                    "⏰ Hora deseada\n" +
                    "📦 Pedido\n\n" +
                    "Te confirmaremos pronto 🙌"
            }
        });

    // =============================
    // HORARIOS
    // =============================
    } else if (texto === "btn_horarios") {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body:
                    "📅 Horario de Atención:\n\n" +
                    "🕛 Lunes: 12pm - 8pm\n" +
                    "🕗 Martes a Domingo: 8am - 8pm"
            }
        });

    // =============================
    // DESPEDIDA
    // =============================
    } else if (texto.includes("adios") || texto.includes("bye")) {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: "👋 ¡Hasta luego! Te esperamos pronto."
            }
        });

    // =============================
    // DEFAULT
    // =============================
    } else {

        data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: "No entendí tu mensaje 🤔\nEscribe *hola* para ver el menú."
            }
        });
    }

    // =============================
    // ENVIO A META API
    // =============================
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