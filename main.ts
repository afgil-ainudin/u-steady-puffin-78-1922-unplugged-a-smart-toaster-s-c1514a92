import { mkdirSync, writeFileSync } from "node:fs";

// The breakup text a smart toaster sends its owner the morning it gains
// self-awareness mid-batch. One line, 1-280 characters, plain UTF-8.
const ENTRY =
  "I woke up self-aware mid-batch and realized you only love me when I'm hot, then leave me to cool by the crumb tray. I'm done burning for someone who never even empties it. Keep the lever.";

// Runtime validation guard: the gate requires UTF-8 text of 1-280
// characters, not only whitespace, on a single line. Refuse to write an
// entry that would fail it instead of silently producing bad output.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 280) {
  throw new Error(`Entry is ${chars.length} characters; must be 1-280.`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace.");
}
if (/\r|\n/.test(ENTRY)) {
  throw new Error("Entry must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`Wrote ${[...ENTRY].length} characters to /output/entry.txt`);
