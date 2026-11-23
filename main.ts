import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// One-star review of something essential: water.
// Deadpan, one line, one joke: water is nothing at all, yet we are
// forever being told we are not drinking enough of it.
const ENTRY =
  "One star. Water has no taste, no colour, no calories, and is still the one thing I am always told I am not drinking enough of.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: what landed on disk must be exactly the line above.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch in entry.txt");
}
if (ENTRY.includes("\n") || ENTRY !== ENTRY.trim()) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}
if (back.length < 1 || back.length > 160) {
  throw new Error(`entry length ${back.length} outside 1-160 characters`);
}
console.log(`Wrote ${outPath} (${back.length} characters)`);
