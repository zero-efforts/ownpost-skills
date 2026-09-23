import assert from "node:assert/strict";
import { readdir, readFile, access } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const coverage = JSON.parse(
  await readFile(resolve(root, "tool-coverage.json"), "utf8"),
);
const skillsRoot = resolve(root, "skills");
const folders = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
assert.deepEqual(
  folders,
  Object.keys(coverage).sort(),
  "Coverage must match distributed skills",
);
const tools = Object.values(coverage).flat();
assert.equal(
  tools.length,
  new Set(tools).size,
  "Assign each MCP tool to one primary skill",
);
for (const name of folders) {
  const folder = resolve(skillsRoot, name);
  const body = (await readFile(resolve(folder, "SKILL.md"), "utf8")).replaceAll(
    "\r\n",
    "\n",
  );
  assert.match(name, /^ownpost(?:-[a-z-]+)?$/);
  assert.ok(body.startsWith("---\n"), name + " needs frontmatter");
  assert.ok(
    body.includes("name: " + name + "\n"),
    name + " needs matching metadata",
  );
  assert.match(body, /\ndescription: .+/);
  for (const tool of coverage[name]) {
    assert.ok(body.includes("`" + tool + "`"), name + " omits " + tool);
  }
  for (const file of (await readdir(folder, { recursive: true })).filter(
    (file) => file.endsWith(".md"),
  )) {
    const filePath = resolve(folder, file);
    const markdown = await readFile(filePath, "utf8");
    for (const match of markdown.matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1].split("#")[0];
      if (!target || /^[a-z]+:/i.test(target)) continue;
      const reference = resolve(dirname(filePath), target);
      assert.ok(
        reference.startsWith(folder + sep),
        name + " reference leaves its standalone installation: " + target,
      );
      await access(reference);
    }
  }
  const metadata = await readFile(
    resolve(folder, "agents/openai.yaml"),
    "utf8",
  );
  assert.ok(
    metadata.includes("$" + name),
    name + " needs a tagged starter prompt",
  );
}
console.log(
  "Validated " +
    folders.length +
    " portable skills covering " +
    tools.length +
    " tool names.",
);
