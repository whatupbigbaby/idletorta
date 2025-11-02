import { useMemo } from "react";
import { useGameState } from "@/game/state/GameStateContext";

const FormationPanel = () => {
  const { state } = useGameState();

  const formationSlots = useMemo(() => state.formation.slots, [state.formation.slots]);

  return (
    <section className="panel" aria-labelledby="formation-heading">
      <header className="panel__header">
        <h2 id="formation-heading">Formation</h2>
        <button type="button" className="tabbed-panel__button is-active">
          Auto Fill
        </button>
      </header>
      <div className="panel__body">
        <div className="formation-grid">
          {formationSlots.map((slot) => {
            const hero = state.heroes.find((candidate) => candidate.id === slot.heroId);
            return (
              <div className="formation-slot" key={slot.slotId} aria-label={`Formation slot ${slot.position}`}>
                {hero ? (
                  <div>
                    <strong>{hero.name}</strong>
                    <div>Lv. {hero.level}</div>
                  </div>
                ) : (
                  <span>Empty</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormationPanel;
