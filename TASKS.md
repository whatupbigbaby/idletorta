# Project Task Breakdown

This checklist reflects the ten-step roadmap using the detailed tasks from the revised specification provided by the team. Each step retains checkbox formatting so progress can be tracked directly in this file.

# 1. Initialize modern frontend toolchain

* [ ] **Scaffold project**

  * [ ] `npm create vite@latest idle-rpg -- --template react-ts` (or vanilla-ts if preferred)
  * [ ] `cd idle-rpg && npm install`
  * [ ] Add `npm run dev`, `npm run build`, `npm run preview` to README
* [ ] **Project structure**

  * [ ] `/public/index.html`

    * [ ] `<div id="app"></div>`
    * [ ] Add base meta, viewport, mobile-friendly tags
  * [ ] `/src/main.tsx` (or `main.ts`)

    * [ ] Mount root `<App />`
    * [ ] Import global styles `./styles/main.css`
  * [ ] `/src/styles/main.css`

    * [ ] CSS reset / normalize
    * [ ] Define CSS variables (colors, spacing, z-index layers, panel bg)
    * [ ] Base layout classes (`.panel`, `.hud`, `.scrollable`)
  * [ ] `/src/assets/`

    * [ ] Placeholder hero icons
    * [ ] Rarity frame images
    * [ ] Map tiles / biome placeholders
* [ ] **Tooling**

  * [ ] Configure `tsconfig.json` (paths: `@/components`, `@/game`, `@/styles`)
  * [ ] ESLint + Prettier (optional)
  * [ ] Vite alias in `vite.config.ts` to match TS paths
* [ ] **Docs**

  * [ ] Update README with run/build instructions
  * [ ] Add contribution notes (where to add components/game logic)

# 2. Responsive layout + root wiring

* [ ] **Base layout in `index.html` / `App.tsx`**

  * [ ] Top HUD / resource bar
  * [ ] Left panel: **Hero Roster**
  * [ ] Center panel: **Formation + Combat View + Combat Log**
  * [ ] Right panel: **World Map / Progression / Meta**
  * [ ] Bottom: **UI chrome** (tabs, settings, notifications)
* [ ] **Responsive behavior**

  * [ ] Desktop: 3-column layout (roster | main | side)
  * [ ] Tablet: collapse right panel into tab
  * [ ] Mobile: stacked views with tabbed navigation
* [ ] **Components to stub**

  * [ ] `src/components/HeroRoster.tsx`
  * [ ] `src/components/FormationPanel.tsx`
  * [ ] `src/components/CombatLog.tsx`
  * [ ] `src/components/WorldMap.tsx`
  * [ ] `src/components/ResourceBar.tsx`
  * [ ] `src/components/AppShell.tsx`
* [ ] **Root wiring in `main.ts`**

  * [ ] Render `<AppShell />`
  * [ ] Provide global context/provider for game state (React Context or custom store)
  * [ ] Hook resize listener for responsive layout (or rely on CSS grid)
* [ ] **Styling**

  * [ ] Panels: consistent header, body, scroll
  * [ ] Combat log: monospace / small font, auto-scroll
  * [ ] Theme tokens for light/dark game themes

# 3. Core game modules under `src/game/`

* [ ] **Directory setup**

  * [ ] `src/game/state/playerState.ts`
  * [ ] `src/game/state/progression.ts`
  * [ ] `src/game/systems/combatLoop.ts`
  * [ ] `src/game/systems/idling.ts`
  * [ ] `src/game/persistence/saveManager.ts`
  * [ ] `src/game/models/` (heroes, stats, items, locations)
* [ ] **Data models**

  * [ ] `Hero`: id, name, class, level, xp, baseStats, growth, skills, talents, gearSlots
  * [ ] `Stats`: hp, atk, def, spd, crit, critDmg, lifesteal, armorPen, elemental
  * [ ] `Resource`: gold, gems, essence, raidKeys, craftingMats
  * [ ] `Item`: id, name, slot, rarity, statRolls, upgradeLevel
  * [ ] `Location`: id, biome, difficulty, enemyTemplates, dropTables, unlockReqs
