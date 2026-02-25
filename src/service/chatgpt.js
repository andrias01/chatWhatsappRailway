const OpenAI = require("openai").default;
const { OPENAI_API_KEY } = require("../config");
const { getContexto } = require("./messages");

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function responderConIA(preguntaUsuario) {
  const contexto = getContexto();

  // console.log("CONTEXTO2:", contexto);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",   // 👈 aquí cambias el modelo
    messages: [
      { role: "system", content: contexto },
      { role: "user", content: preguntaUsuario }
    ],
    temperature: 0.3,
    max_tokens: 120  // 👈 bajé un poco para ahorrar tokens
  });

  return completion.choices[0].message.content.trim();
}

module.exports = { responderConIA };