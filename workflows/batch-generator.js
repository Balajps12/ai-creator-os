const runPipeline =
  require("./orchestration-router");

async function runBatch() {

  const topics = [

    "AI personal branding",

    "AI startups",

    "LinkedIn growth",

    "AI automation",

    "Future of work",

    "Autonomous AI agents",

    "Creator economy",

    "AI marketing"
  ];

  console.log(`
==================================
🚀 STARTING BATCH GENERATION
==================================
`);

  for (const topic of topics) {

    console.log(`
----------------------------------
Generating:
${topic}
----------------------------------
`);

    await runPipeline(topic);
  }

  console.log(`
==================================
✅ BATCH COMPLETE
==================================
`);
}

runBatch();