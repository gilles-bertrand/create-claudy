#!/usr/bin/env node
import { existsSync, readdirSync, symlinkSync, unlinkSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const pluginBase = join(root, "node_modules", "claudy-plugin");

if (!existsSync(pluginBase)) {
  console.warn("claudy-plugin not found in node_modules, skipping symlinks.");
  process.exit(0);
}

const links = [
  { src: join(pluginBase, "commands"), dest: join(root, ".claude", "commands") },
  { src: join(pluginBase, "agents"), dest: join(root, ".claude", "agents") },
];

for (const { src, dest } of links) {
  if (!existsSync(src)) continue;
  for (const entry of readdirSync(src)) {
    if (!entry.endsWith(".md")) continue;
    const destFile = join(dest, entry);
    if (existsSync(destFile)) unlinkSync(destFile);
    symlinkSync(relative(dest, join(src, entry)), destFile);
    console.log(`  linked .claude/${dest.split(".claude/")[1]}/${entry}`);
  }
}
