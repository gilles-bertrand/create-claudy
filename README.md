# create-claudy

Scaffolder qui crée un projet Claude Code préconfiguré pour utiliser le plugin [`claudy`](https://github.com/gilles-bertrand/claudy-plugin).

## Usage

Deux modes :

### 1. Créer un nouveau projet (`scaffold`, défaut)

```bash
# Avec pnpm (recommandé)
pnpm create claudy mon-projet

# Avec npm
npm create claudy@latest mon-projet

# Avec npx
npx create-claudy mon-projet
```

Si vous omettez le nom, il vous sera demandé.

### 2. Ajouter la couche Claude à un projet existant (`init`)

```bash
cd mon-projet-existant
npx create-claudy init
```

Installe uniquement `.claude/` (settings.json, CLAUDE.md, commands/, agents/) et `.mcp.json`. **Ne modifie pas** votre `package.json` ni votre arborescence applicative. Si `.claude/settings.json` ou `.mcp.json` existent déjà, ils sont **fusionnés** intelligemment (permissions, marketplaces, plugins, serveurs MCP) sans écraser vos réglages. `CLAUDE.md` est préservé s'il existe.

## Options

| Flag | Effet | Mode |
|------|-------|------|
| `--no-git` | Ne pas initialiser de dépôt git | scaffold |
| `-h`, `--help` | Aide | tous |

## Ce qu'il génère

```
mon-projet/
├── .claude/
│   ├── settings.json       # pré-configuré pour activer le plugin claudy
│   ├── CLAUDE.md           # mémoire projet (à personnaliser)
│   ├── commands/           # vos commandes locales
│   └── agents/             # vos agents locaux
├── .env.example
├── .gitignore
├── .mcp.json               # Playwright préconfiguré
├── ai_docs/                # doc API consultée par les agents
├── docs/                   # documentation projet
├── specs/
│   ├── todo/               # plans en attente
│   ├── done/               # plans terminés
│   └── handoffs/           # états de session
├── src/                    # code applicatif
└── README.md
```

## Ce que fait le plugin claudy

Une fois Claude Code lancé dans le nouveau projet, le plugin est activé automatiquement et fournit :

- **Commandes** : `/TPK-plan`, `/TPK-build`, `/TPK-validate`, `/TPK-commit`, `/TPK-merge`, `/TPK-review`, `/TPK-prime`, `/TPK-handoff`, `/TPK-pickup`, `/TPK-create-command`, `/TPK-parallel-subagents`, `/TPK-visual-verify`, `/TPK-screenshot-compare`
- **Agents** : `code-reviewer`, `test-runner`, `doc-generator`, `validated-builder`
- **Skills** : `security-audit`, `skill-creator`
- **Hooks de sécurité** actifs par défaut (bloquent `rm -rf`, force push, et protègent `.env`, `~/.ssh/`, `~/.aws/`…)
- **Commandes de gestion** : `/claudy-eject` et `/claudy-sync` (voir ci-dessous)

Voir le [repo du plugin](https://github.com/gilles-bertrand/claudy-plugin) pour les détails.

## Matérialiser les commandes dans le projet (eject / sync)

Par défaut, les commandes du plugin vivent dans le cache marketplace de Claude Code (`~/.claude/plugins/cache/...`). Si vous voulez **les versionner avec le projet et les faire évoluer indépendamment** (workflow par projet) :

```text
/claudy-eject              # copie commands/ agents/ skills/ vers .claude/
/claudy-eject TPK-build    # éjecte une seule commande
/claudy-sync               # rapatrie les nouveautés amont (mode --new-only par défaut)
/claudy-sync --diff        # voir les divergences sans rien écraser
```

Une fois éjectées, les copies projet ont priorité sur la version du plugin. Le plugin reste actif et fournit les ressources non éjectées.

## Mise à jour du scaffolder

```bash
# Avec pnpm
pnpm dlx create-claudy@latest ...

# Avec npm
npm create claudy@latest ...
```

Le scaffolder est un outil one-shot : il génère le projet puis disparaît. Les mises à jour amont du plugin `claudy` se gèrent via `/plugin update` (Claude Code) puis `/claudy-sync` si vous avez éjecté.

## Prérequis

- Node.js ≥ 18
- [Claude Code](https://claude.com/claude-code) installé (pour utiliser les projets générés)

## Licence

MIT © Gilles Bertrand
