import { useEffect, useRef, useState } from "react";
import type { CombatEvent } from "@/game/systems/combatLoop";

const mockEvents: CombatEvent[] = Array.from({ length: 12 }, (_, index) => ({
  timestamp: Date.now() - (12 - index) * 1200,
  actorId: index % 2 === 0 ? "hero-aurora" : "hero-bram",
  action: index % 3 === 0 ? "Cast Arcane Bolt" : "Struck the enemy",
  value: Math.floor(Math.random() * 180) + 40,
  targetId: "oak-sentinel",
  critical: Math.random() > 0.8
}));

const CombatLog = () => {
  const [events] = useState<CombatEvent[]>(mockEvents);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [events]);

  return (
    <section className="panel" aria-labelledby="combat-log-heading">
      <header className="panel__header">
        <h2 id="combat-log-heading">Combat Log</h2>
      </header>
      <div className="panel__body">
        <div ref={containerRef} className="scrollable combat-log" aria-live="polite">
          <div className="combat-log__entries">
            {events.map((event, index) => (
              <div key={`${event.timestamp}-${index}`}>
                <span aria-hidden>{new Date(event.timestamp).toLocaleTimeString()}</span> — {event.action}
                {event.value ? ` for ${event.value}` : ""}
                {event.critical ? " (CRIT!)" : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombatLog;
