import { useEffect, useState } from "react";
import CombatLog from "./CombatLog";
import FormationPanel from "./FormationPanel";
import HeroRoster from "./HeroRoster";
import InventoryPanel from "./InventoryPanel";
import ResourceBar from "./ResourceBar";
import TalentTree from "./TalentTree";
import WorldMap from "./WorldMap";

const auxTabs = ["map", "inventory", "talents", "notifications"] as const;
type AuxTab = (typeof auxTabs)[number];

const AppShell = () => {
  const [layoutMode, setLayoutMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<AuxTab>("map");

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setLayoutMode("desktop");
      } else if (width >= 960) {
        setLayoutMode("tablet");
      } else {
        setLayoutMode("mobile");
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const renderAuxiliaryPanel = () => {
    switch (activeTab) {
      case "map":
        return <WorldMap />;
      case "inventory":
        return <InventoryPanel />;
      case "talents":
        return <TalentTree />;
      case "notifications":
        return (
          <section className="panel" aria-labelledby="notifications-heading">
            <header className="panel__header">
              <h2 id="notifications-heading">Notifications</h2>
            </header>
            <div className="panel__body">
              <div className="scrollable">
                <p>No notifications yet. Unlock new features as you progress!</p>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-layout" data-layout={layoutMode}>
      <section className="panel hud" aria-label="Top resource bar">
        <ResourceBar />
      </section>
      <HeroRoster />
      <section className="main-panel" aria-label="Combat and formation">
        <FormationPanel />
        <CombatLog />
      </section>
      {layoutMode === "desktop" ? (
        <section className="right-panel">{renderAuxiliaryPanel()}</section>
      ) : null}
      <section className="ui-chrome" aria-label="Main navigation">
        <div className="tabbed-panel">
          <div className="tabbed-panel__tabs" role="tablist">
            {auxTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={`tabbed-panel__button${activeTab === tab ? " is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "map" && "World"}
                {tab === "inventory" && "Inventory"}
                {tab === "talents" && "Talents"}
                {tab === "notifications" && "Notifications"}
              </button>
            ))}
          </div>
          {layoutMode !== "desktop" ? <div>{renderAuxiliaryPanel()}</div> : null}
        </div>
      </section>
    </div>
  );
};

export default AppShell;
