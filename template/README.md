# {{PROJECT_NAME}}

Description de votre projet.

## Prérequis

- [Claude Code](https://claude.com/claude-code) installé
- Node.js 18+

## Démarrage

```bash
# Configurer l'environnement
cp .env.example .env
# Complétez .env avec vos clés

# Lancer Claude Code
claude
```

Au premier lancement, Claude Code détectera le plugin `claudy` référencé dans `.claude/settings.json` et vous proposera de l'installer. Acceptez pour récupérer toutes les commandes `/TPK-*`, agents et hooks de sécurité.

### Personnaliser les commandes par projet

Pour matérialiser les commandes du plugin dans `.claude/` afin de les versionner et les faire évoluer projet-par-projet :

```text
/claudy-eject          # copie commands/ agents/ skills/ du plugin vers .claude/
/claudy-sync           # plus tard, rapatrie les nouveautés amont (--new-only par défaut)
/claudy-sync --diff    # voir ce qui a changé amont sans écraser le local
```

Les copies projet ont priorité sur la version du plugin ; ce dernier continue de fournir les ressources non éjectées.

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

```text
/plugin marketplace update claudy-marketplace
/plugin update claudy@claudy-marketplace
```

Si vous avez éjecté des ressources avec `/claudy-eject`, lancez ensuite `/claudy-sync` pour rapatrier les évolutions amont sans toucher à vos customisations.

## Licence

À compléter.
