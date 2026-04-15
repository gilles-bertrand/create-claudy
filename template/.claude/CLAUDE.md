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

Les commandes locales au projet vont dans `.claude/commands/` et les agents locaux dans `.claude/agents/`.

## Notes importantes

- Garder ce fichier sous 500 tokens
- Contexte spécifique à une feature : dans les prompts ou `specs/`
