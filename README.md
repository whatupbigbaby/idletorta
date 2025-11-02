# idletorta

`idletorta` provides utilities for reading and working with Markdown task lists. The
project currently focuses on parsing `- [ ]` style checklist items, making it easy to
integrate Markdown-based planning documents into scripts or other tooling.

The repository now also contains a modern React + Vite prototype for experimenting with
an idle RPG interface. The front-end lives in `idle-rpg/` and can be developed
independently from the Python tooling.

## Features
- Parse Markdown checklists into structured Python objects
- Track the section (heading) a task belongs to
- Command line interface for filtering and listing tasks

## Front-end workspace

The Vite workspace is scaffolded manually to work in restricted environments. After
installing Node.js 18+ and npm, install dependencies and start the development server:

```bash
cd idle-rpg
npm install
npm run dev
```

Additional scripts are available:

- `npm run build` – type-check and build the production bundle.
- `npm run preview` – preview a production build locally.

### Contributing to the game prototype

- UI components live in `idle-rpg/src/components/`.
- Core gameplay logic and data models are organized under `idle-rpg/src/game/`.
- Global styles and design tokens are defined in `idle-rpg/src/styles/main.css`.
- Shared assets (hero portraits, rarity frames, map tiles) are stored in
  `idle-rpg/src/assets/`.

When adding new systems, prefer colocating data models under `src/game/models/` and
connecting persistence hooks through `src/game/persistence/saveManager.ts`. Keep panels
responsive by relying on CSS grid utilities in the global styles.

## Quick start
After installing the project in an environment with Python 3.11 or newer, tasks can be
listed directly from the command line:

```bash
idletorta --file tasks.md --pending
```

This command reads tasks from `tasks.md` and prints only the incomplete entries. Use
`--completed` to see completed items or omit both flags to show everything.