* [ ] **playerState**

  * [ ] Track owned heroes
  * [ ] Track active formation
  * [ ] Track inventory (items, mats, currencies)
  * [ ] Track unlocked locations/biomes
  * [ ] Track meta progression (prestige level, account level)
* [ ] **progression**

  * [ ] XP curves per hero level
  * [ ] Account/Player level curve
  * [ ] Unlock rules (new biome at level X, talent tree after stage Y, raids after Z)
  * [ ] Reward calculation helpers
* [ ] **combatLoop system**

  * [ ] Tick-based loop accepting delta time
  * [ ] Read current formation → simulate vs current enemy wave
  * [ ] Emit events (damage done, hero KO, wave cleared)
  * [ ] Update combat log
  * [ ] Hook into rewards (drops → inventory)
* [ ] **idling system**

  * [ ] Background timer (even when panel isn’t focused)
  * [ ] Auto-battle: run N ticks per time slice
  * [ ] Scaling rewards based on last cleared stage
* [ ] **persistence/saveManager**

  * [ ] Save snapshot of `playerState` and `progression` to `localStorage`
  * [ ] Load on app start; validate version
  * [ ] Migrate structure if schema changes
  * [ ] Expose `saveGame()`, `loadGame()`, `exportSave()`, `importSave()`

# 4. Hero recruitment, loadout, formation UIs

* [ ] **Hero roster UI (`HeroRoster.tsx`)**

  * [ ] List of owned heroes with portrait, level, rarity, role
  * [ ] Filters: by class, role, rarity, level
  * [ ] Sort: power, level, newest
  * [ ] Click → open hero detail drawer
* [ ] **Hero detail / loadout**

  * [ ] Show base stats + total stats (with gear)
  * [ ] Show equipped items per slot (helm, chest, weapon, offhand, accessory)
  * [ ] Buttons: “Equip Best”, “Unequip”, “View Talents”
  * [ ] Show synergy tags (faction, element, class)
* [ ] **Recruitment flow**

  * [ ] UI for available recruits (based on progression)
  * [ ] Cost display (gold/gems/tokens)
  * [ ] Confirm → add hero to roster → show toast
  * [ ] Optional: randomized recruit (gacha-lite) vs fixed recruit
* [ ] **Formation management (`HeroFormation.tsx`)**

  * [ ] 3–6 slots (configurable)
  * [ ] Drag-and-drop heroes into slots
  * [ ] Validate unique hero constraint
  * [ ] Save / load formations (PvE, Raid, Farming)
* [ ] **Auto-lineup suggestions**

  * [ ] Helper that scores heroes by role + power
  * [ ] “Auto Fill” button populates optimal formation for current content
  * [ ] Show diff vs current formation
* [ ] **Synergy preview**

  * [ ] Detect faction/class combos
  * [ ] Show active bonuses (e.g., “3 Rangers: +10% ATK”)
  * [ ] Show missing heroes to complete a set
  * [ ] Color-coded synergy strength

# 5. Items, gear, inventory handling

* [ ] **Game model setup**

  * [ ] `src/game/items/index.ts`
  * [ ] Define item slots: weapon, helm, chest, legs, boots, ring, amulet, trinket
  * [ ] Rarity tiers: Common, Uncommon, Rare, Epic, Legendary, Mythic
  * [ ] Base stat rolls per rarity
  * [ ] Affix/prefix/suffix system (optional)
* [ ] **Drop tables**

  * [ ] Per location/biome
  * [ ] Per enemy/boss type
  * [ ] Weighted by rarity
  * [ ] Integrated with `combatLoop` reward calls
* [ ] **Inventory UI (`InventoryPanel.tsx`)**

  * [ ] Grid/list toggle
  * [ ] Filters: slot, rarity, level, “recent”
  * [ ] Actions: equip to hero, lock item, salvage, compare
  * [ ] Show stat breakdown on hover
