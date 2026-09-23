import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const coverage = JSON.parse(
  await readFile(resolve(root, "tool-coverage.json"), "utf8"),
);
const references = resolve(root, "skills/ownpost/references");
if (!check) await mkdir(references, { recursive: true });

async function output(name, content) {
  const path = resolve(references, name);
  const expected = content.replaceAll("\r\n", "\n").trimEnd() + "\n";
  if (check) {
    const actual = (await readFile(path, "utf8")).replaceAll("\r\n", "\n");
    if (actual !== expected)
      throw new Error(name + " is stale; run npm run build");
  } else await writeFile(path, expected);
}

for (const name of Object.keys(coverage).filter((name) => name !== "ownpost")) {
  const source = (
    await readFile(resolve(root, "skills", name, "SKILL.md"), "utf8")
  ).replaceAll("\r\n", "\n");
  const body = source
    .replace(/^---\n[\s\S]*?\n---\n+/, "")
    .replace(/## Connection and account\n[\s\S]*?(?=\n## |$)/, "")
    .replaceAll("(references/setup.md)", "(connection-setup.md)")
    .replace(/\n{3,}/g, "\n\n");
  await output(name.slice("ownpost-".length) + ".md", body);
}
await output(
  "connection-setup.md",
  await readFile(
    resolve(root, "skills/ownpost-setup/references/setup.md"),
    "utf8",
  ),
);
console.log(
  check
    ? "Bundled workflows are current."
    : "Bundled standalone OwnPost workflows.",
);
