import OpenAI from "openai";

// Create the client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // must be set in env
});

function ask(question: string) {
  return client.chat.completions.create({
    model: "gpt-5-nano", //alternative: gpt-5-mini
    messages: [{ role: "user", content: question }],
  });
}

export default ask;