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

async function generateCalendar() {

  try {

    console.log(
      "📅 Generating AI content calendar"
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
              You are an elite LinkedIn growth strategist.

              Create:
              - weekly posting schedule
              - content pillars
              - audience engagement strategy
              - personal branding structure
              - authority-building roadmap

              Optimize for:
              - reach
              - consistency
              - authority
              - audience growth
              - inbound leads
              `
          },

          {
            role: "user",

            content:
              `
              Create a 7-day AI creator content calendar.

              Include:
              - topic
              - content type
              - posting goal
              - CTA
              - visual direction
              - audience psychology
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
      "outputs/calendar"
    );

    await fs.writeFile(

      `outputs/calendar/content-calendar.txt`,

      output
    );

    console.log(
      "✅ Content calendar saved"
    );

    return output;

  } catch (error) {

    console.log(
      "❌ Calendar agent failed"
    );

    console.log(error.message);

    return `
    Calendar generation failed temporarily.
    `;
  }
}

module.exports =
  generateCalendar;