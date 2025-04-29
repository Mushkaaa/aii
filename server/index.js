const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/generate", async (req, res) => {
  const { prompt, type } = req.body;

  let systemPrompt = "";
  if (type === "world") {
    systemPrompt = "Create a detailed fantasy or sci-fi world with lore, geography, culture, and notable locations.";
  } else if (type === "character") {
    systemPrompt = "Create a vivid fictional character with personality, background, motivations, and a role in the world.";
  } else {
    systemPrompt = "Create a unique fictional artifact with history, powers, and how it impacts the world.";
  }

  try {
    const gptResponse = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const dalleResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    res.json({
      description: gptResponse.data.choices[0].message.content,
      imageUrl: dalleResponse.data.data[0].url,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});