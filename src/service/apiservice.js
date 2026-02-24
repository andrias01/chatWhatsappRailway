const https = require("https");
const { Configuration, OpenAIApi } = require("openai");
const {
    WHATSAPP_API_VERSION,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_TOKEN,
    OPENAI_API_KEY
} = require("../config");

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function EnviarMensajeWhastpapp(texto,number){

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
    }else if (texto=="1"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
        });
    }else if(texto=="2"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "location",
            "location": {
            "latitude": "-12.067158831865067",
            "longitude": "-77.03377940839486",
            "name": "Estadio Nacional del Perú",
            "address": "Cercado de Lima"
            }
        });
    }else if(texto=="3"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "document",
            "document": {
                "link": "http://jornadasciberseguridad.riasc.unileon.es/archivos/ejemplo_esp.pdf",
                "caption": "Temario del Curso #001"
            }
        });
    }else if(texto=="4"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "audio",
            "audio": {
                "link": "https://filesamples.com/samples/audio/mp3/sample1.mp3"
            }
        });
    }else if(texto=="5"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "text": {
                "preview_url": true,
                "body": "Introduccion al curso! https://youtu.be/6ULOE2tGlBM"
            }
        });
    }else if(texto=="6"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🤝 En breve me pondré en contacto contigo. 🤓"
            }
        });
    }else if(texto=="7"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "📅 Horario de Atención: Lunes a Viernes. \n🕜 Horario: 9:00 a.m. a 5:00 p.m. 🤓"
            }
        });
    }else if(texto.includes("gracias")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Gracias a ti por contactarme. 🤩"
            }
        });
    }else if(texto.includes("btnsi")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Excelente muchas gracias por registrarse. 🤩"
            }
        });
    }else if(texto.includes("btnno")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Entiendo, muchas gracias. "
            }
        });
    }else if(texto.includes("btntalvez")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Espero se anime. "
            }
        });
    }else if(texto.includes("adios") || texto.includes("bye") || texto.includes("nos vemos") || texto.includes("adiós")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Hasta luego. 🌟"
            }
        });
    }else if(texto.includes("gchatgpt:")){
        let parts = texto.split("gchatgpt: ");
        console.log(parts[1]);
        console.log(parts[2]);

        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: parts[1],
            temperature: 0.5,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        console.log(response.data);

        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": response.data.choices[0].text
            }
        });

    }else if(texto.includes("boton")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "¿Confirmas tu registro?"
                },
                "footer": {
                    "text": "Selecciona una de las opciones"
                },
                "action" :{
                    "buttons": [
                        {
                            "type": "reply",
                            "reply":{
                                "id":"btnsi",
                                "title":"Si"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"btnno",
                                "title":"No"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"btntalvez",
                                "title":"Tal vez"
                            }
                        }
                    ]
                }
            }
        });
    }else if(texto.includes("lista")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type":"list",
                "body":{
                    "text":"Selecciona alguna opcion"
                },
                "footer":{
                    "text":"Selecciona una de las opciones para poder ayudarte"
                },
                "action":{
                    "button":"Ver opciones",
                    "sections":[
                        {
                            "title":"Compra y Venta",
                            "rows":[
                                {
                                    "id":"btncomprar",
                                    "title":"Comprar",
                                    "description":"Compra los mejores articulos de tecnologia"
                                },
                                {
                                    "id":"btnvender",
                                    "title":"Vender",
                                    "description":"Vende lo que ya no estes usando"
                                }
                            ]
                        },
                        {
                            "title":"Distribución y Recojo",
                            "rows":[
                                {
                                    "id":"btndireccion",
                                    "title":"Local",
                                    "description":"Puedes visitar nuestro local."
                                },
                                {
                                    "id":"btndistribucion",
                                    "title":"Distribución",
                                    "description":"La distribución se realiza todos los dias."
                                }
                            ]
                        }
                    ]
                }
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
                "body": "🚀 Hola, visita mi web anderson-bastidas.com para más información. Escribe *boton* o *lista* para nuevas opciones.\n \n📌Por favor, ingresa un número #️⃣ para recibir información.\n \n1️⃣. Información del Curso. ❔\n2️⃣. Ubicación del local. 📍\n3️⃣. Enviar temario en pdf. 📄\n4️⃣. Audio explicando curso. 🎧\n5️⃣. Video de Introducción. ⏯️\n6️⃣. Hablar con AnderCode. 🙋‍♂️\n7️⃣. Horario de Atención. 🕜"
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
