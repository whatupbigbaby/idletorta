import { useMemo, useState } from "react";
import { useGameState } from "@/game/state/GameStateContext";
import type { Hero } from "@/game/models";

const heroSorters: Record<string, (a: Hero, b: Hero) => number> = {
  power: (a, b) => b.level - a.level,
  level: (a, b) => b.level - a.level,
  newest: (a, b) => b.level - a.level
};

const HeroRoster = () => {
  const { state } = useGameState();
  const [classFilter, setClassFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("power");

  const heroes = useMemo(() => {
    const filtered = classFilter === "all"
      ? state.heroes
      : state.heroes.filter((hero) => hero.class === classFilter);
    const sorter = heroSorters[sortOrder] ?? heroSorters.power;
    return [...filtered].sort(sorter);
  }, [classFilter, sortOrder, state.heroes]);

  return (
    <div className="panel left-panel" aria-labelledby="hero-roster-heading">
      <header className="panel__header">
        <h2 id="hero-roster-heading">Hero Roster</h2>
        <div className="resource-bar">
          <label className="sr-only" htmlFor="hero-filter">
            Filter heroes by class
          </label>
          <select
            id="hero-filter"
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value)}
          >
            <option value="all">All Classes</option>
            {Array.from(new Set(state.heroes.map((hero) => hero.class))).map((heroClass) => (
              <option key={heroClass} value={heroClass}>
                {heroClass}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="hero-sort">
            Sort heroes
          </label>
          <select
            id="hero-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="power">Power</option>
            <option value="level">Level</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </header>
      <div className="panel__body">
        <div className="scrollable">
          <div className="hero-grid">
            {heroes.map((hero) => (
              <article className="hero-card" key={hero.id}>
                <img src="/src/assets/heroes/placeholder-hero.svg" alt="" aria-hidden />
                <div className="hero-card__name">{hero.name}</div>
                <div className="hero-card__meta">{hero.class}</div>
                <div className="hero-card__meta">Lv. {hero.level}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <div className="resource-pill">Filters coming soon</div>
      </footer>
    </div>
  );
};

export default HeroRoster;
