const express =
  require("express");

const cors =
  require("cors");

const fs =
  require("fs-extra");

const path =
  require("path");

const runPipeline =
  require("./workflows/orchestration-router");

const app =
  express();

const PORT =
  process.env.PORT || 5000;

app.use(cors());

app.use(
  express.json()
);

async function loadFiles(
  folder
) {

  const dir =
    path.join(
      __dirname,
      "outputs",
      folder
    );

  try {

    const files =
      await fs.readdir(dir);

    const data = [];

    for (const file of files) {

      const content =
        await fs.readFile(

          path.join(dir, file),
          "utf-8"
        );

      data.push({

        file,

        content:
          content.substring(0, 500)
      });
    }

    return data;

  } catch {

    return [];
  }
}

app.post(

  "/run-ai",

  async (req, res) => {

    try {

      const topic =
        req.body.topic ||
        "AI automation";

      await runPipeline(topic);

      res.json({

        success: true,

        topic
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        error: error.message
      });
    }
  }
);

app.get(

  "/api/dashboard",

  async (req, res) => {

    const trends =
      await loadFiles(
        "trends"
      );

    const linkedin =
      await loadFiles(
        "linkedin"
      );

    const visuals =
      await loadFiles(
        "visuals"
      );

    const carousels =
      await loadFiles(
        "carousels"
      );

    res.json({

      system: "Operational",

      trends,
      linkedin,
      visuals,
      carousels
    });
  }
);

app.get(

  "/",

  (req, res) => {

    res.send(`

<!DOCTYPE html>

<html>

<head>

<title>
AI Creator OS
</title>

<style>

body {

margin: 0;
padding: 0;
font-family: Arial;
background: #020617;
color: white;
}

.header {

padding: 30px;
background: #0f172a;
border-bottom: 1px solid #1e293b;
}

.header h1 {

margin: 0;
color: #38bdf8;
}

.grid {

display: grid;

grid-template-columns:
repeat(auto-fit,minmax(300px,1fr));

gap: 20px;

padding: 20px;
}

.card {

background: #0f172a;

padding: 20px;

border-radius: 16px;

border: 1px solid #1e293b;

box-shadow:
0 0 20px rgba(0,0,0,0.3);
}

.card h2 {

color: #facc15;

margin-top: 0;
}

.metric {

font-size: 42px;

font-weight: bold;

color: #38bdf8;
}

pre {

white-space: pre-wrap;

font-size: 13px;

line-height: 1.5;

color: #cbd5e1;
}

.badge {

display: inline-block;

padding: 6px 12px;

background: #22c55e;

border-radius: 999px;

font-size: 12px;

font-weight: bold;
}

.file {

padding: 10px;

margin-bottom: 10px;

background: #1e293b;

border-radius: 10px;
}

</style>

</head>

<body>

<div class="header">

<h1>
🚀 AI Creator Operating System
</h1>

<p>
Autonomous AI Media Infrastructure
</p>

<span class="badge">
SYSTEM ACTIVE
</span>

</div>

<div id="app">
Loading...
</div>

<script>

async function loadDashboard() {

const res =
await fetch("/api/dashboard");

const data =
await res.json();

document.getElementById("app")
.innerHTML =

\`

<div class="grid">

<div class="card">

<h2>
System Status
</h2>

<div class="metric">
ONLINE
</div>

</div>

<div class="card">

<h2>
LinkedIn Assets
</h2>

<div class="metric">
\${data.linkedin.length}
</div>

</div>

<div class="card">

<h2>
Visual Prompts
</h2>

<div class="metric">
\${data.visuals.length}
</div>

</div>

<div class="card">

<h2>
Carousel Assets
</h2>

<div class="metric">
\${data.carousels.length}
</div>

</div>

<div class="card">

<h2>
📈 AI Trends
</h2>

\${data.trends.map(item => \`

<div class="file">

<strong>
\${item.file}
</strong>

<pre>
\${item.content}
</pre>

</div>

\`).join("")}

</div>

<div class="card">

<h2>
✍️ LinkedIn Posts
</h2>

\${data.linkedin.map(item => \`

<div class="file">

<strong>
\${item.file}
</strong>

<pre>
\${item.content}
</pre>

</div>

\`).join("")}

</div>

<div class="card">

<h2>
🎬 Visual Prompts
</h2>

\${data.visuals.map(item => \`

<div class="file">

<strong>
\${item.file}
</strong>

<pre>
\${item.content}
</pre>

</div>

\`).join("")}

</div>

<div class="card">

<h2>
📚 Carousels
</h2>

\${data.carousels.map(item => \`

<div class="file">

<strong>
\${item.file}
</strong>

<pre>
\${item.content}
</pre>

</div>

\`).join("")}

</div>

</div>

\`;
}

loadDashboard();

</script>

</body>

</html>

`);
  }
);

app.listen(

  PORT,

  () => {

    console.log(
      `🚀 Dashboard running at http://localhost:${PORT}`
    );
  }
);