* [ ] **Crafting**

  * [ ] Recipes: item shards → item
  * [ ] Materials: dropped from combat / quests
  * [ ] UI: pick recipe → show required mats → craft button → animation
* [ ] **Reforging**

  * [ ] Select item → re-roll secondary stats
  * [ ] Costs: gold + mats
  * [ ] Keep-best-of-two result (optional)
* [ ] **Auto integration with combat**

  * [ ] After combat → generate loot → add to inventory
  * [ ] If inventory full → send to overflow / mail
  * [ ] Show “You got:” loot panel
* [ ] **Auto-equip routines**

  * [ ] Given hero & inventory → find highest power item per slot
  * [ ] Consider set bonuses
  * [ ] Apply and update hero power

# 6. Talent / skill trees per class

* [ ] **Data structure (`src/game/talents/`)**

  * [ ] Talent tree per class: Warrior, Ranger, Mage, Support, Assassin
  * [ ] Node shape: id, name, icon, description, maxRank, cost, requires, branch
  * [ ] Node effects: flat stat, % stat, unlock skill, modify skill, passive aura
  * [ ] Respec cost + rules
* [ ] **UI component (`TalentTree.tsx`)**

  * [ ] Render nodes in grid/graph layout
  * [ ] Lines/arrows to show dependencies
  * [ ] Click → open detail → “Upgrade” button
  * [ ] Show current talent points / unspent points
* [ ] **Unlock requirements**

  * [ ] Per-hero level gates
  * [ ] World progression gates
  * [ ] Node prerequisites (must have X in branch A)
* [ ] **Choice nodes**

  * [ ] Mutually exclusive talents
  * [ ] Force user to pick 1 of N
  * [ ] UI to preview both before confirming
* [ ] **Respec**

  * [ ] Button to refund all points (cost: gold/gem)
  * [ ] Update hero build
  * [ ] Persist choices
* [ ] **Integration with combat**

  * [ ] On talent change → recalc hero derived stats
  * [ ] On talent unlocking new skill → register in hero skill list
  * [ ] On combatLoop → apply talent multipliers

# 7. Idle combat engine

* [ ] **Core loop (`combatLoop.ts`)**

  * [ ] Tick at interval ([500ms] or configurable)
  * [ ] For each tick: process hero actions, enemy actions, effects
  * [ ] Wave manager: spawn next enemy when current dies
  * [ ] Victory/defeat conditions
* [ ] **PvE waves**

  * [ ] Wave definition: enemy list, hp scaling, reward
  * [ ] Endless mode: increase enemy stats per wave
  * [ ] Elite/mini-boss variants
* [ ] **Timed encounters**

  * [ ] Encounter must be cleared within N ticks
  * [ ] If not → partial reward or fail
  * [ ] Good for raids/dailies
* [ ] **Tactical abilities / ultimates**

  * [ ] Each hero has base skill rotation
  * [ ] Ultimates charge over time or on hit
  * [ ] UI: show hero ult charge; allow auto-cast toggle
  * [ ] Some talents modify cooldowns
* [ ] **Background simulation**

  * [ ] If user switches panels → loop still runs
  * [ ] If app hidden → simulate on return based on elapsed time
  * [ ] Cap rewards to prevent abuse
* [ ] **Combat log integration**

  * [ ] Each action emits log line: timestamp, actor, action, result
  * [ ] Color-code crits, ultimates, boss mechanics
  * [ ] Keep last N lines

# 8. World progression & map

* [ ] **Data (`src/game/world/`)**

  * [ ] Define biomes: Grasslands, Desert, Frost, Swamp, Volcano, Void
  * [ ] Each biome → stages (1-10) with enemy themes + drop tables
  * [ ] Endless/scaling regions: difficulty grows per clear
  * [ ] Mini-boss nodes
  * [ ] Raid events (time-limited or key-limited)
