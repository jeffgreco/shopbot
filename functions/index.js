const { onCall } = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");
const { Configuration, OpenAIApi } = require("openai");

const openAiApiKey = defineString("OPENAI_API_KEY");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || openAiApiKey,
});

// console.log("Debugging", process.env.OPENAI_API_KEY, openAiApiKey);

const openai = new OpenAIApi(configuration);

exports.generatecategory = onCall(async (request) => {
  const { text, categories } = request.data;
  console.log("fetching category", text, categories);
  const prompt = categories
    ? `we are adding this item to a shopping list: ${text}. what category should we put it in? It must fit into one of these categories: ${categories.join(
        ", "
      )}.  If you really, really can't figure out what category it goes in, you can say "Uncategorized" Answer only with the category, no other text or punctuation. No trailing period. Just text!`
    : `we are adding this item to a shopping list: ${text}. what category should we put it in? some examples include Pharmacy, Produce, Cheese, Dairy, Snacks, Spices, Frozen, Meat, Seafood, Deli, et cetera. Answer only with the category, no other text or punctuation. No trailing period. Just text!`;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const category =
    completion?.data?.choices[0]?.message?.content?.trim() || false;

  return category;
});
