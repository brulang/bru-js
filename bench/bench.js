const parse = require("../src/parse");
const { Bench } = require("tinybench");
const fs = require("fs");
const { join } = require("path");

async function run() {
  const bench = new Bench({ name: "Stress Parse", time: 100 });
  const sourceCode = await fs.promises.readFile(
    join(__dirname, "./example-stress.bru"),
    "utf8"
  );

  bench.add("parse", () => {
    const result = parse(sourceCode);
    if (result.error) {
      throw result.error;
    }
  });

  await bench.run();

  console.log(bench.name);
  console.table(bench.table());
}

if (require.main === module) {
  run();
}
