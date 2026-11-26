import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ENTRY =
  "Competitive napping: athletes race to fall asleep on live TV while the commentators whisper, and the first to snore is disqualified.";

// The gate only accepts 1–200 characters of non-whitespace text on one line,
// so refuse to write anything that would fail it instead of writing it anyway.
if (ENTRY.length === 0 || ENTRY.length > 200 || ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  console.error("Entry line is invalid: must be one line of 1-200 characters.");
  process.exit(1);
}

async function main(): Promise<void> {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  try {
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
    console.log(`Wrote entry (${ENTRY.length} chars) to ${join(outDir, "entry.txt")}`);
  } catch (error) {
    console.error("Failed to write entry:", error);
    process.exit(1);
  }
}

await main();
