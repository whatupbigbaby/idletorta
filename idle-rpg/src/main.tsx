import React from "react";
import ReactDOM from "react-dom/client";
import AppShell from "@/components/AppShell";
import { GameStateProvider } from "@/game/state/GameStateContext";
import "@/styles/main.css";

const container = document.getElementById("app");

if (!container) {
  throw new Error("Failed to find root element");
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <GameStateProvider>
      <AppShell />
    </GameStateProvider>
  </React.StrictMode>
);
