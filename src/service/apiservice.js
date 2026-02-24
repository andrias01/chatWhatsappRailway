const axios = require("axios");
const { 
    WHATSAPP_TOKEN, 
    WHATSAPP_PHONE_NUMBER_ID, 
    WHATSAPP_API_VERSION 
} = require("../config");

/**
 * Función para enviar mensajes a WhatsApp
 * @param {Object|string} messageData - Puede ser el objeto completo de Meta o un texto simple
 * @param {string} number - Número del destinatario
 */
const EnviarMensajeWhastpapp = async (messageData, number) => {
    try {
        let texto = "";

        // Extraemos el texto dependiendo de si viene de un botón, lista o texto plano
        if (typeof messageData === "string") {
            texto = messageData;
        } else {
            texto = messageData?.interactive?.button_reply?.id || 
                    messageData?.interactive?.list_reply?.id || 
                    messageData?.text?.body || 
                    "";
        }

        texto = texto.toLowerCase().trim();
        console.log("TEXTO PROCESADO:", texto);

        let data;

        // --- LÓGICA DE RESPUESTAS (MENÚ) ---
        if (!texto || texto === "hola") {
            data = {
                messaging_product: "whatsapp",
                to: number,
                type: "interactive",
                interactive: {
                    type: "list",
                    body: { text: "🚀 Bienvenido a La Curva Del Gordo - Guarne.\nSelecciona una opción:" },
                    footer: { text: "Estamos atentos 🙌" },
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
                                    { id: "btn_ubicacion", title: "Ubicación" },
                                    { id: "btn_redes", title: "Redes Sociales" }
                                ]
                            },
                            {
                                title: "Proveedor",
                                rows: [{ id: "btn_proveedor", title: "Soy proveedor" }]
                            }
                        ]
                    }
                }
            };
        } else if (texto === "btn_comprar") {
            data = {
                messaging_product: "whatsapp",
                to: number,
                type: "text",
                text: { body: "Aquí está nuestra carta 📄\nhttps://drive.google.com/file/d/1JrnFjl9W5yyd6Dyfo5gW5oAzfLab1SVt/view" }
            };
            // https://linktr.ee/lacurvadelgordo
        } else if (texto === "btn_horarios") {
            data = {
                messaging_product: "whatsapp",
                to: number,
                type: "text",
                text: { body: "📅 Horarios:\n\nLunes: 12pm - 8pm\nMartes a Domingo: 8am - 8pm" }
            };
        } else if (texto === "btn_domicilio") {
            data = {
                messaging_product: "whatsapp",
                to: number,
                type: "text",
                text: { body: "🛵 Para domicilio envíanos:\n\nNombre\nTeléfono\nDirección\nPedido" }
            };
        } else if (texto === "btn_menu") {
            data = {
                messaging_product: "whatsapp",
                to: number,
                type: "text",
                text: { body: "Aquí nuestro menu del dia 📄\nPor definir" }
            };
            // https://linktr.ee/lacurvadelgordo
        } else if (texto === "btn_ubicacion") {
            data = {
                messaging_product: "whatsapp",
                to: number,
                type: "location",
                location: {
                    latitude: "6.216140699502393",
                    longitude: "-75.4402760970243",
                    name: "La Curva Del Gordo - Guarne",
                    address: "Guarne, Antioquia"
                }
            };
        }else if (texto === "btn_redes") {
            data = {
                messaging_product: "whatsapp",
                to: number,
                type: "text",
                text: { body: "📋 Nuestras Redes:\n\n🍽️ https://linktr.ee/lacurvadelgordo\n💯 https://www.instagram.com/lacurvadelgordo/?hl=es" }
            };
        } else {
            // Respuesta por defecto si no entiende el mensaje
            data = {
                messaging_product: "whatsapp",
                to: number,
                type: "text",
                text: { body: "Escribe *hola* para ver el menú principal." }
            };
        }

        // --- ENVÍO DE LA PETICIÓN ---
        const response = await axios({
            method: "POST",
            url: `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${WHATSAPP_TOKEN}`
            },
            data: data
        });

        console.log("MENSAJE ENVIADO CON ÉXITO:", response.data.messages[0].id);

    } catch (error) {
        console.error("ERROR ENVIO:", error.response?.data || error.message);
    }
};

module.exports = { EnviarMensajeWhastpapp };