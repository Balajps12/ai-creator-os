const runResearch =
  require("../agents/research-agent");

const generateHooks =
  require("../agents/hook-agent");

const generatePost =
  require("../agents/linkedin-agent");

const generateVisuals =
  require("../agents/visual-agent");

const generateCarousel =
  require("../agents/carousel-agent");

async function run() {

  const topic =
    "AI personal branding";

  const research =
    await runResearch(topic);

  const hooks =
    await generateHooks(
      topic,
      research
    );

  const post =
    await generatePost(
      topic,
      research,
      hooks
    );

  await generateVisuals(
    topic,
    research,
    post
  );

  await generateCarousel(
    topic,
    research,
    post
  );
}

run();