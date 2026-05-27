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

async function generateHooks(
  topic,
  research
) {

  console.log(
    `🪝 Generating hooks for: ${topic}`
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
            You are an elite LinkedIn viral strategist.

            Create:
            - emotional hooks
            - curiosity-driven openings
            - authority hooks
            - controversial hooks
            - storytelling hooks

            Make them highly engaging.
            `
        },

        {
          role: "user",

          content:
            `
            Topic:
            ${topic}

            Research:
            ${research}

            Generate 10 viral LinkedIn hooks.
            `
        }
      ]
    });

  const output =
    completion.choices[0]
    .message.content;

  await fs.ensureDir(
    "outputs/hooks"
  );

  await fs.writeFile(

    `outputs/hooks/${topic}.txt`,

    output
  );

  console.log(
    "✅ Hooks saved"
  );

  return output;
}

module.exports =
  generateHooks;