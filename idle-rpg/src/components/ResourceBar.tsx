import { useGameState } from "@/game/state/GameStateContext";

const ResourceBar = () => {
  const { state } = useGameState();

  return (
    <div className="resource-bar" role="list" aria-label="Player resources">
      {state.inventory.currencies.map((resource) => (
        <div className="resource-pill" key={resource.type} role="listitem">
          <span className="resource-pill__label">{resource.label}</span>
          <span className="resource-pill__value">
            {resource.amount.toLocaleString()}
            {resource.capacity ? ` / ${resource.capacity.toLocaleString()}` : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ResourceBar;
