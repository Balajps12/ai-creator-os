const detectTrends =
  require("../agents/trend-agent");

async function run() {

  await detectTrends();
}

run();