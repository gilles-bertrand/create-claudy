# Changelog

## [Unreleased]

## [0.1.0] — 2026-04-14

### Added

- Première publication du scaffolder `create-claudy`.
- Commande `pnpm create claudy [project-name]` (ou npm / npx).
- Génère un projet avec `.claude/settings.json` préconfiguré pour le plugin `claudy`.
- Structure : `src/`, `specs/{todo,done,handoffs}/`, `docs/`, `ai_docs/`, `.claude/{commands,agents}/`.
- Fichiers inclus : `CLAUDE.md` squelette, `.env.example`, `.gitignore`, `.mcp.json` (Playwright), `README.md`.
- Init git automatique avec commit initial (désactivable avec `--no-git`).

[Unreleased]: https://github.com/gilles-bertrand/create-claudy/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.1.0
