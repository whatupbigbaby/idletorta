import { talentTrees } from "@/game/talents";

const TalentTree = () => {
  const tree = talentTrees[0];

  return (
    <section className="panel" aria-labelledby="talent-tree-heading">
      <header className="panel__header">
        <h2 id="talent-tree-heading">{tree.name} Talents</h2>
        <div className="resource-pill">Points: 12</div>
      </header>
      <div className="panel__body">
        <div className="scrollable">
          <div className="world-map__grid">
            {tree.nodes.map((node) => (
              <article key={node.id} className="world-node" aria-label={node.name}>
                <strong>{node.name}</strong>
                <p>{node.description}</p>
                <button type="button">Upgrade</button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentTree;
