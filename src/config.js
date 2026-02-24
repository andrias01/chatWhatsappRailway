const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!WHATSAPP_TOKEN || !OPENAI_API_KEY) {
    throw new Error("Faltan variables de entorno");
}

module.exports = {
    WHATSAPP_API_VERSION,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_TOKEN,
    OPENAI_API_KEY
};