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

async function generateVisuals(
  topic,
  research,
  post
) {

  try {

    console.log(
      `🎬 Generating visuals for: ${topic}`
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
              You are an elite cinematic AI visual director.

              Create:
              - Higgsfield prompts
              - cinematic scenes
              - premium branding visuals
              - luxury startup aesthetics
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

              Post:
              ${post}

              Generate cinematic AI prompts.
              `
          }
        ]
      });

    if (
      !completion ||
      !completion.choices ||
      !completion.choices[0]
    ) {

      throw new Error(
        "Invalid AI response"
      );
    }

    const output =
      completion.choices[0]
      .message.content;

    await fs.ensureDir(
      "outputs/visuals"
    );

    await fs.writeFile(

      `outputs/visuals/${topic}.txt`,

      output
    );

    console.log(
      "✅ Visual prompts saved"
    );

    return output;

  } catch (error) {

    console.log(
      "❌ Visual agent failed"
    );

    console.log(error.message);

    return `
    Visual generation failed temporarily.
    `;
  }
}

module.exports =
  generateVisuals;