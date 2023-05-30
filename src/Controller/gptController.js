require("dotenv").config({ path: "./env/.env" });

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const router = new express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  console.log(req.body)
  const { prompt } = req.body;//db post
  const gptRes = await openai.createCompletion({
    model: "text-davinci-003",
    // messages: [
    //   { role: "user", content: `${prompt}` },
    // ],
    prompt: `Return the answer as a JSON object with the keys ko_content, en_content, ko_title and en_title. ${prompt}.`,
    max_tokens: 2048,
    // n: 1,
    // stop: null,
    // temperature: 0,
  })
  console.log("answer from gtp  >>>>>>  ", gptRes.data);
})
router.get("/", (req, res) => {



})


module.exports = router;