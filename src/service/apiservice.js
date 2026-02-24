const axios = require("axios");

const EnviarMensajeWhastpapp = async (texto, numero) => {

    texto = texto ? texto.toLowerCase().trim() : "";

    console.log("TEXTO PROCESADO:", texto);

    let data;

    // 🚀 MENÚ PRINCIPAL
    if (!texto || texto === "hola") {

        data = {
            messaging_product: "whatsapp",
            to: numero,
            type: "interactive",
            interactive: {
                type: "list",
                body: {
                    text: "🚀 Bienvenido a La Curva Del Gordo - Guarne.\nSelecciona una opción:"
                },
                action: {
                    button: "Ver opciones",
                    sections: [
                        {
                            title: "Opciones disponibles",
                            rows: [
                                {
                                    id: "domicilio",
                                    title: "Domicilio"
                                },
                                {
                                    id: "ubicacion",
                                    title: "Ubicacion"
                                },
                                {
                                    id: "proveedor",
                                    title: "Soy proveedor"
                                }
                            ]
                        }
                    ]
                }
            }
        };
    }

    // 🏍 DOMICILIO
    else if (texto === "domicilio") {

        data = {
            messaging_product: "whatsapp",
            to: numero,
            type: "text",
            text: {
                body: "🍔 Puedes pedir tu domicilio al 3001234567"
            }
        };
    }

    // 📍 UBICACIÓN
    else if (texto === "ubicacion") {

        data = {
            messaging_product: "whatsapp",
            to: numero,
            type: "text",
            text: {
                body: "📍 Estamos ubicados en Guarne, Antioquia."
            }
        };
    }

    // 🤝 PROVEEDOR
    else if (texto === "proveedor") {

        data = {
            messaging_product: "whatsapp",
            to: numero,
            type: "text",
            text: {
                body: "🤝 Envíanos tu propuesta al correo: compras@lacurvadelgordo.com"
            }
        };
    }

    // ❓ OPCIÓN NO RECONOCIDA
    else {
        return EnviarMensajeWhastpapp("hola", numero);
    }

    try {
        await axios({
            method: "POST",
            url: `https://graph.facebook.com/v18.0/${process.env.NUMERO_ID}/messages`,
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_WHATSAPP}`,
                "Content-Type": "application/json"
            },
            data: data
        });
    } catch (error) {
        console.log("ERROR ENVIO:", error.response?.data || error.message);
    }
};

module.exports = {
    EnviarMensajeWhastpapp
};