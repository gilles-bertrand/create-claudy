# create-claudy

Scaffolder qui crée un projet Claude Code préconfiguré pour utiliser le plugin [`claudy`](https://github.com/gilles-bertrand/claudy-plugin).

## Usage

```bash
# Avec pnpm (recommandé)
pnpm create claudy mon-projet

# Avec npm
npm create claudy@latest mon-projet

# Avec npx
npx create-claudy mon-projet
```

Si vous omettez le nom, il vous sera demandé.

## Options

| Flag | Effet |
|------|-------|
| `--no-git` | Ne pas initialiser de dépôt git |
| `-h`, `--help` | Aide |

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

Voir le [repo du plugin](https://github.com/gilles-bertrand/claudy-plugin) pour les détails.

## Mise à jour du scaffolder

```bash
# Avec pnpm
pnpm dlx create-claudy@latest ...

# Avec npm
npm create claudy@latest ...
```

Le scaffolder est un outil one-shot : il génère le projet puis disparaît. Les mises à jour du projet lui-même (commandes/agents/hooks) passent par le plugin `claudy` via `/plugin update`.

## Prérequis

- Node.js ≥ 18
- [Claude Code](https://claude.com/claude-code) installé (pour utiliser les projets générés)

## Licence

MIT © Gilles Bertrand
