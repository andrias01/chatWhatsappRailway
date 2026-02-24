
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("../config");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getCompletion() {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "que es lima?",
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    console.log(response.data.choices[0].text);
}

getCompletion();
