const https = require("https");
const {
    WHATSAPP_API_VERSION,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_TOKEN
} = require("../config");

function EnviarMensajeWhastpapp(texto,number){

    texto = texto.toLowerCase();

    if (texto.includes("hola")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🚀 Hola!, Como estás?, Bienvenido."
            }
        });
    }else{
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🚀 Hola, visita mi web anderson-bastidas.com "
            }
        });
    }

    const options = {
        host : "graph.facebook.com",
        path : `/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
        method : "POST",
        body : data,
        headers : {
            "Content-Type" : "application/json",
            Authorization :`Bearer ${WHATSAPP_TOKEN}`
        }
    };

    const req = https.request(options,res => {
        res.on("data",d=>{
            process.stdout.write(d);
        });
    });

    req.write(data);
    req.end();
}

module.exports = {
    EnviarMensajeWhastpapp
}
