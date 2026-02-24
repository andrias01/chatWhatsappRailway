const OpenAI = require("openai");
const { OPENAI_API_KEY } = require("../config");

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

async function responderConIA(preguntaUsuario) {

    const contexto = `
Eres el asistente virtual del restaurante "La Curva Del Gordo - Guarne".

Información:
- Restaurante ubicado en Guarne, Antioquia.
- Horarios:
  Lunes: 12pm - 8pm
  Martes a Domingo: 8am - 8pm
- Instagram: https://www.instagram.com/lacurvadelgordo
- Linktree: https://linktr.ee/lacurvadelgordo
- Solo debes responder preguntas relacionadas con el restaurante.
- Si la pregunta no está relacionada responde:
  "Solo puedo responder preguntas relacionadas con La Curva Del Gordo 😊"
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: contexto },
            { role: "user", content: preguntaUsuario }
        ],
        temperature: 0.3,
        max_tokens: 200
    });

    return completion.choices[0].message.content.trim();
}

module.exports = { responderConIA };