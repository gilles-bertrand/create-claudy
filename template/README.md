# {{PROJECT_NAME}}

Description de votre projet.

## Prérequis

- [Claude Code](https://claude.com/claude-code) installé
- Node.js 18+

## Démarrage

```bash
# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Complétez .env avec vos clés

# Lancer Claude Code
claude
```

Au premier lancement, Claude Code détectera le plugin `claudy` référencé dans `.claude/settings.json` et vous proposera de l'installer. Acceptez pour récupérer toutes les commandes `/TPK-*`, agents et hooks de sécurité.

## Structure

```
.
├── .claude/              # Config Claude Code (settings + CLAUDE.md + extensions locales)
├── src/                  # Code applicatif
├── specs/
│   ├── todo/             # Plans en attente
│   ├── done/             # Plans terminés
│   └── handoffs/         # États de session
├── docs/                 # Documentation projet
└── ai_docs/              # Doc API consultée par les agents
```

## Workflow avec Claude Code

```
PLANIFIER → CONSTRUIRE → VALIDER → VÉRIFIER → COMMITTER
```

1. `/TPK-plan "ce que je veux faire"` — crée une spec dans `specs/todo/`
2. `/TPK-build specs/todo/ma-spec.md` — implémente
3. `/TPK-validate` — lance les tests
4. `/TPK-review` — compare à la spec
5. `/TPK-commit` — crée le commit

## Plugin utilisé

Ce projet utilise [`claudy`](https://github.com/gilles-bertrand/claudy-plugin).

Pour mettre à jour le plugin :

```bash
/plugin marketplace update claudy-marketplace
/plugin update claudy@claudy-marketplace
```

## Licence

À compléter.
