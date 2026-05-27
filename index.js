const runPipeline =
  require("./workflows/orchestration-router");

async function main() {

  await runPipeline(

    "AI personal branding"
  );
}

main();