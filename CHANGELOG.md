# Changelog

## [Unreleased]

## [0.2.3] — 2026-04-20

### Fixed

- Template `.claude/settings.json` : alignement du nom du marketplace sur `claudy-marketplace` (clé `extraKnownMarketplaces` et `enabledPlugins: claudy@claudy-marketplace`). Corrige l'erreur *Plugin "claudy" not found in marketplace "claudy"* au premier démarrage.

## [0.2.2] — 2026-04-20

### Changed

- Alignement de version avec `claudy-plugin` et `claudy-marketplace` (tous en 0.2.2).

## [0.2.1] — 2026-04-14

### Fixed

- Bump de version pour une republication propre sur npm.

## [0.2.0] — 2026-04-14

### Added

- Shim `bin/create-claudy` pour exposer le binaire via `pnpm create` / `npm create`.
- Approche d'installation via symlinks pour `pnpm`/`npm` dans les projets scaffoldés.
- Vérification de la présence du CLI `claude` au scaffold.
- Template : `claudy-setup.mjs` et `package.json` minimal.

### Fixed

- Clés `marketplace` dans `settings.json` du template.

## [0.1.0] — 2026-04-14

### Added

- Première publication du scaffolder `create-claudy`.
- Commande `pnpm create claudy [project-name]` (ou npm / npx).
- Génère un projet avec `.claude/settings.json` préconfiguré pour le plugin `claudy`.
- Structure : `src/`, `specs/{todo,done,handoffs}/`, `docs/`, `ai_docs/`, `.claude/{commands,agents}/`.
- Fichiers inclus : `CLAUDE.md` squelette, `.env.example`, `.gitignore`, `.mcp.json` (Playwright), `README.md`.
- Init git automatique avec commit initial (désactivable avec `--no-git`).

[Unreleased]: https://github.com/gilles-bertrand/create-claudy/compare/v0.2.3...HEAD
[0.2.3]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.2.3
[0.2.2]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.2.2
[0.2.1]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.2.1
[0.2.0]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.2.0
[0.1.0]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.1.0