* [ ] **Prestige / reset system**

  * [ ] Allow player to reset world progress
  * [ ] Give permanent currency (e.g. Soulstones) used for account buffs
  * [ ] Scale rewards so prestiging is optimal loop
* [ ] **Map UI (`WorldMap.tsx`)**

  * [ ] Overworld view with nodes
  * [ ] Locked vs unlocked states
  * [ ] Hover → show enemy types, rewards, recommended power
  * [ ] “Enter” button → set active location for idle combat
* [ ] **Unlock flows**

  * [ ] Beating biome boss unlocks next biome
  * [ ] Certain features (raids, crafting, higher talents) unlock at map milestones
  * [ ] Show “Feature Unlocked!” panel
* [ ] **Farming stages**

  * [ ] Mark specific nodes as “farmable”
  * [ ] Auto-send formation to farm node
  * [ ] Show per-hour loot estimate

# 9. Meta-systems & persistence

* [ ] **Quests**

  * [ ] Daily, weekly, mainline
  * [ ] Task types: kill N, clear stage X, upgrade item, recruit hero
  * [ ] Reward bundles (gold, mats, keys, hero shards)
  * [ ] Progress tracking UI
* [ ] **Achievements**

  * [ ] One-time milestones (clear first raid, reach level 50, collect 50 items)
  * [ ] Tiered achievements (1, 10, 100 clears)
  * [ ] Badges or cosmetic unlocks
* [ ] **Daily bounties**

  * [ ] Rotate pool daily
  * [ ] Higher rewards than generic dailies
  * [ ] Timer / countdown display
* [ ] **Offline rewards**

  * [ ] On app open → compute time since last play
  * [ ] Cap to X hours
  * [ ] Show reward summary modal
* [ ] **Notifications**

  * [ ] In-game toast system
  * [ ] Notify on hero recruitment, item craft, quest complete, feature unlock
  * [ ] “Claim all” button
* [ ] **Persistence (`saveManager.ts`)**

  * [ ] Save on interval and on important actions
  * [ ] Store version number; run migrations
  * [ ] Optional cloud sync endpoint hook
  * [ ] Handle corrupted saves → fallback to last good
  * [ ] Export/import JSON for debugging

# 10. Polish, UX, performance

* [ ] **Animations & feedback**

  * [ ] Button press animations
  * [ ] Loot drop popups
  * [ ] Talent unlock shine
  * [ ] Map node unlock pulse
* [ ] **Audio**

  * [ ] Click/confirm/cancel sounds
  * [ ] Combat hit/crit/ultimate sounds
  * [ ] Ambient track per biome (looping)
  * [ ] Volume sliders in settings
* [ ] **Particles / VFX**

  * [ ] Simple CSS/Canvas/SVG bursts for crits
  * [ ] Aura around high-rarity items
  * [ ] Prestige/reset effect
* [ ] **Settings menu**

  * [ ] Graphics level (reduce particles)
  * [ ] Audio on/off, volume
  * [ ] Idle speed (visual only)
  * [ ] Language (stub)
* [ ] **Tutorial / onboarding**

  * [ ] Step 1: recruit hero
  * [ ] Step 2: place in formation
  * [ ] Step 3: start first map
  * [ ] Step 4: claim loot, open inventory
  * [ ] Step 5: spend first talent point
  * [ ] Highlight relevant UI during steps
* [ ] **Accessibility**

  * [ ] High-contrast theme
  * [ ] Keyboard navigation for panels
  * [ ] ARIA labels on buttons
  * [ ] Font-size scaling
* [ ] **Performance**

  * [ ] Avoid re-render storms in combat log
  * [ ] Memoize heavy panels
  * [ ] Chunk world data loading
  * [ ] Cap background simulation
  * [ ] Run profiling in dev tools
* [ ] **Mobile responsiveness**

  * [ ] Convert side panels to tabs
  * [ ] Ensure touch targets ≥ 44px
  * [ ] Collapse logs/notifications into drawer
  * [ ] Test on narrow widths (≤375px)
