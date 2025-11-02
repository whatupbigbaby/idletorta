const InventoryPanel = () => (
  <section className="panel" aria-labelledby="inventory-heading">
    <header className="panel__header">
      <h2 id="inventory-heading">Inventory</h2>
      <div className="resource-pill">Grid • Filters coming soon</div>
    </header>
    <div className="panel__body">
      <div className="scrollable inventory-grid">
        <div className="inventory-item">Loot coming soon</div>
        <div className="inventory-item">Crafting mats</div>
        <div className="inventory-item">Auto-equip ready</div>
      </div>
    </div>
  </section>
);

export default InventoryPanel;
