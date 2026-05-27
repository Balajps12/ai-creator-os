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

async function runPipeline(
  topic
) {

  console.log(`
==================================
🚀 STARTING AI CONTENT PIPELINE
==================================
`);

  console.log(`
Topic:
${topic}
`);

  // STEP 1
  const research =
    await runResearch(topic);

  // STEP 2
  const hooks =
    await generateHooks(
      topic,
      research
    );

  // STEP 3
  const post =
    await generatePost(
      topic,
      research,
      hooks
    );

  // STEP 4
  await generateVisuals(
    topic,
    research,
    post
  );

  // STEP 5
  await generateCarousel(
    topic,
    research,
    post
  );

  console.log(`
==================================
✅ PIPELINE COMPLETE
==================================
`);
}

module.exports =
  runPipeline;