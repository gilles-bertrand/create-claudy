# Changelog

## [Unreleased]

## [0.3.0] — 2026-05-06

### Added

- Sous-commande `create-claudy init` : installe la couche Claude (`.claude/` + `.mcp.json`) dans un projet existant, sans modifier `package.json` ni l'arborescence applicative.
- Merge JSON intelligent pour `.claude/settings.json` et `.mcp.json` : union dédupliquée de `permissions.allow`/`deny`, shallow-merge de `extraKnownMarketplaces`/`enabledPlugins`/`mcpServers`, clés utilisateur préservées.
- `.claude/CLAUDE.md` préservé s'il existe déjà (warn, pas d'écrasement).
- Documentation des commandes `/claudy-eject` et `/claudy-sync` (fournies par claudy@v0.3.0) dans le README scaffolder, le README template et le `CLAUDE.md` template, comme nouveau workflow recommandé pour personnaliser les ressources du plugin par projet.

### Changed

- CLI refactorée en deux modes explicites : `scaffold` (défaut, rétrocompatible) et `init`. `create-claudy <nom>` fonctionne toujours à l'identique.
- Message de fin du scaffold : remplace les anciennes "deux approches (Claude Code / pnpm install + symlinks)" par un parcours unique (lance Claude Code, accepte le plugin, optionnellement `/claudy-eject` pour matérialiser).

### Removed

- **Breaking** : voie d'installation par symlinks `pnpm install` retirée du template. Les fichiers suivants sont supprimés du scaffold :
  - `template/claudy-setup.mjs` (script postinstall qui créait des symlinks `node_modules/claudy-plugin/{commands,agents}/* → .claude/{commands,agents}/`).
  - `template/package.json` (qui n'existait que pour porter le hook `postinstall` et la `devDependency` `claudy-plugin`).
  - Lignes du `template/.gitignore` qui ignoraient les symlinks régénérés.
- Les commandes/agents du plugin sont désormais exclusivement servies par le marketplace claudy. Pour matérialiser des copies projet versionnables, utiliser `/claudy-eject` (livré par claudy@v0.3.0).

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

[Unreleased]: https://github.com/gilles-bertrand/create-claudy/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.3.0
[0.2.3]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.2.3
[0.2.2]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.2.2
[0.2.1]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.2.1
[0.2.0]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.2.0
[0.1.0]: https://github.com/gilles-bertrand/create-claudy/releases/tag/v0.1.0
