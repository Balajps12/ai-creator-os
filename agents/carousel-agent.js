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

async function generateCarousel(
  topic,
  research,
  post
) {

  try {

    console.log(
      `📚 Generating carousel for: ${topic}`
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
              You are an elite LinkedIn carousel strategist.

              Create:
              - highly engaging slide structures
              - concise copy
              - authority positioning
              - curiosity-driven progression
              - premium educational content

              Structure:
              - hook slide
              - insight slides
              - storytelling
              - framework slides
              - CTA slide

              Optimize for:
              - saves
              - shares
              - retention
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

              LinkedIn Post:
              ${post}

              Generate:
              - 10-slide LinkedIn carousel
              - slide titles
              - slide body copy
              - CTA ending
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
      "outputs/carousels"
    );

    await fs.writeFile(

      `outputs/carousels/${topic}.txt`,

      output
    );

    console.log(
      "✅ Carousel saved"
    );

    return output;

  } catch (error) {

    console.log(
      "❌ Carousel agent failed"
    );

    console.log(error.message);

    return `
    Carousel generation failed temporarily.
    `;
  }
}

module.exports =
  generateCarousel;