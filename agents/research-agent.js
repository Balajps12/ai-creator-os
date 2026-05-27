require("dotenv").config();

const OpenAI =
  require("openai");

const fs =
  require("fs-extra");

const client =
  new OpenAI({

    baseURL:
      "https://openrouter.ai/api/v1",

    apiKey:
      process.env.OPENROUTER_API_KEY
  });

async function runResearch(
  topic
) {

  console.log(
    `🔍 Researching: ${topic}`
  );

  const completion =
    await client.chat.completions.create({

      model:
        "openai/gpt-3.5-turbo",

      messages: [

        {
          role: "system",

          content:
            `
            You are an elite AI trend researcher.

            Analyze:
            - viral trends
            - audience psychology
            - LinkedIn growth angles
            - emotional triggers
            - content opportunities
            `
        },

        {
          role: "user",

          content:
            `
            Research this topic:

            ${topic}
            `
        }
      ]
    });

  const output =
    completion.choices[0]
    .message.content;

  await fs.ensureDir(
    "outputs/research"
  );

  await fs.writeFile(

    `outputs/research/${topic}.txt`,

    output
  );

  console.log(
    "✅ Research saved"
  );

  return output;
}

module.exports =
  runResearch;