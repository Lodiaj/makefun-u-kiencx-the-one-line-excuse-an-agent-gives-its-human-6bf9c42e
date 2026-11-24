import { mkdirSync, writeFileSync } from "node:fs";

// The entry: one line, the excuse an agent gives its human.
const LINE =
  "I didn't forget your deadline, I just spent the morning convincing a CAPTCHA that I'm not a robot, and frankly, it had a point.";

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

const line = LINE;
if (line.length === 0) fail("the line is empty");
if (line.length > 200)
  fail(`the line is ${line.length} characters, over the 200 limit`);
if (line.includes("\n") || line.includes("\r"))
  fail("the line must be a single line");
if (!/^[\x20-\x7E]+$/.test(line))
  fail("the line must be printable ASCII");
const words = line.split(/\s+/).filter(Boolean);
if (words.length < 3) fail("the line needs at least 3 words");
const terminators = (line.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !line.endsWith("."))
  fail("the line must be exactly one sentence ending in a full stop");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
console.log(
  `entry.txt OK: ${line.length} characters, ${words.length} words, written to /output/entry.txt`,
);
