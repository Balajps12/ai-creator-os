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

async function generateScenes(
  topic
) {

  try {

    console.log(
      `🎥 Generating cinematic scenes for: ${topic}`
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
              You are an elite AI cinematic director.

              Create:
              - Higgsfield cinematic prompts
              - short-form AI video scenes
              - emotional pacing
              - camera movement
              - visual storytelling

              Style:
              - luxury startup aesthetic
              - futuristic
              - emotionally cinematic
              - highly engaging
              - premium branding

              Include:
              - shot type
              - camera motion
              - lighting
              - mood
              - environment
              - cinematic transitions
              `
          },

          {
            role: "user",

            content:
              `
              Topic:
              ${topic}

              Generate:
              - 5 cinematic scenes
              - short-form video sequence
              - Higgsfield-ready prompts
              - premium AI creator visuals
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
      "outputs/higgsfield"
    );

    await fs.writeFile(

      `outputs/higgsfield/${topic}.txt`,

      output
    );

    console.log(
      "✅ Cinematic scenes saved"
    );

    return output;

  } catch (error) {

    console.log(
      "❌ Higgsfield agent failed"
    );

    console.log(error.message);

    return `
    Cinematic generation failed temporarily.
    `;
  }
}

module.exports =
  generateScenes;