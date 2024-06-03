const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure to use the API key from environment variables
});

const chatCompletion = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system", content: 'You are a helpful assistant.'
        },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",  // Changed model to gpt-3.5-turbo
      max_tokens: 1080,
      temperature: 0.8,
    });

    let content = response.choices[0].message.content;

    return {
      status: 1,
      response: content
    };
  } catch (error) {
    return {
      status: 0,
      response: `Error: ${error.message}`  // Return the original error message
    };
  }
};

module.exports = {
  chatCompletion
};
