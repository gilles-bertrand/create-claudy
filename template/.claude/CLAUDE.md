# {{PROJECT_NAME}}

Description courte du projet.

## Quick Reference

- Code applicatif : `src/`
- Plans : `specs/todo/` → `specs/done/`
- Documentation : `docs/`
- Doc API pour agents : `ai_docs/`

## Commandes

- Test : `npm test`
- Build : `npm run build`
- Dev : `npm run dev`

## Plugin Claude Code

Ce projet utilise le plugin [`claudy`](https://github.com/gilles-bertrand/claudy-plugin) qui fournit :

- Commandes `/TPK-*` (plan, build, validate, commit, merge, review, etc.)
- Sub-agents (`code-reviewer`, `test-runner`, `doc-generator`, `validated-builder`)
- Skills (`security-audit`, `skill-creator`)
- Hooks de sécurité actifs par défaut (damage-control)
- `/claudy-eject` et `/claudy-sync` : matérialiser les ressources du plugin dans `.claude/` du projet, puis suivre les nouveautés amont

Les commandes locales au projet vont dans `.claude/commands/` et les agents locaux dans `.claude/agents/`. Une commande locale qui porte le même nom qu'une commande du plugin la remplace.

## Notes importantes

- Garder ce fichier sous 500 tokens
- Contexte spécifique à une feature : dans les prompts ou `specs/`
