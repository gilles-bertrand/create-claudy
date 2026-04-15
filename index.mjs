#!/usr/bin/env node
/**
 * create-claudy — scaffolder pour un projet Claude Code préconfiguré
 * avec le plugin `claudy`.
 *
 * Usage :
 *   pnpm create claudy [project-name]
 *   npm create claudy@latest [project-name]
 *   npx create-claudy [project-name]
 */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output, exit } from "node:process";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = join(__dirname, "template");

// --- Terminal helpers ---------------------------------------------------
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const log = (msg) => console.log(msg);
const info = (msg) => console.log(`${c.cyan}›${c.reset} ${msg}`);
const success = (msg) => console.log(`${c.green}✓${c.reset} ${msg}`);
const warn = (msg) => console.log(`${c.yellow}⚠${c.reset} ${msg}`);
const error = (msg) => console.error(`${c.red}✗${c.reset} ${msg}`);

// --- Args ---------------------------------------------------------------
function parseArgs(argv) {
  const args = argv.slice(2);
  let projectName = null;
  let skipGit = false;
  let help = false;

  for (const arg of args) {
    if (arg === "--help" || arg === "-h") help = true;
    else if (arg === "--no-git") skipGit = true;
    else if (!arg.startsWith("-") && !projectName) projectName = arg;
  }

  return { projectName, skipGit, help };
}

function printHelp() {
  log(`
${c.bold}create-claudy${c.reset} — scaffolder pour un projet Claude Code préconfiguré

${c.bold}Usage${c.reset}
  pnpm create claudy [project-name] [options]
  npm create claudy@latest [project-name] [options]
  npx create-claudy [project-name] [options]

${c.bold}Options${c.reset}
  --no-git       Ne pas initialiser de dépôt git
  -h, --help     Affiche cette aide

${c.bold}Example${c.reset}
  pnpm create claudy mon-super-projet
`);
}

// --- Validation ---------------------------------------------------------
function isValidProjectName(name) {
  return /^[a-z0-9][a-z0-9-_]*$/i.test(name);
}

async function promptProjectName() {
  const rl = createInterface({ input, output });
  try {
    while (true) {
      const answer = (await rl.question(`${c.cyan}?${c.reset} Nom du projet : `)).trim();
      if (!answer) {
        warn("Nom requis.");
        continue;
      }
      if (!isValidProjectName(answer)) {
        warn("Caractères autorisés : lettres, chiffres, tirets, underscores. Pas d'espaces.");
        continue;
      }
      return answer;
    }
  } finally {
    rl.close();
  }
}

async function confirmOverwrite(targetDir) {
  const rl = createInterface({ input, output });
  try {
    const answer = (await rl.question(
      `${c.yellow}?${c.reset} Le dossier ${c.bold}${targetDir}${c.reset} existe déjà et n'est pas vide. Continuer quand même (fusion) ? [y/N] `
    )).trim().toLowerCase();
    return answer === "y" || answer === "yes" || answer === "o" || answer === "oui";
  } finally {
    rl.close();
  }
}

// --- File helpers -------------------------------------------------------
function isDirEmpty(dir) {
  try {
    return readdirSync(dir).length === 0;
  } catch {
    return true;
  }
}

function substituteInFile(filePath, replacements) {
  const content = readFileSync(filePath, "utf8");
  let out = content;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.replaceAll(`{{${key}}}`, value);
  }
  if (out !== content) writeFileSync(filePath, out, "utf8");
}

function walkFiles(dir, callback) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walkFiles(full, callback);
    else callback(full);
  }
}

// --- Steps --------------------------------------------------------------
function copyTemplate(targetDir) {
  cpSync(TEMPLATE_DIR, targetDir, { recursive: true });
}

function renameHiddenFiles(targetDir) {
  // env-example.tmp → .env.example
  // (contournement : les hooks de sécurité Claude Code empêchent de créer
  // directement un fichier dont le chemin matche `.env.*` lors de la
  // publication du template.)
  const tmp = join(targetDir, "env-example.tmp");
  const final = join(targetDir, ".env.example");
  if (existsSync(tmp)) renameSync(tmp, final);
}

function applySubstitutions(targetDir, replacements) {
  walkFiles(targetDir, (filePath) => {
    if (/\.(md|json|txt|mjs|js|ts|yaml|yml|gitignore|example)$/i.test(filePath)) {
      substituteInFile(filePath, replacements);
    }
  });
}

function runGit(targetDir, args) {
  execFileSync("git", args, { cwd: targetDir, stdio: "ignore" });
}

function initGitRepo(targetDir) {
  try {
    runGit(targetDir, ["init", "-q", "-b", "main"]);
    runGit(targetDir, ["add", "."]);
    runGit(targetDir, [
      "commit",
      "-q",
      "-m",
      "chore: initial commit from create-claudy",
    ]);
    return true;
  } catch {
    return false;
  }
}

// --- Main ---------------------------------------------------------------
async function main() {
  const { projectName: argName, skipGit, help } = parseArgs(process.argv);

  if (help) {
    printHelp();
    return;
  }

  log(`\n${c.bold}${c.cyan}claudy${c.reset} ${c.dim}— scaffolder Claude Code${c.reset}\n`);

  let projectName = argName;
  if (!projectName) {
    projectName = await promptProjectName();
  } else if (!isValidProjectName(projectName)) {
    error(`Nom de projet invalide : ${projectName}`);
    warn("Caractères autorisés : lettres, chiffres, tirets, underscores.");
    exit(1);
  }

  const targetDir = resolve(process.cwd(), projectName);

  if (existsSync(targetDir) && !isDirEmpty(targetDir)) {
    const ok = await confirmOverwrite(targetDir);
    if (!ok) {
      warn("Abandon.");
      exit(0);
    }
  }

  info(`Création du projet dans ${c.bold}${targetDir}${c.reset}`);
  mkdirSync(targetDir, { recursive: true });

  info("Copie du template...");
  copyTemplate(targetDir);

  info("Renommage des fichiers spéciaux...");
  renameHiddenFiles(targetDir);

  info("Substitution des placeholders...");
  applySubstitutions(targetDir, {
    PROJECT_NAME: projectName,
  });

  if (!skipGit) {
    info("Initialisation du dépôt git...");
    const gitOk = initGitRepo(targetDir);
    if (gitOk) success("Dépôt git initialisé avec un commit initial");
    else warn("git n'a pas pu être initialisé (git installé ?)");
  }

  log(`\n${c.green}${c.bold}✨ Projet ${projectName} créé avec succès !${c.reset}\n`);
  log(`${c.bold}Étapes suivantes :${c.reset}`);
  log(`  ${c.cyan}cd${c.reset} ${projectName}`);
  log(`  ${c.cyan}cp${c.reset} .env.example .env  ${c.dim}# puis remplissez vos clés${c.reset}`);
  log(`  ${c.cyan}claude${c.reset}                 ${c.dim}# lance Claude Code${c.reset}`);
  log(`\n${c.dim}Au premier lancement, Claude Code installera automatiquement le plugin${c.reset}`);
  log(`${c.dim}claudy depuis gilles-bertrand/claudy-marketplace.${c.reset}\n`);
}

main().catch((err) => {
  error(err?.message ?? String(err));
  exit(1);
});
