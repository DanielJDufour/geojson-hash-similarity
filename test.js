const fs = require("fs");
const test = require("flug");
const geojson_hash_similarity = require("./index.js");

const Example1 = JSON.parse(fs.readFileSync("./test-data/Example1.geojson", "utf-8"));
const Example2 = JSON.parse(fs.readFileSync("./test-data/Example2.geojson", "utf-8"));

test("basic", ({ eq }) => {
  eq(geojson_hash_similarity(Example1, Example2), 0.5);
});
