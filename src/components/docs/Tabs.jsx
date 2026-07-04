"use client";

import { useState } from "react";

/** Lightweight framework tabs (ESX / QBox / QBCore) for docs code samples. */
export function Tabs({ items = [], children }) {
  const [active, setActive] = useState(0);
  const panes = Array.isArray(children) ? children : [children];
  return (
    <div className="docs-tabs">
      <div className="docs-tablist" role="tablist">
        {items.map((label, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            className={i === active ? "active" : ""}
            onClick={() => setActive(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="docs-tabpane">{panes[active]}</div>
    </div>
  );
}

export function Tab({ children }) {
  return <>{children}</>;
}
