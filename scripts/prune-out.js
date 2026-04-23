const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");

// Force GitHub Pages to rebuild (timestamp changes every deploy)
fs.writeFileSync(
  path.join(outDir, "build.txt"),
  new Date().toISOString() + "\n",
  "utf8"
);

const toRemove = [
  "moving avatar.mp4",
  "Empty 606 Shelf Idea.png",
];

let removed = 0;
for (const name of toRemove) {
  const filePath = path.join(outDir, name);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    removed++;
    console.log("Pruned:", name);
  }
}
console.log("Pruned", removed, "large file(s) from out/");
