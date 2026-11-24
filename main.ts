// Everyday Wonder, Two Days to Find the Line.
// Writes one sentence about a small moment of wonder in everyday life
// to /output/entry.txt. The gate: UTF-8 text, 1 to 200 characters,
// not only whitespace, a single sentence.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ENTRY =
  "The elevator doors opened on a floor I never pressed, and the hallway smelled of rain that hadn't fallen yet.";

function main(): void {
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outFile = resolve(outDir, "entry.txt");
  writeFileSync(outFile, ENTRY, "utf8");
  // Read it back and confirm the file holds exactly the entry, byte for byte.
  const written = readFileSync(outFile, "utf8");
  if (written !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match the entry");
  }
}

main();
