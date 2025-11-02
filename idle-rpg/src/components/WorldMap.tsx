import { useMemo } from "react";
import { useGameState } from "@/game/state/GameStateContext";
import { worldBiomes } from "@/game/world";

const WorldMap = () => {
  const { state } = useGameState();

  const nodes = useMemo(() => worldBiomes, []);

  return (
    <section className="panel" aria-labelledby="world-map-heading">
      <header className="panel__header">
        <h2 id="world-map-heading">World Map</h2>
        <span>Prestige Level {state.progression.prestigeLevel}</span>
      </header>
      <div className="panel__body">
        <div className="scrollable">
          <div className="world-map__grid">
            {nodes.map((location) => {
              const unlocked = state.progression.unlockedLocations.includes(location.id);
              return (
                <article
                  key={location.id}
                  className={`world-node${unlocked ? "" : " is-locked"}`}
                  aria-label={`${location.biome} biome`}
                >
                  <header>
                    <strong>{location.biome}</strong>
                    <div>{location.difficulty}</div>
                  </header>
                  <p>{location.stages.length} stages</p>
                  <button type="button" disabled={!unlocked}>
                    {unlocked ? "Enter" : "Locked"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
