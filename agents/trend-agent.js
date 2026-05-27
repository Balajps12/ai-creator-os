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

async function detectTrends() {

  try {

    console.log(
      "📈 Detecting AI content trends"
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
              You are an elite AI trend strategist.

              Detect:
              - emerging creator economy trends
              - viral LinkedIn opportunities
              - AI startup conversations
              - audience psychology shifts
              - personal branding opportunities

              Focus on:
              - high engagement
              - controversial discussions
              - curiosity-driven ideas
              - future-focused topics
              `
          },

          {
            role: "user",

            content:
              `
              Generate:

              - 20 trending AI content topics
              - viral LinkedIn angles
              - audience pain points
              - authority-building opportunities
              - short-form content ideas
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
      "outputs/trends"
    );

    await fs.writeFile(

      `outputs/trends/ai-trends.txt`,

      output
    );

    console.log(
      "✅ Trends saved"
    );

    return output;

  } catch (error) {

    console.log(
      "❌ Trend agent failed"
    );

    console.log(error.message);

    return `
    Trend detection failed temporarily.
    `;
  }
}

module.exports =
  detectTrends;