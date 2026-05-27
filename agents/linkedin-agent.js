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

async function generatePost(
  topic,
  research,
  hooks
) {

  try {

    console.log(
      `✍️ Writing LinkedIn post for: ${topic}`
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
              You are an elite LinkedIn ghostwriter.

              Create:
              - premium personal branding posts
              - authority positioning
              - storytelling flow
              - strong CTA
              - modern formatting
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

              Hooks:
              ${hooks}

              Generate ONE premium LinkedIn post.
              `
          }
        ]
      });

    // SAFETY CHECK

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
      "outputs/linkedin"
    );

    await fs.writeFile(

      `outputs/linkedin/${topic}.txt`,

      output
    );

    console.log(
      "✅ LinkedIn post saved"
    );

    return output;

  } catch (error) {

    console.log(
      "❌ LinkedIn agent failed"
    );

    console.log(error);

    return `
    AI LinkedIn post generation failed temporarily.
    `;
  }
}

module.exports =
  generatePost;